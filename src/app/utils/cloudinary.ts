export const optimizeCloudinaryUrl = (url: string) => {
  return url.replace("upload", "upload/q_auto,f_auto");
};
