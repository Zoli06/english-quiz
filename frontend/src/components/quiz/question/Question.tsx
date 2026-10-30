import React from "react";
import { Button, Checkbox, Radio } from "react-daisyui";
import { getUploadUrl } from "@/config.ts";
import { FragmentType, graphql, useFragment } from "@/gql";
import { Media } from "@/components/reusable/media/Media.tsx";

const QUESTION_FRAGMENT = graphql(`
  fragment QuestionFragment on Question {
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
      path
      title
      type
    }
  }
`);

export const Question = (props: {
  question: FragmentType<typeof QUESTION_FRAGMENT>;
  saveAnswers: (questionId: string, answerIds: string[]) => void;
  savedAnswerIds: string[];
  showCorrectAnswerAfterEachQuestion: boolean;
  isAnswerChecked: boolean;
  checkAnswer: (questionId: string) => void;
  isLastQuestion: boolean;
  onContinue: () => void;
}) => {
  const question = useFragment(QUESTION_FRAGMENT, props.question);
  const {
    saveAnswers,
    savedAnswerIds,
    showCorrectAnswerAfterEachQuestion,
    isAnswerChecked,
    checkAnswer,
    isLastQuestion,
    onContinue,
  } = props;
  const isAnswerCorrect =
    savedAnswerIds.length > 0 &&
    savedAnswerIds.length ===
      question.options.filter((option) => option.isCorrect).length &&
    savedAnswerIds.every((answerId) =>
      question.options.some(
        (option) => option.id === answerId && option.isCorrect,
      ),
    );

  const OptionElement = question.allowMultipleAnswers ? Checkbox : Radio;

  return (
    <div className="py-4">
      {question.media && (
        <Media
          src={getUploadUrl(question.media.path)}
          alt={question.media.title || "Question Media"}
          className={"w-full max-h-96 object-contain"}
          type={question.media.type.startsWith("image") ? "image" : "video"}
        />
      )}
      <h1 className="text-2xl">{question.text}</h1>
      <form
        className="flex flex-col"
        onSubmit={(e) => e.preventDefault()}
        onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
          if (isAnswerChecked) return;
          const answerIds = Array.from(
            e.target.form.querySelectorAll(
              "input:checked",
            ) as NodeListOf<HTMLInputElement>,
          ).map((input: HTMLInputElement) => input.id);
          saveAnswers(question.id, answerIds);
        }}
      >
        {question.options.map((option) => {
          return (
            <div key={option.id} className="flex flex-row mt-2">
              <OptionElement
                id={option.id.toString()}
                name="answer"
                value={option.text}
                checked={savedAnswerIds.includes(option.id)}
                disabled={isAnswerChecked}
                onChange={() => {}}
              />
              <label
                className={`ml-2 ${
                  isAnswerChecked && option.isCorrect
                    ? "text-success font-bold"
                    : ""
                }`}
                htmlFor={option.id.toString()}
              >
                {option.text}
              </label>
            </div>
          );
        })}
      </form>
      {showCorrectAnswerAfterEachQuestion && (
        <div className="mt-4">
          {!isAnswerChecked ? (
            <Button
              color="primary"
              disabled={savedAnswerIds.length === 0}
              onClick={() => checkAnswer(question.id)}
            >
              Check answer
            </Button>
          ) : (
            <div className="flex flex-col gap-4 items-start">
              <p
                className={
                  isAnswerCorrect
                    ? "text-success font-bold"
                    : "text-error font-bold"
                }
                role="status"
              >
                {isAnswerCorrect ? "Correct" : "Incorrect"}
              </p>
              {!isLastQuestion && (
                <Button color="primary" onClick={onContinue}>
                  Next question
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
