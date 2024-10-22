import React, { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="bg-zinc-800 text-white px-4 py-2 rounded-lg dark:bg-zinc-100 dark:text-zinc-900 transition"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
}

export default DarkModeToggle;
