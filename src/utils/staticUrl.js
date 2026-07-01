const BASE = import.meta.env.VITE_STATIC_URL || '';

/**
 * Safely joins VITE_STATIC_URL with a stored file path.
 * Handles all combinations of trailing/leading slashes so the
 * caller never needs to worry about how the path was stored.
 *
 * buildStaticUrl('uploads/avatars/a.jpg') → 'http://host/uploads/avatars/a.jpg'
 * buildStaticUrl('/uploads/articles/b.jpg') → 'http://host/uploads/articles/b.jpg'
 */
export const buildStaticUrl = (filePath) => {
  if (!filePath) return '';
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const path = filePath.startsWith('/') ? filePath : `/${filePath}`;
  return `${base}${path}`;
};
