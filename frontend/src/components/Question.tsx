import React from 'react';
import { Radio, Checkbox } from 'react-daisyui';

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
  };
  saveAnswers: (questionId: string, answerIds: string[]) => void;
  savedAnswers: string[];
}) => {
  const OptionElement = question.allowMultipleAnswers ? Checkbox : Radio;

  return (
    <div>
      <div className='p-4'>
        <h1 className='text-2xl'>{question.text}</h1>
        <div className='flex flex-col'>
          {question.options.map((option) => {
            return (
              <div key={option.id} className='flex flex-row'>
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
    </div>
  );
};
