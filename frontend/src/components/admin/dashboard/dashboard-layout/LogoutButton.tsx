import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        localStorage.setItem("token", "");
        navigate("/admin");
      }}
      color="error"
    >
      Logout
    </Button>
  );
};
