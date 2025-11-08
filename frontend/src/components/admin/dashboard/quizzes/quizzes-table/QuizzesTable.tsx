import { FragmentType, graphql, useFragment } from "@/gql";
import { Table } from "react-daisyui";
import { QuizzesTableRow } from "@/components/admin/dashboard/quizzes/quizzes-table/QuizzesTableRow";
import { useMemo } from "react";

const QUIZZES_TABLE_FRAGMENT = graphql(`
  fragment QuizzesTableFragment on Quiz {
    id
    createdAt
    ...QuizzesTableRowFragment
  }
`);

export const QuizzesTable = (props: {
  quizzes: FragmentType<typeof QUIZZES_TABLE_FRAGMENT>[];
  setEditedQuizId: (id: string | null) => void;
}) => {
  const quizzes = useFragment(QUIZZES_TABLE_FRAGMENT, props.quizzes);

  const sortedQuizzes = useMemo(() => {
    return [...quizzes].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [quizzes]);

  return (
    <Table>
      <Table.Head>
        <span>Title</span>
        <span>Description</span>
        <span className="flex justify-end">Actions</span>
      </Table.Head>
      <Table.Body>
        {sortedQuizzes.map((quiz) => {
          return (
            <QuizzesTableRow
              key={quiz.id}
              quiz={quiz}
              setEditedQuizId={props.setEditedQuizId}
            />
          );
        })}
      </Table.Body>
    </Table>
  );
};
