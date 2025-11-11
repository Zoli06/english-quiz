import { useQuery } from "@apollo/client/react";
import { QuizEditor } from "@/components/admin/dashboard/quizzes/quiz-editor/QuizEditor.tsx";
import { useState } from "react";
import { Modal } from "@/components/reusable/modal/Modal.tsx";
import { graphql, useFragment } from "@/gql";
import { QuizzesTable } from "@/components/admin/dashboard/quizzes/quizzes-table/QuizzesTable.tsx";
import { HomeButton } from "@/components/reusable/home-button/HomeButton.tsx";
import { NewQuizButton } from "@/components/admin/dashboard/quizzes/new-quiz-button/NewQuizButton.tsx";

const ADMIN_QUIZZES_FRAGMENT_QUIZ = graphql(`
  fragment AdminQuizzesFragmentQuiz on Quiz {
    id
    title
    description
    ...QuizEditorFragment
    ...QuizzesTableFragment
  }
`);

const ADMIN_QUIZZES_QUERY = graphql(`
  query AdminQuizzes {
    quizzes {
      id
      ...AdminQuizzesFragmentQuiz
    }
  }
`);

export default function Quizzes() {
  const { loading, error, data } = useQuery(ADMIN_QUIZZES_QUERY);
  const quizzes = useFragment(ADMIN_QUIZZES_FRAGMENT_QUIZ, data?.quizzes || []);
  const [editedQuizId, setEditedQuizId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = (quizId: string | null) => {
    setEditedQuizId(quizId);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    openEditor(null);
    setIsEditorOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <>
      {isEditorOpen && (
        <Modal>
          <QuizEditor
            quiz={quizzes.find((quiz) => quiz.id === editedQuizId)!}
            close={closeEditor}
          />
        </Modal>
      )}
      <HomeButton />
      <NewQuizButton createQuiz={() => openEditor(null)} />
      <h1 className="text-4xl mt-4">Admin</h1>
      <h2 className="text-2xl">Quizzes</h2>
      <QuizzesTable quizzes={quizzes} openEditor={openEditor} />
    </>
  );
}
