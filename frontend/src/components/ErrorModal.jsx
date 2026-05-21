import { useState, useEffect } from 'react';

export function ErrorModal({ title, message, isOpen, onClose }) {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-red-900/30">
        {/* Decoração de canto */}
        <div className="absolute -top-1 -left-1 h-3 w-3 border-t-2 border-l-2 border-red-500" />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b-2 border-r-2 border-red-500" />

        {/* Ícone de erro */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
          <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Título */}
        <h3 className="mb-2 text-center text-xl font-bold text-white">{title || 'Acesso Negado'}</h3>

        {/* Mensagem */}
        <p className="mb-6 text-center text-slate-300">{message || 'Ocorreu um erro ao processar sua solicitação.'}</p>

        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-3 font-semibold text-white transition hover:brightness-110"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
