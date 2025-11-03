import {Option} from "./models/option/option.orm.js";
import {Quiz} from "./models/quiz/quiz.orm.js";
import {Question} from "./models/question/question.orm.js";

// Maybe rewrite this later to test cases
// Now I don't have time for that
export const fillWithTestData = async () => {
    const quiz = await Quiz.create({
        title: "Test quiz",
        description: "Test quiz description",
    });

    const question1 = await Question.create({
        quizId: quiz.getDataValue("id"),
        text: "What is the capital of Hungary?",
        allowMultipleAnswers: false,
    });

    await Option.create({
        questionId: question1.getDataValue("id"),
        text: "Bukarest",
        isCorrect: false,
    });

    await Option.create({
        questionId: question1.getDataValue("id"),
        text: "Budapest",
        isCorrect: true,
    });

    const question2 = await Question.create({
        quizId: quiz.getDataValue("id"),
        text: "Question with multiple answers",
        allowMultipleAnswers: true,
    });

    await Option.create({
        questionId: question2.getDataValue("id"),
        text: "Correct answer",
        isCorrect: true,
    });

    await Option.create({
        questionId: question2.getDataValue("id"),
        text: "Incorrect answer",
        isCorrect: false,
    });

    await Option.create({
        questionId: question2.getDataValue("id"),
        text: "Correct answer 2",
        isCorrect: true,
    });

    await Option.create({
        questionId: question2.getDataValue("id"),
        text: "Incorrect answer 2",
        isCorrect: false,
    });
};
