import { FC, useEffect } from "react";
import { Toaster, useToasterStore, toast } from "react-hot-toast";
interface Props {}

export const ToasterContainer: FC<Props> = () => {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};
