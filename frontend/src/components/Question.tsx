import React from 'react';
import { Radio } from 'react-daisyui';

export const Question = ({
  question,
  submitAnswer,
}: {
  question: {
    questionId: string;
    question: string;
    answers: { answerId: string; answer: string }[];
  };
  submitAnswer: (answerId: number) => void;
}) => {
  return (
    <div>
      <div className='p-4'>
        <h1 className='text-2xl'>{question.question}</h1>
        <div className='flex flex-col'>
          {question.answers.map((answer) => {
            return (
              <div key={answer.answerId} className='flex flex-row'>
                <Radio
                  id={answer.answerId}
                  name='answer'
                  value={answer.answerId}
                  onChange={(e) => submitAnswer(Number(e.target.value))}
                />
                <label className='ml-2' htmlFor={answer.answerId}>{answer.answer}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
