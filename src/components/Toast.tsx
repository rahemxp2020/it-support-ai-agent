import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types/it-support';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full no-print">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-800 border-slate-700 text-slate-100';
        let Icon = Info;
        let iconColor = 'text-cyan-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-emerald-950/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/50';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-400';
        } else if (toast.type === 'error') {
          bgStyle = 'bg-rose-950/90 border-rose-500/40 text-rose-100 shadow-rose-950/50';
          Icon = AlertTriangle;
          iconColor = 'text-rose-400';
        } else {
          bgStyle = 'bg-cyan-950/90 border-cyan-500/40 text-cyan-100 shadow-cyan-950/50';
          Icon = Info;
          iconColor = 'text-cyan-400';
        }

        return (
          <div
            key={toast.id}
            className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${bgStyle}`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm">
              <p className="font-bold">{toast.title}</p>
              {toast.message && (
                <p className="text-xs opacity-90 mt-1 leading-relaxed">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="إغلاق التنبيه"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
