import React from "react";
import { Checkbox, Radio } from "react-daisyui";
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
}) => {
  const question = useFragment(QUESTION_FRAGMENT, props.question);
  const { saveAnswers, savedAnswerIds } = props;

  const OptionElement = question.allowMultipleAnswers ? Checkbox : Radio;

  return (
    <div className="p-4">
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
        onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
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
                onChange={() => {}}
              />
              <label className="ml-2" htmlFor={option.id.toString()}>
                {option.text}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};
