import React from 'react';
import { useTickets } from '../context/TicketContext';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toasts, removeToast, setActiveRole } = useTickets();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isUrgent = toast.type === 'urgent';
        const isSuccess = toast.type === 'success';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl p-4 shadow-2xl border backdrop-blur-md transition-all transform animate-in slide-in-from-bottom duration-300 ${
              isUrgent
                ? 'bg-red-950/90 border-red-500/80 text-white shadow-red-900/50'
                : isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/80 text-white shadow-emerald-900/50'
                : 'bg-slate-900/90 border-slate-700 text-white shadow-slate-950/50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isUrgent ? (
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Info className="w-5 h-5 text-indigo-400" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold tracking-tight">
                      {toast.title}
                    </h4>
                    {isUrgent && (
                      <span className="bg-red-500 text-white text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded animate-pulse">
                        P0 Immediate
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                    {toast.message}
                  </p>

                  {toast.tokenNumber && (
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveRole('MAINTENANCE');
                          removeToast(toast.id);
                        }}
                        className="text-[11px] bg-white/20 hover:bg-white/30 text-white font-medium px-2.5 py-1 rounded transition"
                      >
                        View in Maintenance Desk →
                      </button>
                      <button
                        onClick={() => {
                          setActiveRole('TRACKER');
                          removeToast(toast.id);
                        }}
                        className="text-[11px] text-slate-300 hover:text-white underline transition"
                      >
                        Track Token
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
