export const getAssetPath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  const basePath = process.env.NODE_ENV === "production" ? "/shell-24" : "";
  return `${basePath}/${cleanPath}`;
};
