import React from 'react';

function About() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h3 className="text-xl font-semibold text-zinc-800">About This App</h3>
      <p className="mt-4 text-zinc-700">
        The <strong>Sustainability Tracker</strong> app is designed to help individuals adopt eco-friendly habits by tracking their activities and providing useful tips.
      </p>
      <p className="mt-4 text-zinc-700">
        By using this app, you can:
      </p>
      <ul className="list-disc list-inside mt-2 text-zinc-700">
        <li>Track your daily eco-friendly activities.</li>
        <li>Receive tips on how to live a more sustainable lifestyle.</li>
        <li>Stay motivated to reduce your carbon footprint.</li>
      </ul>
      <p className="mt-4 text-zinc-700">
        Together, we can make a difference and contribute to a healthier planet. Start tracking your activities today and become a part of the movement towards sustainability!
      </p>
    </div>
  );
}

export default About;
