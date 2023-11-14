import React from 'react';
import { Radio, Checkbox } from 'react-daisyui';
import config from '../config';

export const Question = ({
  question,
  saveAnswers,
  savedAnswers,
}: {
  question: {
    id: string;
    text: string;
    options: { id: string; text: string }[];
    allowMultipleAnswers: boolean;
    media?: {
      id: string;
      url: string;
      title: string;
      type: 'image' | 'video';
    };
  };
  saveAnswers: (questionId: string, answerIds: string[]) => void;
  savedAnswers: string[];
}) => {
  const OptionElement = question.allowMultipleAnswers ? Checkbox : Radio;
  const mediaUrl = config.apiUrl + question.media?.url;
  const mediaClassName = 'w-full max-h-96 object-contain';

  return (
    <div className='p-4'>
      {question.media &&
        (question.media.type === 'image' ? (
          <img
            src={mediaUrl}
            alt={question.media.title}
            className={mediaClassName}
          />
        ) : (
          <video
            src={mediaUrl}
            className={mediaClassName}
            controls
          />
        ))}
      <h1 className='text-2xl'>{question.text}</h1>
      <form className='flex flex-col'
        onChange={(e: React.ChangeEvent<HTMLFormElement>) => {
          const answerIds = Array.from(
            e.target.form.querySelectorAll('input:checked')
            // @ts-ignore
            ).map((input) => parseInt(input.id));
          // Quick dirty fix
          // @ts-ignore
          saveAnswers(question.id, answerIds);
        }
        }
      >
        {question.options.map((option) => {
          return (
            <div key={option.id} className='flex flex-row mt-2'>
              <OptionElement
                id={option.id}
                name='answer'
                value={option.text}
                checked={savedAnswers.includes(option.id)}
                onChange={() => {}}
              />
              <label className='ml-2' htmlFor={option.id}>
                {option.text}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};
