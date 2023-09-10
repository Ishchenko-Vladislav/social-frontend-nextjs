export const useLockBody = () => {
  const style = getComputedStyle(document.body).overflow;
  const lockBody = () => (document.body.style.overflow = "hidden");
  const unlockBody = () => (document.body.style.overflow = style);
  return {
    lockBody,
    unlockBody,
  };
};
