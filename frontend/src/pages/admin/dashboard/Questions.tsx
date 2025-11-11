import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { graphql, useFragment } from "@/gql";
import { QuestionEditor } from "@/components/admin/dashboard/questions/question-editor/QuestionEditor.tsx";
import { QuestionsTable } from "@/components/admin/dashboard/questions/questions-table/QuestionsTable.tsx";
import { Modal } from "@/components/reusable/modal/Modal.tsx";
import { NewQuestionButton } from "@/components/admin/dashboard/questions/new-question-button/NewQuestionButton.tsx";
import { QuizTitle } from "@/components/admin/dashboard/questions/quiz-title/QuizTitle.tsx";
import { BackButton } from "@/components/admin/dashboard/questions/back-button/BackButton.tsx";

const ADMIN_QUESTIONS_FRAGMENT_QUESTION = graphql(`
  fragment AdminQuestionsFragmentQuestion on Question {
    id
    ...QuestionsTableFragment
  }
`);

const ADMIN_QUIZ_QUERY = graphql(`
  query AdminQuiz($id: ID!) {
    quiz(id: $id) {
      id
      ...QuizTitleFragment
      ...QuestionEditorFragment
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
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { loading, error, data } = useQuery(ADMIN_QUIZ_QUERY, {
    variables: { id: quizId },
  });
  const questions = useFragment(
    ADMIN_QUESTIONS_FRAGMENT_QUESTION,
    data?.quiz?.questions || [],
  );

  const openEditor = (questionId: string | null) => {
    setEditedQuestionId(questionId);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditedQuestionId(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const quiz = data?.quiz;
  if (!quiz) {
    return <p>Quiz not found!</p>;
  }

  return (
    <>
      {isEditorOpen && (
        <Modal>
          <QuestionEditor
            quiz={quiz}
            questionId={editedQuestionId}
            close={closeEditor}
          />
        </Modal>
      )}
      <BackButton />
      <NewQuestionButton createQuestion={() => openEditor(null)} />
      <QuizTitle quiz={quiz} />
      <QuestionsTable questions={questions} openEditor={openEditor} />
    </>
  );
}
