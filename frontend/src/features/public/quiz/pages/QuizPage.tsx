import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Question} from "../components/Question.tsx";
import {QuestionSelector} from "../components/QuestionSelector.tsx";
import {useMutation, useQuery} from "@apollo/client/react";
import {graphql} from "@/gql";

const QUIZ_QUERY = graphql(`
    query Quiz($id: ID!) {
        quiz(id: $id) {
            id
            questions {
                id
                text
                allowMultipleAnswers
                options {
                    id
                    text
                }
                media {
                    id
                    url
                    title
                    type
                }
            }
        }
    }
`);

const ATTEMPT_SUBMISSION_MUTATION = graphql(`
    mutation SubmitAttempt(
        $quizId: ID!
        $nickname: String!
        $answers: [Answer!]!
        $time: Int!
    ) {
        submitAttempt(
            quizId: $quizId
            nickname: $nickname
            answers: $answers
            time: $time
        ) {
            attempt {
                id
            }
            quiz {
                id
                questions {
                    id
                    options {
                        id
                        text
                        isCorrect
                    }
                }
            }
        }
    }
`);

// There's a bug
// Saved answers change after submit for some reason
// Not going to fix it, it redirects to result page anyway
export const QuizPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.onbeforeunload = function () {
            return true;
        }
        return () => {
            window.onbeforeunload = null;
        }
    }, []);

    const quizId = useParams<{
            quizId: string;
        }>().quizId!;

    const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
    const [savedAnswers, setSavedAnswers] = useState<{ [key: string]: string[] }>(
        {},
    );
    const [startTimestamp] = useState(() => Date.now());

    const {loading, error, data} = useQuery(QUIZ_QUERY, {
        variables: {id: quizId!},
    });

    const [submitQuizMutation] = useMutation(ATTEMPT_SUBMISSION_MUTATION);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>API error!</p>;
    if (!data || !data.quiz) return <p>Quiz not found</p>;

    if (!activeQuestionId) {
        if (data!.quiz.questions.length === 0) {
            return (
                <div>
                    <p>No questions found</p>
                    <Link to="/" className="text-blue-500">
                        Go back
                    </Link>
                </div>
            );
        }
        setActiveQuestionId(data!.quiz.questions[0].id);
    }

    const question = data!.quiz.questions.find(
        (element) => element.id === activeQuestionId,
    );
    if (!question) return <p>Error! Question not found</p>;

    const saveAnswers = (questionId: string, answerIds: string[]) => {
        setSavedAnswers({
            ...savedAnswers,
            [questionId]: answerIds,
        });
    };

    const submitQuiz = async () => {
        const endTimestamp = Date.now();
        const timeTaken = endTimestamp - startTimestamp;

        const answers = Object.entries(savedAnswers).map(
            ([questionId, answerIds]) => {
                return {
                    questionId: questionId,
                    optionIds: answerIds,
                };
            },
        );

        const nickname = (() => {
            while (true) {
                const nickname = prompt("Enter your nickname");
                if (nickname) return nickname;
            }
        })();

        const {data} = await submitQuizMutation({
            variables: {
                quizId: quizId!,
                nickname,
                answers,
                time: timeTaken,
            },
        });

        navigate(`/result/${data!.submitAttempt?.attempt?.id}`);
    };

    return (
        <>
            <QuestionSelector
                questions={data!.quiz.questions}
                activeQuestionId={activeQuestionId!}
                setActiveQuestionId={setActiveQuestionId}
                submitQuiz={submitQuiz}
            />
            <Question
                question={question}
                saveAnswers={saveAnswers}
                savedAnswerIds={savedAnswers[question.id] || []}
            />
        </>
    );
};
