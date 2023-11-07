import React from 'react';
import { Button } from 'react-daisyui';

export const QuestionSelector = ({
  questions,
  activeQuestionId,
  setActiveQuestionId,
}: {
  questions: {
    id: string;
  }[];
  activeQuestionId: string;
  setActiveQuestionId: (activeQuestionId: string) => void;
}) => {
  const activeQuestionIndex = questions.findIndex(
    (element) => element.id === activeQuestionId
  );
  return (
    <div>
      <Button
        color='primary'
        disabled={activeQuestionIndex === 0}
        onClick={() =>
          setActiveQuestionId(questions[activeQuestionIndex - 1].id)
        }
      >
        Previous
      </Button>
      {questions.map((question, index) => {
        return (
          <Button
            key={question.id}
            color={
              questions[index].id === activeQuestionId ? 'primary' : 'neutral'
            }
            onClick={() => setActiveQuestionId(questions[index].id)}
          >
            {index + 1}
          </Button>
        );
      })}
      <Button
        color='primary'
        disabled={activeQuestionIndex === questions.length - 1}
        onClick={() =>
          setActiveQuestionId(questions[activeQuestionIndex + 1].id)
        }
      >
        Next
      </Button>
    </div>
  );
};
