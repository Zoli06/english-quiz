import { Artboard } from "react-daisyui";
import { ReactNode } from "react";

export const Modal = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-10">
      <Artboard className="border-2 border-primary max-w-3xl max-h-screen overflow-auto justify-start">
        {children}
      </Artboard>
    </div>
  );
};
