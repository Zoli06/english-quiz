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

  return (
    <div className='p-4'>
      {question.media &&
        (question.media.type === 'image' ? (
          <img
            src={config.apiUrl + question.media.url}
            alt={question.media.title}
            className='w-full'
          />
        ) : (
          <video
            src={config.apiUrl + question.media.url}
            className='w-full'
            controls
          />
        ))}
      <h1 className='text-2xl'>{question.text}</h1>
      <div className='flex flex-col'>
        {question.options.map((option) => {
          return (
            <div key={option.id} className='flex flex-row mt-2'>
              <OptionElement
                id={option.id}
                name='answer'
                value={option.text}
                checked={savedAnswers.includes(option.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    saveAnswers(question.id, [...savedAnswers, option.id]);
                  } else {
                    saveAnswers(
                      question.id,
                      savedAnswers.filter((id) => id !== option.id)
                    );
                  }
                }}
              />
              <label className='ml-2' htmlFor={option.id}>
                {option.text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
