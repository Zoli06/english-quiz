import React from 'react';
import { Button } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';

export const QuestionSelector = ({
  questions,
  activeQuestionId,
  setActiveQuestionId,
  submitQuiz,
}: {
  questions: {
    id: string;
  }[];
  activeQuestionId: string;
  setActiveQuestionId: (activeQuestionId: string) => void;
  submitQuiz: () => void;
}) => {
  const navigate = useNavigate();

  const activeQuestionIndex = questions.findIndex(
    (element) => element.id === activeQuestionId
  );
  return (
    <div className='flex flex-row justify-between w-full'>
      <Button
        color='error'
        onClick={() => {
          if (window.confirm('Are you sure you want to cancel?')) {
            window.onbeforeunload = null;
            navigate('/');
          }
        }}
      >
        Cancel
      </Button>
      <div className='flex flex-row gap-4'>
        <Button
          color='primary'
          disabled={activeQuestionIndex === 0}
          onClick={() =>
            setActiveQuestionId(questions[activeQuestionIndex - 1].id)
          }
        >
          Previous
        </Button>
        {/* {questions.map((question, index) => {
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
      })} */}
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
      <Button
        color={
          activeQuestionIndex === questions.length - 1 ? 'primary' : 'neutral'
        }
        onClick={() => {
          if (window.confirm('Are you sure you want to submit?')) {
            window.onbeforeunload = null;
            submitQuiz();
          }
        }}
      >
        Submit
      </Button>
    </div>
  );
};
