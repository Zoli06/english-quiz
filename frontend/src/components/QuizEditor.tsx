import React from "react";
import { Input, Button, Form } from "react-daisyui";

export const QuizEditor = ({
  quiz,
  saveQuiz,
  close,
}: {
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  saveQuiz: (quiz: { id: number; title: string; description: string }) => void;
  deleteQuiz: (quizId: number) => void;
  close: () => void;
}) => {
  const [title, setTitle] = React.useState(quiz.title);
  const [description, setDescription] = React.useState(quiz.description);

  return (
    <Form
      className="p-4"
      onSubmit={() => {
        saveQuiz({ id: quiz.id, title, description });
        close();
      }}
    >
      <h3 className="text-lg">Quiz name</h3>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="mb-2"
      />
      <h3 className="text-lg">Quiz description</h3>
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="mb-2"
      />
      <div className="flex flex-row w-full gap-2">
        <Button type="submit" color="primary" className="grow">
          Save
        </Button>
        {/* <Button
          onClick={() => {
            deleteQuiz(quiz.id);
            close();
          }}
          className='ml-2'
          color='error'
        >
          Delete
        </Button> */}
        <Button onClick={close} className="grow">
          Close
        </Button>
      </div>
    </Form>
  );
};
