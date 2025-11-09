export const getServerAddress = () => {
  const protocol = window.location.protocol;
  const host = import.meta.env.VITE_SERVER_HOST || window.location.hostname;
  const port =
    import.meta.env.VITE_SERVER_PORT ||
    window.location.port ||
    (protocol === "https:" ? "443" : "80");
  return `${protocol}//${host}:${port}`;
};

export const getApiUrl = () => {
  return getServerAddress() + (import.meta.env.VITE_API_ENDPOINT || "/graphql");
};

export const getUploadUrl = (path: string) => {
  return getServerAddress() + path;
};
