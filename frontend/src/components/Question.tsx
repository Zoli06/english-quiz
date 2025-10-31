import React from "react";
import {Checkbox, Radio} from "react-daisyui";
import config from "../config";

export const Question = ({
                             question,
                             saveAnswers,
                             savedAnswerIds,
                         }: {
    question: {
        id: number;
        text: string;
        options: { id: number; text: string }[];
        allowMultipleAnswers: boolean;
        media?: {
            id: number;
            url: string;
            title: string;
            type: "image" | "video";
        };
    };
    saveAnswers: (questionId: number, answerIds: number[]) => void;
    savedAnswerIds: number[];
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
                        alt={question.media.title}
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
                    ).map((input: HTMLInputElement) => parseInt(input.id));
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
