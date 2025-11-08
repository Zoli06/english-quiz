import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/");
      }}
      className="absolute top-4 left-4"
    >
      Home
    </Button>
  );
};
