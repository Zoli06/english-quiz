import { Button } from "react-daisyui";

export const QuestionEditorButtons = ({
  isSaving,
  close,
}: {
  isSaving: boolean;
  close: () => void;
}) => {
  return (
    <div className="mt-4 flex flex-row gap-4">
      <Button
        type="submit"
        color="primary"
        className="grow"
        disabled={isSaving}
      >
        Save
      </Button>
      <Button onClick={close} className="grow" type="button">
        Cancel
      </Button>
    </div>
  );
};
