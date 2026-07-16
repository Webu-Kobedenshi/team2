import { useEffect, useRef, type ReactNode } from "react";

import { Button } from "./buttons";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
      className="m-auto w-[calc(100%_-_2rem)] max-w-sm rounded-3xl border-0 bg-white p-0 text-slate-950 shadow-2xl backdrop:bg-slate-950/50"
    >
      <div className="grid gap-6 p-6">
        <div className="grid gap-2">
          <h2 id="confirm-dialog-title" className="text-xl font-black">
            {title}
          </h2>
          <p
            id="confirm-dialog-description"
            className="text-sm font-bold leading-6 text-slate-600"
          >
            {description}
          </p>
        </div>

        <div className="grid gap-3">
          <Button onClick={onCancel}>{cancelLabel}</Button>
          <Button variant="destructive" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
