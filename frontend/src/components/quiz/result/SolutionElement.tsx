import { FragmentType, graphql, useFragment } from "@/gql";
import { Media } from "@/components/reusable/media/Media.tsx";
import { getUploadUrl } from "@/config.ts";

const SOLUTION_ELEMENT_FRAGMENT = graphql(`
  fragment SolutionElement on Question {
    id
    text
    options {
      id
      text
      isCorrect
    }
    media {
      id
      path
      type
    }
  }
`);
export const SolutionElement = (props: {
  question: FragmentType<typeof SOLUTION_ELEMENT_FRAGMENT>;
  selectedOptionIds: string[];
}) => {
  const question = useFragment(SOLUTION_ELEMENT_FRAGMENT, props.question);

  return (
    <div className="border border-gray-700 rounded-box p-4 flex flex-row gap-4 justify-between">
      <div>
        <h3 className="font-semibold mb-2">{question.text}</h3>
        <ul>
          {question.options.map((option) => {
            const isSelected = props.selectedOptionIds.includes(option.id);
            const isCorrect = option.isCorrect;
            let className = "";
            if (isSelected && isCorrect) {
              className = "text-green-500 underline italic";
            } else if (isSelected && !isCorrect) {
              className = "text-red-500 underline italic";
            } else if (!isSelected && isCorrect) {
              className = "text-green-500";
            }
            return (
              <li key={option.id} className={className}>
                {option.text}
              </li>
            );
          })}
        </ul>
      </div>
      {question.media ? (
        <Media
          src={getUploadUrl(question.media.path)}
          type={question.media.type.startsWith("image") ? "image" : "video"}
          className="w-32 h-32 object-cover rounded-box"
        />
      ) : null}
    </div>
  );
};
