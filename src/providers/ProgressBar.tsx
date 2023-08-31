import { AppProgressBar } from "next-nprogress-bar";

export const ProgressBar = () => {
  return (
    <>
      <AppProgressBar height="0" color="red" options={{ showSpinner: true }} shallowRouting />
    </>
  );
};
