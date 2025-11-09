import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth.ts";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <Button
      onClick={() => {
        logout();
        navigate("/admin");
      }}
      color="error"
    >
      Logout
    </Button>
  );
};
