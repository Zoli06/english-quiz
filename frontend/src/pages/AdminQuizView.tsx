import {gql} from "@apollo/client";
import {useMutation, useQuery} from "@apollo/client/react";
import {useState} from "react";
import {Artboard, Button, Table} from "react-daisyui";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionEditor} from "../components/QuestionEditor";
import config from "../config";
import helpers from "../helpers";

const ADMIN_QUIZ_QUERY = gql`
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
    id: number;
};

type AdminQuizQueryResponseType = {
    quiz: {
        id: number;
        title: string;
        description: string;
        questions: {
            id: number;
            text: string;
            allowMultipleAnswers: boolean;
            options: {
                id: number;
                text: string;
                isCorrect: boolean;
            }[];
            media?: {
                id: number;
                url: string;
                title: string;
                type: "image" | "video";
            };
            quizId: number;
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
    quizId: number;
    text: string;
    allowMultipleAnswers: boolean;
    mediaId?: number;
};

type CreateQuestionMutationResponseType = {
    createQuestion: {
        id: number;
        text: string;
        allowMultipleAnswers: boolean;
        media?: {
            id: number;
            url: string;
            title: string;
            type: "image" | "video";
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
    id: number;
    text: string;
    allowMultipleAnswers: boolean;
    mediaId?: number;
};

type EditQuestionMutationResponseType = {
    editQuestion: {
        id: number;
        text: string;
        allowMultipleAnswers: boolean;
        media?: {
            id: number;
            url: string;
            title: string;
            type: "image" | "video";
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
    id: number;
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
    questionId: number;
    text: string;
    isCorrect: boolean;
};

type CreateOptionMutationResponseType = {
    createOption: {
        id: number;
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
    id: number;
    text: string;
    isCorrect: boolean;
};

type EditOptionMutationResponseType = {
    editOption: {
        id: number;
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
    id: number;
};

type DeleteOptionMutationResponseType = {
    deleteOption: boolean;
};

export const AdminQuizView = () => {
    const navigate = useNavigate();

    const quizId = parseInt(useParams<{ quizId: string }>().quizId!);

    const [editedQuestionId, setEditedQuestionId] = useState<number | null>(null);

    const {loading, error, data} = useQuery<
        AdminQuizQueryResponseType,
        AdminQuizQueryVariablesType
    >(ADMIN_QUIZ_QUERY, {
        variables: {id: quizId!},
    });

    const [createQuestion] = useMutation<
        CreateQuestionMutationResponseType,
        CreateQuestionMutationVariablesType
    >(CREATE_QUESTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });
    const [editQuestion] = useMutation<
        EditQuestionMutationResponseType,
        EditQuestionMutationVariablesType
    >(EDIT_QUESTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });
    const [deleteQuestion] = useMutation<
        DeleteQuestionMutationResponseType,
        DeleteQuestionMutationVariablesType
    >(DELETE_QUESTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });
    const [createOption] = useMutation<
        CreateOptionMutationResponseType,
        CreateOptionMutationVariablesType
    >(CREATE_OPTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });
    const [editOption] = useMutation<
        EditOptionMutationResponseType,
        EditOptionMutationVariablesType
    >(EDIT_OPTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });
    const [deleteOption] = useMutation<
        DeleteOptionMutationResponseType,
        DeleteOptionMutationVariablesType
    >(DELETE_OPTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });

    const token = localStorage.getItem("token");
    helpers.verifyToken(token || "").then((res) => {
        if (!res) {
            alert("You are not logged in or your token has expired!");
            navigate("/admin/login");
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const {quiz} = data!;

    const saveQuestion = ({
                              id,
                              text,
                              allowMultipleAnswers,
                              options,
                              mediaId,
                          }: {
        id: number | null;
        text: string;
        allowMultipleAnswers: boolean;
        options: {
            id: number | null;
            text: string;
            isCorrect: boolean;
        }[];
        mediaId?: number;
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
            }).then();

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
                }).then();
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
            }).then();
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
                }).then();
            } else {
                // Create
                createOption({
                    variables: {
                        questionId: id || quiz.questions[quiz.questions.length - 1].id,
                        text: option.text,
                        isCorrect: option.isCorrect,
                    },
                }).then();
            }
        }
    };

    return (
        <>
            {editedQuestionId && (
                <div
                    className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-10">
                    <Artboard className="border-2 border-primary max-w-3xl max-h-screen overflow-auto justify-start">
                        <QuestionEditor
                            question={
                                quiz.questions.find(
                                    (question) => question.id === editedQuestionId,
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
            <Button
                onClick={() => {
                    navigate("/admin");
                }}
                className="absolute top-4 left-4"
            >
                Back
            </Button>
            <div className="absolute top-0 right-0 flex gap-4 mt-4 mr-4">
                <Button
                    color="success"
                    onClick={() => {
                        saveQuestion({
                            id: null,
                            text: "New Question",
                            allowMultipleAnswers: false,
                            options: [],
                        });
                    }}
                >
                    Create Question
                </Button>
            </div>
            <h1 className="text-4xl mt-4">{quiz.title}</h1>
            <h2 className="text-2xl">{quiz.description}</h2>
            <Table>
                <Table.Head>
                    <span>Question</span>
                    <span>Image/video</span>
                    <span>Options</span>
                    <span className="flex justify-end">Actions</span>
                </Table.Head>
                <Table.Body>
                    {/* order by latest createdAt */}
                    {quiz.questions
                        .slice()
                        .sort((a, b) => {
                            return (
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                            );
                        })
                        .map((question) => {
                            return (
                                <Table.Row key={question.id}>
                                    <h3>{question.text}</h3>
                                    {question.media ? (
                                        question.media.type === "image" ? (
                                            <img
                                                src={config.apiUrl + question.media.url}
                                                alt={question.media.title}
                                                className="w-32"
                                            />
                                        ) : (
                                            <video
                                                src={config.apiUrl + question.media.url}
                                                className="w-32"
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
                                                                ? "text-success font-bold"
                                                                : "text-error"
                                                        }
                                                    >
                                                        {option.text}
                                                    </p>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className="flex gap-4 justify-end">
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
                                                }).then();
                                            }}
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Table.Row>
                            );
                        })}
                </Table.Body>
            </Table>
        </>
    );
};

// https://github.com/remix-run/react-router/discussions/10856
AdminQuizView.Query = ADMIN_QUIZ_QUERY;
