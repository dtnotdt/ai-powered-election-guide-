export function getEnv(key) {
  if (typeof window !== 'undefined' && window._env_ && window._env_[key]) {
    return window._env_[key];
  }
  if (typeof process !== 'undefined' && process.env) {
    if (process.env[key]) return process.env[key];
    if (process.env[`NEXT_PUBLIC_${key.replace('VITE_', '')}`]) {
      return process.env[`NEXT_PUBLIC_${key.replace('VITE_', '')}`];
    }
  }
  return '';
}
