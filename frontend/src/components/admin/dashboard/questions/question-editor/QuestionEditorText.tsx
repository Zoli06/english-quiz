import { Input } from "react-daisyui";

export const QuestionEditorText = ({
  text,
  setText,
}: {
  text: string;
  setText: (text: string) => void;
}) => {
  return (
    <>
      <h3 className="text-lg">Question</h3>
      <Input
        type="text"
        placeholder="Question"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full"
        required
      />
    </>
  );
};
