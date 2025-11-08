import { Table } from "react-daisyui";
import { FragmentType, graphql, useFragment } from "@/gql";
import { QuestionsTableRow } from "./QuestionsTableRow.tsx";
import { useMemo } from "react";

const QUESTIONS_TABLE_FRAGMENT = graphql(`
  fragment QuestionsTableFragment on Question {
    id
    createdAt
    ...QuestionsTableRowFragment
  }
`);

export const QuestionsTable = (props: {
  questions: FragmentType<typeof QUESTIONS_TABLE_FRAGMENT>[];
  setEditedQuestionId: (id: string | null) => void;
}) => {
  const questions = useFragment(QUESTIONS_TABLE_FRAGMENT, props.questions);
  const { setEditedQuestionId } = props;

  const sortedQuestions = useMemo(() => {
    return questions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [questions]);

  return (
    <Table>
      <Table.Head>
        <span>Question</span>
        <span>Image/video</span>
        <span>Options</span>
        <span className="flex justify-end">Actions</span>
      </Table.Head>
      <Table.Body>
        {sortedQuestions.map((question) => {
          return (
            <QuestionsTableRow
              question={question}
              setEditedQuestionId={setEditedQuestionId}
              key={question.id}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};
