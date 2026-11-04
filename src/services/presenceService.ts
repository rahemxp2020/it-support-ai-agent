import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface OnlineUser {
  sessionId: string;
  userName: string;
  deviceType: string;
  lastSeen: number;
}

const PRESENCE_COLLECTION = 'presence';

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem('it_presence_session_id');
    if (!id) {
      id = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      sessionStorage.setItem('it_presence_session_id', id);
    }
    return id;
  } catch {
    return `sess_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  }
}

function detectDevice(): string {
  if (typeof window === 'undefined') return 'حاسوب';
  const ua = navigator.userAgent;
  if (/Android/i.test(ua)) return 'هاتف أندرويد';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'آيفون / آيباد';
  if (/Macintosh/i.test(ua)) return 'ماك بوك';
  if (/Windows/i.test(ua)) return 'كمبيوتر ويندوز';
  return 'متصفح ويب';
}

export function startPresenceTracking(
  userName: string,
  onUpdate: (count: number, users: OnlineUser[]) => void
): () => void {
  const sessionId = getSessionId();
  const deviceType = detectDevice();

  const ping = async () => {
    const currentName = userName || 'مستخدم المنظومة';
    const now = Date.now();

    // 1. Dual Ping: Update Firestore
    try {
      await setDoc(doc(db, PRESENCE_COLLECTION, sessionId), {
        sessionId,
        userName: currentName,
        deviceType,
        lastSeen: now,
      }, { merge: true });
    } catch {
      // Ignored for network offline
    }

    // 2. Dual Ping: Server endpoint
    try {
      const res = await fetch('/api/presence/ping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userName: currentName, deviceType })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && typeof json.count === 'number') {
          onUpdate(json.count, json.users || []);
        }
      }
    } catch {
      // Ignored
    }
  };

  // Initial ping
  ping();

  // Periodic heartbeat every 20 seconds
  const interval = setInterval(ping, 20000);

  // Firestore Real-Time Presence Listener
  let unsubscribeFirestore: (() => void) | null = null;
  try {
    const colRef = collection(db, PRESENCE_COLLECTION);
    unsubscribeFirestore = onSnapshot(colRef, (snapshot) => {
      const threshold = Date.now() - 45000;
      const active: OnlineUser[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as OnlineUser;
        if (data && data.lastSeen && data.lastSeen >= threshold) {
          active.push(data);
        }
      });
      if (active.length > 0) {
        onUpdate(active.length, active);
      }
    }, () => {});
  } catch {
    // Falls back seamlessly to server ping
  }

  // Cleanup on leave
  const leave = () => {
    try {
      deleteDoc(doc(db, PRESENCE_COLLECTION, sessionId)).catch(() => {});
      navigator.sendBeacon('/api/presence/leave', JSON.stringify({ sessionId }));
    } catch {}
  };

  window.addEventListener('beforeunload', leave);

  return () => {
    clearInterval(interval);
    if (unsubscribeFirestore) unsubscribeFirestore();
    window.removeEventListener('beforeunload', leave);
    leave();
  };
}
