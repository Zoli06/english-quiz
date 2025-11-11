import { Button } from "react-daisyui";

export const NewQuizButton = ({ createQuiz }: { createQuiz?: () => void }) => {
  return (
    <Button
      color="success"
      onClick={async () => {
        if (createQuiz) {
          createQuiz();
        }
      }}
    >
      Create Quiz
    </Button>
  );
};
