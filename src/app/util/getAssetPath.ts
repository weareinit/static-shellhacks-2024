export const getAssetPath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/shellhacks-2024/${cleanPath}`;
};
