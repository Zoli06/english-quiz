import {useMutation, useQuery} from "@apollo/client/react";
import {useState} from "react";
import {Artboard, Button, Table} from "react-daisyui";
import {useNavigate, useParams} from "react-router-dom";
import {QuestionEditor} from "../components/QuestionEditor.tsx";
import config from "@/config.ts";
import helpers from "@/helpers.ts";
import {graphql} from "@/gql";
import {useCreateQuestion} from "@/features/admin/questions/hooks/useCreateQuestion.ts";

const ADMIN_QUIZ_QUERY = graphql(`
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
                createdAt
            }
        }
    }
`);

const DELETE_QUESTION_MUTATION = graphql(`
    mutation DeleteQuestion($id: ID!) {
        deleteQuestion(id: $id)
    }
`);

export const AdminQuestionsPage = () => {
    const navigate = useNavigate();

    const quizId = useParams<{ quizId: string }>().quizId!;

    const [editedQuestionId, setEditedQuestionId] = useState<string | null>(null);

    const {loading, error, data, refetch, previousData} = useQuery(ADMIN_QUIZ_QUERY, {
        variables: {id: quizId},
    });

    const [deleteQuestion] = useMutation(DELETE_QUESTION_MUTATION, {
        refetchQueries: [{query: ADMIN_QUIZ_QUERY, variables: {id: quizId}}],
    });

    const {createQuestion} = useCreateQuestion();

    const token = localStorage.getItem("token");
    helpers.verifyToken(token || "").then((res) => {
        if (!res) {
            alert("You are not logged in or your token has expired!");
            navigate("/admin/login");
        }
    });

    if (loading && !previousData) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const targetData = loading && previousData ? previousData : data;
    const {quiz} = targetData!;

    if (!quiz) {
        return <p>Quiz not found!</p>;
    }
    console.log(quiz.questions)

    // Compute the selected question only when editedQuestionId is set.
    const selectedQuestion = editedQuestionId
        ? quiz.questions.find((q) => q.id === editedQuestionId) ?? null
        : null;

    return (
        <>
            {selectedQuestion && (
                <div
                    className="flex fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 justify-center items-center z-10">
                    <Artboard className="border-2 border-primary max-w-3xl max-h-screen overflow-auto justify-start">
                        <QuestionEditor
                            question={selectedQuestion}
                            close={() => {
                                setEditedQuestionId(null);
                            }}
                            refetchQuestions={refetch}
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
                    onClick={async () => {
                        await createQuestion({
                            quizId,
                            text: "New Question",
                            allowMultipleAnswers: false,
                        });
                        await refetch();
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
                                                alt={question.media?.title || "Question Media"}
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
AdminQuestionsPage.Query = ADMIN_QUIZ_QUERY;
