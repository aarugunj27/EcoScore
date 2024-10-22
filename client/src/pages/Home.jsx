import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-zinc-100 dark:bg-zinc-800 py-20 relative">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
            Welcome to the Sustainability Tracker
          </h1>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            Track your sustainability efforts and make a positive impact on the planet.
          </p>
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-zinc-200 dark:bg-zinc-700 py-20 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Tips for Sustainability</h2>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            Learn simple steps you can take to reduce your carbon footprint.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-zinc-100 dark:bg-zinc-800 py-20 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">About Us</h2>
          <p className="mt-4 text-zinc-700 dark:text-zinc-300">
            We are dedicated to promoting sustainability and helping you track your efforts.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
