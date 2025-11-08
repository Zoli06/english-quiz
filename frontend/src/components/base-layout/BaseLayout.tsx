import { Artboard } from "react-daisyui";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="flex justify-center items-start min-h-screen pt-[30vh]">
      <Artboard className="max-w-3xl relative p-4">
        <Outlet />
      </Artboard>
    </div>
  );
};
