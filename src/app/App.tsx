import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Redirect to static site immediately on mount
    window.location.href = '/public/index.html';
  }, []);

  return null;
}
