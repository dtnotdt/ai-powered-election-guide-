export function getEnv(key) {
  if (typeof window !== 'undefined' && window._env_?.[key]) {
    return window._env_[key];
  }

  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key];
    
    const nextKey = `NEXT_PUBLIC_${key.replace('VITE_', '')}`;
    if (process.env[nextKey]) {
      return process.env[nextKey];
    }
  }

  return '';
}
