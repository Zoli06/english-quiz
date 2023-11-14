import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Artboard, Button, Table } from 'react-daisyui';
import { useParams } from 'react-router-dom';
import { QuestionEditor } from '../components/QuestionEditor';
import config from '../config';
import helpers from '../helpers';
import { useNavigate } from 'react-router-dom';

export const ADMIN_QUIZ_QUERY = gql`
  query AdminQuiz($id: ID!) {
    quiz(id: $id) {
      id
      title
      description
      questions {
        id
        text
        allowMultipleAnswers
        options {
          id
          text
          isCorrect
        }
        media {
          id
          url
          title
          type
        }
        quizId
        createdAt
      }
    }
  }
`;

type AdminQuizQueryVariablesType = {
  id: string;
};

type AdminQuizQueryResponseType = {
  quiz: {
    id: string;
    title: string;
    description: string;
    questions: {
      id: string;
      text: string;
      allowMultipleAnswers: boolean;
      options: {
        id: string;
        text: string;
        isCorrect: boolean;
      }[];
      media?: {
        id: string;
        url: string;
        title: string;
        type: 'image' | 'video';
      };
      quizId: string;
      createdAt: string;
    }[];
  };
};

const CREATE_QUESTION_MUTATION = gql`
  mutation CreateQuestion(
    $quizId: ID!
    $text: String!
    $allowMultipleAnswers: Boolean!
    $mediaId: ID
  ) {
    createQuestion(
      quizId: $quizId
      text: $text
      allowMultipleAnswers: $allowMultipleAnswers
      mediaId: $mediaId
    ) {
      id
      text
      allowMultipleAnswers
      media {
        id
        url
        title
        type
      }
      createdAt
    }
  }
`;

type CreateQuestionMutationVariablesType = {
  quizId: string;
  text: string;
  allowMultipleAnswers: boolean;
  mediaId?: string;
};

type CreateQuestionMutationResponseType = {
  createQuestion: {
    id: string;
    text: string;
    allowMultipleAnswers: boolean;
    media?: {
      id: string;
      url: string;
      title: string;
      type: 'image' | 'video';
    };
    createdAt: string;
  };
};

const EDIT_QUESTION_MUTATION = gql`
  mutation EditQuestion(
    $id: ID!
    $text: String!
    $allowMultipleAnswers: Boolean!
    $mediaId: ID
  ) {
    editQuestion(
      id: $id
      text: $text
      allowMultipleAnswers: $allowMultipleAnswers
      mediaId: $mediaId
    ) {
      id
      text
      allowMultipleAnswers
      media {
        id
        url
        title
        type
      }
      createdAt
    }
  }
`;

type EditQuestionMutationVariablesType = {
  id: string;
  text: string;
  allowMultipleAnswers: boolean;
  mediaId?: string;
};

