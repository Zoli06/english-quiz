import config from "@/config";
import {useMutation} from "@apollo/client/react";
import {useRef, useState} from "react";
import {Button, Checkbox, FileInput, Form, Input, Table} from "react-daisyui";
import {graphql} from "@/gql";
import {QuestionEditorFragmentFragment} from "@/gql/graphql.ts";
import {useEditQuestion} from "@/features/admin/questions/hooks/useEditQuestion.ts";
import {SetOptional} from "type-fest";

const QUESTION_EDITOR_FRAGMENT = graphql(`
    fragment QuestionEditorFragment on Question {
        id
        text
        media {
            id
            url
            title
            type
        }
        options {
            id
            text
            isCorrect
        }
        allowMultipleAnswers
    }
`);

const CREATE_MEDIA_MUTATION = graphql(`
    mutation CreateMedia($file: Upload!, $title: String!) {
        createMedia(file: $file, title: $title) {
            id
            url
            title
            type
        }
    }
`);

const EDIT_MEDIA_MUTATION = graphql(`
    mutation EditMedia($id: ID!, $file: Upload!, $title: String!) {
        editMedia(id: $id, file: $file, title: $title) {
            id
            url
            title
            type
        }
    }
`);

const DELETE_MEDIA_MUTATION = graphql(`
    mutation DeleteMedia($id: ID!) {
        deleteMedia(id: $id)
    }
`);

export const QuestionEditor = ({
                                   question,
                                   close,
                                   refetchQuestions,
                               }: {
    question: QuestionEditorFragmentFragment
    close: () => void;
    refetchQuestions: () => void;
}) => {
    const [createMedia] = useMutation(CREATE_MEDIA_MUTATION, {
        onCompleted: refetchQuestions,
    });
    const [editMedia] = useMutation(EDIT_MEDIA_MUTATION, {
        onCompleted: refetchQuestions,
    });
    const [deleteMedia] = useMutation(DELETE_MEDIA_MUTATION, {
        onCompleted: refetchQuestions,
    });

    const [id, setId] = useState(question.id);
    const [text, setText] = useState(question.text);
    const [options, setOptions] = useState<SetOptional<typeof question.options[number] , "id">[]>(question.options);
    const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(
        question.allowMultipleAnswers,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<File | null>(null);
    const [removeMedia, setRemoveMedia] = useState(false);
    const [mediaTitle, setMediaTitle] = useState(question.media?.title || "");

    const { editQuestion, loading, error } = useEditQuestion(id);

    // Reset state when question changes
    if (id !== question.id) {
        setId(question.id);
        setText(question.text);
        setOptions(question.options);
        setAllowMultipleAnswers(question.allowMultipleAnswers);
        setMedia(null);
        setRemoveMedia(false);
        setMediaTitle(question.media?.title || "");
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // TODO: Don't save media immediately, wait until question is saved
    return (
        <Form
            className="p-4"
        >
            <h3 className="text-lg">Question</h3>
            <Input
                type="text"
                placeholder="Question"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full"
            />
            <h3 className="text-lg mt-4">Image or video (optional)</h3>
            <p className="text-sm">
                Allowed file extensions: png, jpg, jpeg, gif, mp4, avi, mov, wmv, flv,
                mkv
            </p>
            <div className="flex items-center">
                <FileInput
                    placeholder="Image or video"
                    className="w-full"
                    bordered
                    // Take a look at backend/.env
                    accept=".png, .jpg, .jpeg, .gif, .mp4, .avi, .mov, .wmv, .flv, .mkv"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setMedia(e.target.files[0]);
                            setRemoveMedia(false);
                        }
                    }}
                    ref={fileInputRef}
                />
                <Button
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                        setMedia(null);
                        setRemoveMedia(true);
                    }}
                    className="ml-4"
                    color="error"
                    type="button"
                >
                    Delete
                </Button>
            </div>
            {/* Media preview */}
            {!removeMedia &&
                (media ? (
                    <div className="mt-4">
                        {media.type.startsWith("image") ? (
                            <img
                                src={URL.createObjectURL(media)}
                                alt="Preview for question media"
                                className="w-full"
                            />
                        ) : (
                            <video
                                src={URL.createObjectURL(media)}
                                className="w-full"
                                controls
                            />
                        )}
                    </div>
                ) : (
                    question.media && (
                        <div className="mt-4">
                            {question.media.type.startsWith("image") ? (
                                <img
                                    src={config.apiUrl + question.media.url}
                                    alt="Question media"
                                    className="w-full"
                                />
                            ) : (
                                <video
                                    src={config.apiUrl + question.media.url}
                                    className="w-full"
                                    controls
                                />
                            )}
                        </div>
                    )
                ))}
            {/* Media title */}
            {!removeMedia && (question.media || media) && (
                <>
                    <h3 className="text-lg mt-4">Media title (optional)</h3>
                    <Input
                        type="text"
                        placeholder="Media title"
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                        className="w-full mt-4"
                    />
                </>
            )}
            {/* Options */}
            <h3 className="text-lg mt-4">Options</h3>
            <Form.Label title="Allow multiple answers">
                <Checkbox
                    checked={allowMultipleAnswers}
                    onChange={(e) => {
                        if (!e.target.checked) {
                            let newOptions = [...options];
                            newOptions = newOptions.map((option) => {
                                return {...option, isCorrect: false};
                            });
                            if (newOptions.length > 0) {
                                newOptions[0] = {
                                    ...newOptions[0],
                                    isCorrect: true
                                };
                            }
                            setOptions(newOptions);
                        }
                        setAllowMultipleAnswers(e.target.checked);
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
                            <Table.Row key={option.id || index}>
                                <Checkbox
                                    checked={option.isCorrect}
                                    onChange={() => {
                                        let newOptions = [...options];
                                        if (allowMultipleAnswers) {
                                            newOptions[index].isCorrect =
                                                !newOptions[index].isCorrect;
                                        } else {
                                            newOptions = newOptions.map((option) => {
                                                return {...option, isCorrect: false};
                                            });
                                            console.log(newOptions)
                                            newOptions[index] = {
                                                ...newOptions[index],
                                                isCorrect: true
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
                                                return {...opt, text: e.target.value};
                                            }
                                            return opt;
                                        });
                                        setOptions(newOptions);
                                    }}
                                    required
                                />
                                <Button
                                    onClick={() => {
                                        const newOptions = [...options];
                                        newOptions.splice(index, 1);
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
                    setOptions([...options, {text: "", isCorrect: false}]);
                }}
                className="mt-4"
                type="button"
            >
                Add Option
            </Button>
            <div className="mt-4 flex flex-row gap-4">
                <Button type="submit" color="primary" className="grow" onClick={
                    async (e) => {
                        e.preventDefault();
                        let mediaId = question.media?.id || null;
                        if (removeMedia && question.media) {
                            await deleteMedia({variables: {id: question.media?.id}});
                            mediaId = null;
                        } else if (media) {
                            if (question.media) {
                                await editMedia({
                                    variables: {
                                        id: question.media.id,
                                        file: media,
                                        title: mediaTitle,
                                    },
                                });
                            } else {
                                const {data} = await createMedia({
                                    variables: {file: media, title: mediaTitle},
                                });
                                mediaId = data?.createMedia?.id || null;
                            }
                        }

                        await editQuestion({
                            question: {
                                text,
                                allowMultipleAnswers,
                                mediaId,
                            },
                            options,
                        });

                        close();
                    }
                }>
                    Save
                </Button>
                <Button onClick={close} className="grow" type="button">
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

QuestionEditor.fragments = {
    question: QUESTION_EDITOR_FRAGMENT,
};
