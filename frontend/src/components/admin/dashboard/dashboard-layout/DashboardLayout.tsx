import { useAuth } from "@/hooks/useAuth.ts";
import { Outlet } from "react-router-dom";
import { Corner } from "@/components/reusable/Corner.tsx";
import { LogoutButton } from "./LogoutButton";

export const DashboardLayout = () => {
  const { ensureLoggedIn } = useAuth();
  ensureLoggedIn("/admin");

  return (
    <>
      <Corner corner="top-right">
        <LogoutButton />
      </Corner>
      <Outlet />
    </>
  );
};
