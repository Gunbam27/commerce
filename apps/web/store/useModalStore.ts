import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  onConfirm?: () => void;
  openModal: (params: {
    title: string;
    message: string;
    type?: 'info' | 'success' | 'error' | 'warning';
    onConfirm?: () => void;
  }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  type: 'info',
  onConfirm: undefined,
  openModal: ({ title, message, type = 'info', onConfirm }) =>
    set({ isOpen: true, title, message, type, onConfirm }),
  closeModal: () => set({ isOpen: false, onConfirm: undefined }),
}));
