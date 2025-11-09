export const Media = ({
  src,
  alt,
  type,
  className = "",
}: {
  src: string;
  alt?: string;
  type: "image" | "video";
  className?: string;
}) => {
  if (type === "image")
    return <img src={src} alt={alt || "media"} className={className} />;
  else
    return (
      <video
        src={src}
        controls
        className={className}
        aria-label={alt || "media"}
      />
    );
};
