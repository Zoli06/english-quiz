import React from "react";
import {Checkbox, Radio} from "react-daisyui";
import config from "@/config.ts";

export const Question = ({
                             question,
                             saveAnswers,
                             savedAnswerIds,
                         }: {
    question: {
        id: string;
        text: string;
        options: { id: string; text: string }[];
        allowMultipleAnswers: boolean;
        media?: {
            id: string;
            url: string;
            title?: string | null;
            type: "image" | "video";
        } | null;
    };
    saveAnswers: (questionId: string, answerIds: string[]) => void;
    savedAnswerIds: string[];
}) => {
    const OptionElement = question.allowMultipleAnswers ? Checkbox : Radio;
    const mediaUrl = config.apiUrl + question.media?.url;
    const mediaClassName = "w-full max-h-96 object-contain";

    return (
        <div className="p-4">
            {question.media &&
                (question.media.type === "image" ? (
                    <img
                        src={mediaUrl}
                        alt={question.media.title || "Question Media"}
                        className={mediaClassName}
                    />
                ) : (
                    <video src={mediaUrl} className={mediaClassName} controls/>
                ))}
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
                                onChange={() => {
                                }}
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
