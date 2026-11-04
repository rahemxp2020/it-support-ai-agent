import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { SupportTicket } from '../types/it-support';
import { INITIAL_TICKETS } from '../data/mockTickets';

const TICKETS_COLLECTION = 'tickets';

// Clean object to ensure no undefined values are passed to Firestore
function sanitizeTicket(t: Partial<SupportTicket>): Record<string, any> {
  const clean: Record<string, any> = {};
  for (const [key, val] of Object.entries(t)) {
    if (val !== undefined) {
      clean[key] = val;
    }
  }
  return clean;
}

export function subscribeToFirestoreTickets(
  onUpdate: (tickets: SupportTicket[]) => void,
  onError?: (error: any) => void
): () => void {
  const colRef = collection(db, TICKETS_COLLECTION);
  
  const unsubscribe = onSnapshot(
    colRef,
    (snapshot) => {
      if (snapshot.empty) {
        // If collection is completely empty, seed it with the initial baseline tickets (including Paula and Aya)
        seedInitialTickets().catch(console.error);
        return;
      }

      const ticketsList: SupportTicket[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as SupportTicket;
        ticketsList.push({
          ...data,
          id: data.id || docSnap.id,
          ticketNumber: data.ticketNumber || docSnap.id,
        });
      });

      // Sort newest created / updated first
      ticketsList.sort((a, b) => {
        const timeA = new Date(a.updatedAt || a.createdAt).getTime();
        const timeB = new Date(b.updatedAt || b.createdAt).getTime();
        return timeB - timeA;
      });

      onUpdate(ticketsList);
    },
    (err) => {
      console.warn('Firestore tickets snapshot listener note:', err);
      if (onError) onError(err);
    }
  );

  return unsubscribe;
}

export async function seedInitialTickets(): Promise<void> {
  const colRef = collection(db, TICKETS_COLLECTION);
  try {
    const snap = await getDocs(colRef);
    if (!snap.empty) return;

    for (const ticket of INITIAL_TICKETS) {
      const docId = ticket.ticketNumber || ticket.id;
      await setDoc(doc(db, TICKETS_COLLECTION, docId), sanitizeTicket(ticket));
    }
  } catch (err) {
    console.error('Error seeding initial tickets:', err);
  }
}

export async function saveTicketToFirestore(ticket: SupportTicket): Promise<void> {
  const docId = ticket.ticketNumber || ticket.id;
  const path = `${TICKETS_COLLECTION}/${docId}`;
  try {
    await setDoc(doc(db, TICKETS_COLLECTION, docId), sanitizeTicket(ticket), { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateTicketInFirestore(docId: string, updates: Partial<SupportTicket>): Promise<void> {
  const path = `${TICKETS_COLLECTION}/${docId}`;
  try {
    await setDoc(doc(db, TICKETS_COLLECTION, docId), sanitizeTicket(updates), { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteTicketFromFirestore(docId: string): Promise<void> {
  const path = `${TICKETS_COLLECTION}/${docId}`;
  try {
    await deleteDoc(doc(db, TICKETS_COLLECTION, docId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}
