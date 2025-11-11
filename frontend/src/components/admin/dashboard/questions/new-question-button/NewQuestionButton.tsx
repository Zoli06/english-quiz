import { Button } from "react-daisyui";

export const NewQuestionButton = ({
  createQuestion,
}: {
  createQuestion?: () => void;
}) => {
  return (
    <Button
      color="success"
      onClick={() => {
        if (createQuestion) {
          createQuestion();
        }
      }}
    >
      Create Question
    </Button>
  );
};
