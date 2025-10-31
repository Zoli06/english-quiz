import {Toplist} from "../components/Toplist";
import {Button, Select} from "react-daisyui";
import {gql} from "@apollo/client";
import {useQuery} from "@apollo/client/react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const HOME_QUERY = gql`
    query Home($topAttemptsQuizId: ID) {
        topAttempts(quizId: $topAttemptsQuizId, limit: 10) {
            id
            nickname
            score
            total
            quiz {
                id
                title
            }
            time
        }
        quizzes {
            id
            title
        }
    }
`;

type HomeQueryVariablesType = {
    topAttemptsQuizId?: number;
};

type HomeQueryResponseType = {
    topAttempts: {
        id: number;
        nickname: string;
        score: number;
        total: number;
        quiz: {
            id: number;
            title: string;
        };
        time: number;
    }[];
    quizzes: {
        id: number;
        title: string;
    }[];
};

export const Home = () => {
    const navigate = useNavigate();

    const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
    const {loading, error, data} = useQuery<
        HomeQueryResponseType,
        HomeQueryVariablesType
    >(HOME_QUERY, {
        variables: {topAttemptsQuizId: selectedQuiz || undefined},
        // onCompleted: (data) => {
        //   if (data.quizzes.length === 0) return;
        //   if (!selectedQuiz) setSelectedQuiz(data.quizzes[0].id);
        // },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    const {topAttempts, quizzes} = data!;

    if (quizzes.length === 0) {
        return (
            <div>
                <h1 className="text-4xl">No quizzes available</h1>
                <p>Check back later</p>
            </div>
        );
    }

    if (selectedQuiz === null) {
        setSelectedQuiz(quizzes[0].id);
    }

    const startQuiz = (quizId: number) => {
        navigate(`/quiz/${quizId}`);
    };

    return (
        <>
            <h1 className="text-4xl">Quizzes for the open day</h1>
            <div className="flex justify-center w-full mt-4">
                <div className="flex w-1/2 gap-2">
                    <Select
                        onChange={(e) => setSelectedQuiz(parseInt(e.target.value))}
                        value={selectedQuiz || quizzes[0].id}
                        className="grow"
                    >
                        {quizzes.map((quiz) => {
                            return (
                                <Select.Option key={quiz.id} value={quiz.id}>
                                    {quiz.title}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    <Button
                        onClick={() =>
                            selectedQuiz && startQuiz(selectedQuiz)
                        }
                        className="grow"
                        color="success"
                    >
                        Start quiz
                    </Button>
                </div>
            </div>
            <h2 className="text-3xl mt-4">
                Top results for{" "}
                {
                    quizzes.find(
                        (quiz) => quiz.id.toString() === selectedQuiz?.toString(),
                    )?.title
                }
            </h2>
            <Toplist attempts={topAttempts} hideQuizName/>
        </>
    );
};
