import { useState } from "react";
import { Button, Form, Input } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";

const QUIZ_EDITOR_FRAGMENT = graphql(`
  fragment QuizEditorFragment on Quiz {
    id
    title
    description
  }
`);

const EDIT_QUIZ_MUTATION = graphql(`
  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {
    editQuiz(id: $id, title: $title, description: $description) {
      ...QuizEditorFragment
    }
  }
`);

export const QuizEditor = (props: {
  quiz: FragmentType<typeof QUIZ_EDITOR_FRAGMENT>;
  close: () => void;
}) => {
  const originalQuiz = useFragment(QUIZ_EDITOR_FRAGMENT, props.quiz);

  const [title, setTitle] = useState(originalQuiz.title);
  const [description, setDescription] = useState(originalQuiz.description);

  const [editQuizMutation] = useMutation(EDIT_QUIZ_MUTATION);
  const editQuiz = (title: string, description: string) => {
    return editQuizMutation({
      variables: {
        id: originalQuiz.id,
        title,
        description,
      },
    });
  };

  return (
    <Form
      className="p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await editQuiz(title, description);
        props.close();
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
        <Button onClick={props.close} className="grow">
          Close
        </Button>
      </div>
    </Form>
  );
};
