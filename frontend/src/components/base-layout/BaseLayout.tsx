import { Artboard } from "react-daisyui";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Artboard className="max-w-3xl relative p-4">
        <Outlet />
      </Artboard>
    </div>
  );
};
