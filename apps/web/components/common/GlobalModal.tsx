'use client';

import { useModalStore } from '@/store/useModalStore';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function GlobalModal() {
  const { isOpen, title, message, type, closeModal, onConfirm } = useModalStore();

  if (!isOpen) return null;

  const icons = {
    success: <CheckCircle2 className="text-green-500" size={24} />,
    error: <AlertCircle className="text-red-500" size={24} />,
    warning: <AlertTriangle className="text-yellow-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icons[type]}
            <h2 className="text-lg font-bold text-neutral-900">{title}</h2>
          </div>
          <button 
            onClick={closeModal}
            className="p-1 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <X size={20} className="text-neutral-500" />
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="w-full h-11 rounded-xl bg-black text-white text-sm font-semibold transition hover:bg-neutral-800 active:scale-95"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