type EditQuestionMutationResponseType = {
  editQuestion: {
    id: string;
    text: string;
    allowMultipleAnswers: boolean;
    media?: {
      id: string;
      url: string;
      title: string;
      type: 'image' | 'video';
    };
    createdAt: string;
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

export const AdminQuizView = () => {
  const navigate = useNavigate();

  const { quizId } = useParams<{ quizId: string }>();

  const [editedQuestionId, setEditedQuestionId] = useState<string | null>(null);

  const { loading, error, data } = useQuery<
    AdminQuizQueryResponseType,
    AdminQuizQueryVariablesType
  >(ADMIN_QUIZ_QUERY, {
    variables: { id: quizId! },
  });

  const [createQuestion] = useMutation<
    CreateQuestionMutationResponseType,
    CreateQuestionMutationVariablesType
  >(CREATE_QUESTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });
  const [editQuestion] = useMutation<
    EditQuestionMutationResponseType,
    EditQuestionMutationVariablesType
  >(EDIT_QUESTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });
  const [deleteQuestion] = useMutation<
    DeleteQuestionMutationResponseType,
    DeleteQuestionMutationVariablesType
  >(DELETE_QUESTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });
  const [createOption] = useMutation<
    CreateOptionMutationResponseType,
    CreateOptionMutationVariablesType
  >(CREATE_OPTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });
  const [editOption] = useMutation<
    EditOptionMutationResponseType,
    EditOptionMutationVariablesType
  >(EDIT_OPTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });
  const [deleteOption] = useMutation<
    DeleteOptionMutationResponseType,
    DeleteOptionMutationVariablesType
  >(DELETE_OPTION_MUTATION, {
    refetchQueries: [{ query: ADMIN_QUIZ_QUERY, variables: { id: quizId } }],
  });

  const token = localStorage.getItem('token');
  helpers.verifyToken(token || '').then((res) => {
    if (!res) {
      alert('You are not logged in or your token has expired!');
      navigate('/admin/login');
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  const { quiz } = data!;

  const saveQuestion = ({
    id,
    text,
    allowMultipleAnswers,
    options,
    mediaId,
  }: {
    id: string | null;
    text: string;
    allowMultipleAnswers: boolean;
    options: {
      id: string | null;
      text: string;
      isCorrect: boolean;
    }[];
    mediaId?: string;
  }) => {
    if (id) {
      // Edit
      editQuestion({
        variables: {
          id,
          text,
          allowMultipleAnswers,
          mediaId,
        },
      });

      // Get deleted options
      const deletedOptions = quiz.questions
        .find((question) => question.id === id)!
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
          quizId: quiz.id,
          text,
          allowMultipleAnswers,
          mediaId,
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
            questionId: id || quiz.questions[quiz.questions.length - 1].id,
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
        <div className='flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-10'>
          <Artboard className='border-2 border-primary max-w-3xl max-h-screen overflow-auto justify-start'>
            <QuestionEditor
              question={
                quiz.questions.find(
                  (question) => question.id === editedQuestionId
                )!
              }
              saveQuestion={saveQuestion}
              deleteQuestion={() => {
                return null;
              }}
              close={() => {
                setEditedQuestionId(null);
              }}
            />
          </Artboard>
        </div>
      )}
      <div className='flex justify-center items-center min-h-screen'>
        <Artboard className='max-w-3xl relative'>
          <Button
            onClick={() => {
              navigate('/admin');
            }}
            className='absolute top-4 left-4'
          >
            Back
          </Button>
          <h1 className='text-4xl mt-4'>{quiz.title}</h1>
          <h2 className='text-2xl'>{quiz.description}</h2>
          <Button
            className='m-4'
            onClick={() => {
              saveQuestion({
                id: null,
                text: 'New Question',
                allowMultipleAnswers: false,
                options: [],
              });
            }}
          >
            Create Question
          </Button>
          <Table>
            <Table.Head>
              <span>Question</span>
              <span>Image/video</span>
              <span>Options</span>
              <span>Actions</span>
            </Table.Head>
            <Table.Body>
              {/* order by latest createdAt */ }
              {quiz.questions.sort((a, b) => {
                return (
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
                );
              }).map((question) => {
                return (
                  <Table.Row key={question.id}>
                    <h3>{question.text}</h3>
                    {question.media ? (
                      question.media.type === 'image' ? (
                        <img
                          src={config.apiUrl + question.media.url}
                          alt={question.media.title}
                          className='w-32'
                        />
                      ) : (
                        <video
                          src={config.apiUrl + question.media.url}
                          className='w-32'
                          controls
                        />
                      )
                    ) : (
                      <p>No media</p>
                    )}
                    <ul>
                      {question.options.map((option) => {
                        return (
                          <li key={option.id}>
                            <p
                              className={
                                option.isCorrect
                                  ? 'text-success font-bold'
                                  : 'text-error'
                              }
                            >
                              {option.text}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      onClick={() => {
                        setEditedQuestionId(question.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        deleteQuestion({
                          variables: {
                            id: question.id,
                          },
                        });
                      }}
                      color='error'
                    >
                      Delete
                    </Button>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Artboard>
      </div>
    </div>
  );
};
