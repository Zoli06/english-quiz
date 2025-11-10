import { Button, Checkbox, Form, Input, Radio, Table } from "react-daisyui";
import { v4 as uuidv4 } from "uuid";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export const QuestionEditorOptions = ({
  options,
  setOptions,
  allowMultipleAnswers,
  setAllowMultipleAnswers,
}: {
  options: Option[];
  setOptions: (options: Option[]) => void;
  allowMultipleAnswers: boolean;
  setAllowMultipleAnswers: (allow: boolean) => void;
}) => {
  const CheckboxOrRadio = allowMultipleAnswers ? Checkbox : Radio;

  return (
    <>
      <h3 className="text-lg mt-4">Options</h3>
      <Form.Label title="Multiple choice" className="flex gap-4 w-fit">
        <Checkbox
          checked={allowMultipleAnswers}
          onChange={(e) => {
            let newOptions = [...options];
            if (!e.target.checked) {
              // If switching to single answer, ensure only one option is marked correct
              newOptions = newOptions.map((option) => {
                return { ...option, isCorrect: false };
              });
              if (newOptions.length > 0) {
                newOptions[0] = {
                  ...newOptions[0],
                  isCorrect: true,
                };
              }
            }
            setAllowMultipleAnswers(e.target.checked);
            setOptions(newOptions);
          }}
        />
      </Form.Label>
      <Table>
        <Table.Head>
          <span>Is correct?</span>
          <span>Text</span>
          <span>Delete</span>
        </Table.Head>
        <Table.Body>
          {options.map((option, index) => {
            return (
              <Table.Row key={option.id}>
                <CheckboxOrRadio
                  checked={option.isCorrect}
                  onChange={() => {
                    let newOptions: Option[];
                    if (allowMultipleAnswers) {
                      newOptions = options.map((opt, i) => {
                        if (i === index) {
                          return {
                            ...opt,
                            isCorrect: !opt.isCorrect,
                          };
                        }
                        return opt;
                      });
                    } else {
                      newOptions = options.map((option) => {
                        return {
                          ...option,
                          isCorrect: false,
                        };
                      });
                      newOptions[index] = {
                        ...newOptions[index],
                        isCorrect: true,
                      };
                    }
                    setOptions(newOptions);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Option"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = options.map((opt, i) => {
                      if (i === index) {
                        return {
                          ...opt,
                          text: e.target.value,
                        };
                      }
                      return opt;
                    });
                    setOptions(newOptions);
                  }}
                  required
                />
                <Button
                  onClick={() => {
                    const newOptions = options.filter((_, i) => i !== index);
                    setOptions(newOptions);
                  }}
                  type="button"
                >
                  Delete
                </Button>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Button
        onClick={() => {
          const newOption = {
            // Temporary UUID for client-side identification
            // For example React needs a key when rendering lists
            id: uuidv4(),
            text: "",
            isCorrect: false,
          };

          setOptions([...options, newOption]);
        }}
        className="mt-4"
        type="button"
      >
        Add Option
      </Button>
    </>
  );
};
