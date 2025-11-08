import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/admin/dashboard");
      }}
      className="absolute top-4 left-4"
    >
      Back
    </Button>
  );
};
