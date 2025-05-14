export const getAssetPath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  // No need for basePath with custom domain
  return `/${cleanPath}`;
};
