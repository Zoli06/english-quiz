import React, { useState } from 'react';
import { Button, Input } from 'react-daisyui';

export const QuestionEditor = ({
  question,
  saveQuestion,
  deleteQuestion,
}: {
  question: {
    id: string;
    text: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    allowMultipleAnswers: boolean;
  };
  saveQuestion: (question: {
    id: string;
    text: string;
    options: { id: string; text: string; isCorrect: boolean }[];
    allowMultipleAnswers: boolean;
  }) => void;
  deleteQuestion: (questionId: string) => void;
  }) => {
  const [id, setId] = useState(question.id);
  const [text, setText] = useState(question.text);
  const [options, setOptions] = useState(question.options);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(
    question.allowMultipleAnswers
  );

  // Reset state when question changes
  if (id !== question.id) {
    setId(question.id);
    setText(question.text);
    setOptions(question.options);
    setAllowMultipleAnswers(question.allowMultipleAnswers);
  }

  return (
    <div className='p-4'>
      <Input
        type='text'
        placeholder='Question'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='flex flex-col'>
        {options.map((option, index) => {
          return (
            <div key={option.id} className='flex flex-row'>
              <Input
                type='text'
                placeholder='Option'
                value={option.text}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].text = e.target.value;
                  setOptions(newOptions);
                }}
              />
              <Input
                type='checkbox'
                checked={option.isCorrect}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index].isCorrect = e.target.checked;
                  setOptions(newOptions);
                }}
              />
              <Button
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.splice(index, 1);
                  setOptions(newOptions);
                }}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          setOptions([...options, { id: '', text: '', isCorrect: false }]);
        }}
      >
        Add Option
      </Button>
      <Input
        type='checkbox'
        checked={allowMultipleAnswers}
        onChange={(e) => setAllowMultipleAnswers(e.target.checked)}
      />
      <Button
        onClick={() =>
          saveQuestion({
            id: question.id,
            text,
            options,
            allowMultipleAnswers,
          })
        }
      >
        Save
      </Button>
      <Button onClick={() => deleteQuestion(question.id)}>Delete</Button>
    </div>
  );
};
