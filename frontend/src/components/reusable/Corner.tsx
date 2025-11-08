import { ReactNode } from "react";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export const Corner = ({
  children,
  corner,
}: {
  children: ReactNode;
  corner: Corner;
}) => {
  const positionClasses: Record<Corner, string> = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <div className={`absolute flex gap-4 mt-4 mr-4 ${positionClasses[corner]}`}>
      {children}
    </div>
  );
};
