import React, { Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error inside React tree:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('it_smart_active_user');
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1120] text-slate-100 flex items-center justify-center p-4 font-sans" dir="rtl">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center text-xl font-bold">
              ⚠️
            </div>
            <h1 className="text-lg font-bold text-white">تنبيه: تعذر تحميل واجهة التطبيق بشكل مؤقت</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              حدث خطأ غير متوقع أثناء معالجة بيانات الصفحة في المتصفح. يمكنك إعادة تشغيل التطبيق بنقرة واحدة أدناه.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                إعادة تحميل الصفحة
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-700"
              >
                إعادة ضبط الذاكرة
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ErrorBoundary>
);

// Register PWA Service Worker for mobile installability and offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('PWA Service Worker active with scope:', reg.scope);
      })
      .catch((err) => {
        console.warn('Service worker registration note:', err);
      });
  });
}

