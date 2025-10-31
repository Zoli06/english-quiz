import { gql } from "@apollo/client";
import {useQuery, useMutation} from "@apollo/client/react";
import { QuizEditor } from "../components/QuizEditor";
import { useState } from "react";
import { Artboard, Button, Table } from "react-daisyui";
import helpers from "../helpers";
import { useNavigate } from "react-router-dom";

const ADMIN_QUERY = gql`
  query Admin {
    quizzes {
      id
      title
      description
    }
  }
`;

type AdminQueryType = {
  quizzes: {
    id: number;
    title: string;
    description: string;
  }[];
};

// #region Mutations

const CREATE_QUIZ_MUTATION = gql`
  mutation CreateQuiz($title: String!, $description: String!) {
    createQuiz(title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type CreateQuizMutationVariablesType = {
  title: string;
  description: string;
};

type CreateQuizMutationResponseType = {
  createQuiz: {
    id: number;
    title: string;
    description: string;
  };
};

const EDIT_QUIZ_MUTATION = gql`
  mutation EditQuiz($id: ID!, $title: String!, $description: String!) {
    editQuiz(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

type EditQuizMutationVariablesType = {
  id: number;
  title: string;
  description: string;
};

type EditQuizMutationResponseType = {
  editQuiz: {
    id: number;
    title: string;
    description: string;
  };
};

const DELETE_QUIZ_MUTATION = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id)
  }
`;

type DeleteQuizMutationVariablesType = {
  id: number;
};

type DeleteQuizMutationResponseType = {
  deleteQuiz: boolean;
};

// #endregion

export const Admin = () => {
  const navigate = useNavigate();

  // #region Mutation Hooks
  const [createQuiz] = useMutation<
    CreateQuizMutationResponseType,
    CreateQuizMutationVariablesType
  >(CREATE_QUIZ_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUERY }],
  });
  const [editQuiz] = useMutation<
    EditQuizMutationResponseType,
    EditQuizMutationVariablesType
  >(EDIT_QUIZ_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUERY }],
  });
  const [deleteQuiz] = useMutation<
    DeleteQuizMutationResponseType,
    DeleteQuizMutationVariablesType
  >(DELETE_QUIZ_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUERY }],
  });
  // #endregion

  const { loading, error, data } = useQuery<AdminQueryType>(ADMIN_QUERY);

  const [editedQuizId, setEditedQuizId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  helpers.verifyToken(token || "").then((res) => {
    if (!res) {
      navigate("/admin/login");
    }
  });

  const deleteQuizWithConfirmation = (quizId: number) => {
    // Ask for confirmation
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }
    deleteQuiz({
      variables: {
        id: quizId,
      },
    }).then();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { quizzes } = data!;

  return (
    <>
      {editedQuizId && (
        <div className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-10">
          <Artboard className="border-2 border-primary max-w-3xl max-h-screen overflow-auto justify-start">
            <QuizEditor
              quiz={quizzes.find((quiz) => quiz.id === editedQuizId)!}
              saveQuiz={(quiz) => {
                editQuiz({
                  variables: {
                    id: quiz.id,
                    title: quiz.title,
                    description: quiz.description,
                  },
                }).then();
              }}
              deleteQuiz={deleteQuizWithConfirmation}
              close={() => {
                setEditedQuizId(null);
              }}
            />
          </Artboard>
        </div>
      )}
      <Button
        onClick={() => {
          navigate("/");
        }}
        className="absolute top-4 left-4"
      >
        Home
      </Button>
      <div className="absolute top-0 right-0 flex gap-4 mt-4 mr-4">
        <Button
          color="success"
          onClick={() => {
            createQuiz({
              variables: {
                title: "New Quiz",
                description: "New Quiz Description",
              },
            }).then();
          }}
        >
          Create Quiz
        </Button>
        <Button
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("/admin/login");
          }}
          color="error"
        >
          Logout
        </Button>
      </div>
      <h1 className="text-4xl mt-4">Admin</h1>
      <h2 className="text-2xl">Quizzes</h2>
      <Table>
        <Table.Head>
          <span>Title</span>
          <span>Description</span>
          <span className="flex justify-end">Actions</span>
        </Table.Head>
        <Table.Body>
          {quizzes.map((quiz) => {
            return (
              <Table.Row key={quiz.id}>
                <h3>{quiz.title}</h3>
                <p>{quiz.description}</p>
                <span className="flex gap-4 justify-end">
                  <Button
                    onClick={() => {
                      navigate(`/admin/quiz/${quiz.id}`);
                    }}
                  >
                    Questions
                  </Button>
                  <Button
                    onClick={() => {
                      setEditedQuizId(quiz.id);
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    onClick={() => {
                      deleteQuizWithConfirmation(quiz.id);
                    }}
                    color="error"
                  >
                    Delete Quiz
                  </Button>
                </span>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
};
