import { useState } from "react";
import { Button, Checkbox, Form, Input } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { useMutation } from "@apollo/client/react";

const QUIZ_EDITOR_FRAGMENT = graphql(`
  fragment QuizEditorFragment on Quiz {
    id
    title
    description
    showCorrectAnswerAfterEachQuestion
  }
`);

const EDIT_QUIZ_MUTATION = graphql(`
  mutation EditQuiz(
    $id: ID!
    $title: String!
    $description: String!
    $showCorrectAnswerAfterEachQuestion: Boolean!
  ) {
    editQuiz(
      id: $id
      title: $title
      description: $description
      showCorrectAnswerAfterEachQuestion: $showCorrectAnswerAfterEachQuestion
    ) {
      ...QuizEditorFragment
    }
  }
`);

const CREATE_QUIZ_MUTATION = graphql(`
  mutation CreateQuiz(
    $title: String!
    $description: String!
    $showCorrectAnswerAfterEachQuestion: Boolean!
  ) {
    createQuiz(
      title: $title
      description: $description
      showCorrectAnswerAfterEachQuestion: $showCorrectAnswerAfterEachQuestion
    ) {
      id
      ...CreateQuizMutationFragment
    }
  }
`);

const CREATE_QUIZ_MUTATION_FRAGMENT = graphql(`
  fragment CreateQuizMutationFragment on Quiz {
    id
    ...AdminQuizzesFragmentQuiz
    ...QuizEditorFragment
  }
`);

export const QuizEditor = (props: {
  quiz?: FragmentType<typeof QUIZ_EDITOR_FRAGMENT>;
  close: () => void;
}) => {
  const originalQuiz = useFragment(QUIZ_EDITOR_FRAGMENT, props.quiz);

  const [title, setTitle] = useState(originalQuiz?.title || "");
  const [description, setDescription] = useState(
    originalQuiz?.description || "",
  );
  const [
    showCorrectAnswerAfterEachQuestion,
    setShowCorrectAnswerAfterEachQuestion,
  ] = useState(originalQuiz?.showCorrectAnswerAfterEachQuestion || false);

  const [editQuizMutation] = useMutation(EDIT_QUIZ_MUTATION);
  const [createQuiz] = useMutation(CREATE_QUIZ_MUTATION, {
    update(cache, { data }) {
      if (!data) return;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const newQuiz = useFragment(
        CREATE_QUIZ_MUTATION_FRAGMENT,
        data.createQuiz,
      );
      cache.modify({
        fields: {
          quizzes(existingQuizzes = []) {
            const newQuizRef = cache.writeFragment({
              data: newQuiz,
              fragment: CREATE_QUIZ_MUTATION_FRAGMENT,
              fragmentName: "CreateQuizMutationFragment",
            });
            return [...existingQuizzes, newQuizRef];
          },
        },
      });
    },
  });

  const createOrEditQuiz = () => {
    if (originalQuiz) {
      return editQuizMutation({
        variables: {
          id: originalQuiz.id,
          title,
          description,
          showCorrectAnswerAfterEachQuestion,
        },
      });
    } else {
      return createQuiz({
        variables: {
          title,
          description,
          showCorrectAnswerAfterEachQuestion,
        },
      });
    }
  };

  return (
    <Form
      className="p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await createOrEditQuiz();
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
      <label className="flex items-center gap-2 mb-4">
        <Checkbox
          checked={showCorrectAnswerAfterEachQuestion}
          onChange={(e) =>
            setShowCorrectAnswerAfterEachQuestion(e.target.checked)
          }
        />
        Show whether each answer is correct
      </label>
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
