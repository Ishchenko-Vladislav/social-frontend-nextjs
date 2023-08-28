import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => {
  return (
    <>
      <AppProgressBar height="0" color="#fffd00" options={{ showSpinner: true }} shallowRouting />
    </>
  );
};
