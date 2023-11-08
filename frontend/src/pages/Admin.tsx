import { gql, useQuery, useMutation } from '@apollo/client';
import { QuestionEditor } from '../components/QuestionEditor';
import React, { useState } from 'react';
import { Button } from 'react-daisyui';

const ADMIN_QUERY = gql`
  query Admin {
    quizzes {
      id
      title
      questions {
        id
        text
        allowMultipleAnswers
        options {
          id
          text
          isCorrect
        }
      }
    }
  }
`;

type AdminQueryType = {
  quizzes: {
    id: string;
    title: string;
    questions: {
      id: string;
      text: string;
      allowMultipleAnswers: boolean;
      options: {
        id: string;
        text: string;
        isCorrect: boolean;
      }[];
    }[];
  }[];
};

// #region Mutations

const CREATE_QUIZ_MUTATION = gql`
  mutation CreateQuiz($title: String!) {
    createQuiz(title: $title) {
      id
      title
    }
  }
`;

type CreateQuizMutationVariablesType = {
  title: string;
};

type CreateQuizMutationResponseType = {
  createQuiz: {
    id: string;
    title: string;
  };
};

const EDIT_QUIZ_MUTATION = gql`
  mutation EditQuiz($id: ID!, $title: String!) {
    editQuiz(id: $id, title: $title) {
      id
      title
    }
  }
`;

type EditQuizMutationVariablesType = {
  id: string;
  title: string;
};

type EditQuizMutationResponseType = {
  editQuiz: {
    id: string;
    title: string;
  };
};

const DELETE_QUIZ_MUTATION = gql`
  mutation DeleteQuiz($id: ID!) {
    deleteQuiz(id: $id)
  }
`;

type DeleteQuizMutationVariablesType = {
  id: string;
};

type DeleteQuizMutationResponseType = {
  deleteQuiz: boolean;
};

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion(
    $quizId: ID!
    $text: String!
    $allowMultipleAnswers: Boolean!
  ) {
    createQuestion(
      quizId: $quizId
      text: $text
      allowMultipleAnswers: $allowMultipleAnswers
    ) {
      id
      text
      allowMultipleAnswers
    }
  }
`;

type CreateQuestionMutationVariablesType = {
  quizId: string;
  text: string;
  allowMultipleAnswers: boolean;
};

type CreateQuestionMutationResponseType = {
  createQuestion: {
    id: string;
    text: string;
    allowMultipleAnswers: boolean;
  };
};

const EDIT_QUESTION_MUTATION = gql`
  mutation EditQuestion(
    $id: ID!
    $text: String!
    $allowMultipleAnswers: Boolean!
  ) {
    editQuestion(
      id: $id
      text: $text
      allowMultipleAnswers: $allowMultipleAnswers
    ) {
      id
      text
      allowMultipleAnswers
    }
  }
`;

type EditQuestionMutationVariablesType = {
  id: string;
  text: string;
  allowMultipleAnswers: boolean;
};

type EditQuestionMutationResponseType = {
  editQuestion: {
    id: string;
    text: string;
    allowMultipleAnswers: boolean;
  };
};

const DELETE_QUESTION_MUTATION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`;

type DeleteQuestionMutationVariablesType = {
  id: string;
};

type DeleteQuestionMutationResponseType = {
  deleteQuestion: boolean;
};

const CREATE_OPTION_MUTATION = gql`
  mutation CreateOption(
    $questionId: ID!
    $text: String!
    $isCorrect: Boolean!
  ) {
    createOption(questionId: $questionId, text: $text, isCorrect: $isCorrect) {
      id
      text
      isCorrect
    }
  }
`;

type CreateOptionMutationVariablesType = {
  questionId: string;
  text: string;
  isCorrect: boolean;
};

type CreateOptionMutationResponseType = {
  createOption: {
    id: string;
    text: string;
    isCorrect: boolean;
  };
};

const EDIT_OPTION_MUTATION = gql`
  mutation EditOption($id: ID!, $text: String!, $isCorrect: Boolean!) {
    editOption(id: $id, text: $text, isCorrect: $isCorrect) {
      id
      text
      isCorrect
    }
  }
`;

type EditOptionMutationVariablesType = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type EditOptionMutationResponseType = {
  editOption: {
    id: string;
    text: string;
    isCorrect: boolean;
  };
};

const DELETE_OPTION_MUTATION = gql`
  mutation DeleteOption($id: ID!) {
    deleteOption(id: $id)
  }
`;

type DeleteOptionMutationVariablesType = {
  id: string;
};

type DeleteOptionMutationResponseType = {
  deleteOption: boolean;
};

