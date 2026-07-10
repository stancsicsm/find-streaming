import type React from 'react';
import { Drawer } from 'vaul';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children, footer }) => {
  return (
    <Drawer.Root
      open={show}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-20 bg-black/55 backdrop-blur-sm" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-30 mx-auto flex max-h-[85dvh] w-full max-w-lg flex-col rounded-t-2xl border border-b-0 border-line bg-surface text-ink outline-none">
          <div className="mx-auto mt-3 h-1.5 w-10 shrink-0 rounded-full bg-surface-2" aria-hidden />
          <div className="border-b border-line px-5 py-4">
            <Drawer.Title className="truncate text-lg font-semibold">{title}</Drawer.Title>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && (
            <div className="flex items-center gap-3 border-t border-line px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Modal;
