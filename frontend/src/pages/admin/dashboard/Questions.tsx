import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { graphql, useFragment } from "@/gql";
import { QuestionEditor } from "@/components/admin/dashboard/questions/question-editor/QuestionEditor.tsx";
import { QuestionsTable } from "@/components/admin/dashboard/questions/questions-table/QuestionsTable.tsx";
import { Modal } from "@/components/reusable/Modal.tsx";
import { NewQuestionButton } from "@/components/admin/dashboard/questions/new-question-button/NewQuestionButton.tsx";
import { QuizTitle } from "@/components/admin/dashboard/questions/quiz-title/QuizTitle.tsx";
import { BackButton } from "@/components/admin/dashboard/questions/back-button/BackButton.tsx";

const ADMIN_QUESTIONS_FRAGMENT_QUESTION = graphql(`
  fragment AdminQuestionsFragmentQuestion on Question {
    id
    ...QuestionEditorFragment
    ...QuestionsTableFragment
  }
`);

const ADMIN_QUIZ_QUERY = graphql(`
  query AdminQuiz($id: ID!) {
    quiz(id: $id) {
      id
      ...QuizTitleFragment
      ...NewQuestionButtonFragment
      questions {
        id
        ...AdminQuestionsFragmentQuestion
      }
    }
  }
`);

export default function Questions() {
  const quizId = useParams<{ quizId: string }>().quizId!;
  const [editedQuestionId, setEditedQuestionId] = useState<string | null>(null);
  const { loading, error, data } = useQuery(ADMIN_QUIZ_QUERY, {
    variables: { id: quizId },
  });
  const questions = useFragment(
    ADMIN_QUESTIONS_FRAGMENT_QUESTION,
    data?.quiz?.questions || [],
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const quiz = data?.quiz;
  if (!quiz) {
    return <p>Quiz not found!</p>;
  }

  // Compute the selected question only when editedQuestionId is set.
  const editedQuestion = editedQuestionId
    ? (questions.find((q) => q.id === editedQuestionId) ?? null)
    : null;

  return (
    <>
      {editedQuestion && (
        <Modal>
          <QuestionEditor
            question={editedQuestion}
            close={() => {
              setEditedQuestionId(null);
            }}
          />
        </Modal>
      )}
      <BackButton />
      <NewQuestionButton
        quiz={quiz}
        onQuestionCreated={(questionId: string) => {
          setEditedQuestionId(questionId);
        }}
      />
      <QuizTitle quiz={quiz} />
      <QuestionsTable
        questions={questions}
        setEditedQuestionId={setEditedQuestionId}
      />
    </>
  );
}