// #endregion

export const Admin = () => {
  // #region Mutation Hooks
  const [createQuiz] = useMutation<
    CreateQuizMutationResponseType,
    CreateQuizMutationVariablesType
  >(CREATE_QUIZ_MUTATION);
  const [editQuiz] = useMutation<
    EditQuizMutationResponseType,
    EditQuizMutationVariablesType
  >(EDIT_QUIZ_MUTATION);
  const [deleteQuiz] = useMutation<
    DeleteQuizMutationResponseType,
    DeleteQuizMutationVariablesType
  >(DELETE_QUIZ_MUTATION);
  const [createQuestion] = useMutation<
    CreateQuestionMutationResponseType,
    CreateQuestionMutationVariablesType
  >(CREATE_QUESTION_MUTATION);
  const [editQuestion] = useMutation<
    EditQuestionMutationResponseType,
    EditQuestionMutationVariablesType
  >(EDIT_QUESTION_MUTATION);
  const [deleteQuestion] = useMutation<
    DeleteQuestionMutationResponseType,
    DeleteQuestionMutationVariablesType
  >(DELETE_QUESTION_MUTATION);
  const [createOption] = useMutation<
    CreateOptionMutationResponseType,
    CreateOptionMutationVariablesType
  >(CREATE_OPTION_MUTATION);
  const [editOption] = useMutation<
    EditOptionMutationResponseType,
    EditOptionMutationVariablesType
  >(EDIT_OPTION_MUTATION);
  const [deleteOption] = useMutation<
    DeleteOptionMutationResponseType,
    DeleteOptionMutationVariablesType
  >(DELETE_OPTION_MUTATION);
  // #endregion

  const { loading, error, data } = useQuery<AdminQueryType>(ADMIN_QUERY);
  const [editedQuestionId, setEditedQuestionId] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const { quizzes } = data!;

  const saveQuestion = ({
    id,
    text,
    allowMultipleAnswers,
    options,
  }: {
    id: string | null;
    text: string;
    allowMultipleAnswers: boolean;
    options: {
      id: string | null;
      text: string;
      isCorrect: boolean;
    }[];
  }) => {
    if (id) {
      // Edit
      editQuestion({
        variables: {
          id,
          text,
          allowMultipleAnswers,
        },
      });

      // Get quizId from questionId
      const quizId = quizzes.find((quiz) =>
        quiz.questions.find((question) => question.id === id)
      )!.id;

      // Find deleted options
      const deletedOptions = quizzes
        .find((quiz) => quiz.id === quizId)!
        .questions.find((question) => question.id === id)!
        .options.filter((option) => !options.find((o) => o.id === option.id));

      // Delete options
      for (const option of deletedOptions) {
        deleteOption({
          variables: {
            id: option.id,
          },
        });
      }
    } else {
      // Create
      createQuestion({
        variables: {
          quizId: quizzes[0].id,
          text,
          allowMultipleAnswers,
        },
      });
    }

    for (const option of options) {
      if (option.id) {
        // Edit
        editOption({
          variables: {
            id: option.id,
            text: option.text,
            isCorrect: option.isCorrect,
          },
        });
      } else {
        // Create
        createOption({
          variables: {
            questionId: id || quizzes[0].questions[0].id,
            text: option.text,
            isCorrect: option.isCorrect,
          },
        });
      }
    }
  };

  return (
    <div>
      {editedQuestionId && (
        <div>
          <Button
            className='m-4'
            onClick={() => {
              setEditedQuestionId(null);
            }}
          >
            Close
          </Button>
          <QuestionEditor
            question={
              data!.quizzes
                .find((quiz) =>
                  quiz.questions.find(
                    (question) => question.id === editedQuestionId
                  )
                )!
                .questions.find((question) => question.id === editedQuestionId)!
            }
            saveQuestion={saveQuestion}
            deleteQuestion={() => {
              return null;
            }}
          />
        </div>
      )}
      <h1>Admin</h1>
      <h2>Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => {
          return (
            <li key={quiz.id}>
              <h3>{quiz.title}</h3>
              <ul>
                {quiz.questions.map((question) => {
                  return (
                    <li key={question.id}>
                      <h4>{question.text}</h4>
                      <Button
                        className='m-4'
                        onClick={() => {
                          setEditedQuestionId(question.id);
                        }}
                      >
                        Edit
                      </Button>
                      <ul>
                        {question.options.map((option) => {
                          return (
                            <li key={option.id}>
                              <p>{option.text}</p>
                              <p>
                                {option.isCorrect ? 'Correct' : 'Incorrect'}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
