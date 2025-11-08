import { Button, FileInput, Input } from "react-daisyui";
import config from "@/config.ts";
import { useRef } from "react";
import { MediatypeEnumType } from "@/gql/graphql.ts";

export const QuestionEditorMedia = ({
  originalMedia,
  mediaFile,
  setMediaFile,
  mediaId,
  setMediaId,
  mediaTitle,
  setMediaTitle,
}: {
  originalMedia: {
    path: string;
    type: MediatypeEnumType;
    title?: string | null;
  } | null;
  mediaFile: File | null;
  setMediaFile: (file: File | null) => void;
  mediaId: string | null;
  setMediaId: (id: string | null) => void;
  mediaTitle: string;
  setMediaTitle: (title: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
              setMediaFile(e.target.files[0]);
            }
          }}
          ref={fileInputRef}
        />
        <Button
          onClick={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
            setMediaFile(null);
            setMediaId(null);
          }}
          className="ml-4"
          color="error"
          type="button"
        >
          Delete
        </Button>
      </div>
      {/* Media preview */}
      {mediaFile ? (
        <div className="mt-4">
          {mediaFile.type.startsWith("image") ? (
            <img
              src={URL.createObjectURL(mediaFile)}
              alt="Preview for question media"
              className="w-full"
            />
          ) : (
            <video
              src={URL.createObjectURL(mediaFile)}
              className="w-full"
              controls
            />
          )}
        </div>
      ) : (
        originalMedia &&
        mediaId && (
          <div className="mt-4">
            {originalMedia?.type.startsWith("image") ? (
              <img
                src={config.apiUrl + originalMedia.path}
                alt="Question media"
                className="w-full"
              />
            ) : (
              <video
                src={config.apiUrl + originalMedia.path}
                className="w-full"
                controls
              />
            )}
          </div>
        )
      )}
      {/* Media title */}
      {(mediaFile || mediaId) && (
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
    </>
  );
};
