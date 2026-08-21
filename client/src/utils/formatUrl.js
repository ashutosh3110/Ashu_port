/**
 * Formats external URLs to ensure they have an absolute protocol (http:// or https://).
 * Prevents mobile and desktop browsers from treating external domain links as relative paths
 * within the app (which causes 404 errors or failed navigation on mobile devices).
 */
export const formatUrl = (url) => {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
};
