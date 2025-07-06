import React from 'react';
import Chat from './Chat';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start px-4 py-6">
      <header className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-500">🤖 GenAI</h1>
        <p className="text-gray-300 mt-2 text-lg">Your Smart Assistant — Ask Anything!</p>
      </header>
      <main className="w-full max-w-2xl">
        <Chat />
      </main>
      <footer className="mt-10 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GenAI. Built by Abdul Rahman.
      </footer>
    </div>
  );
};

export default App;
