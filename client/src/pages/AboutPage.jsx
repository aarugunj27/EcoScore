import React from "react";
import "../assets/css/style.css";

//import About from '../components/About';

function AboutPage() {
  return (
    <div class="max-w-2xl mx-auto p-6 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-4">
        About Eco Score the App
      </h2>
      <p class="text-zinc-700 dark:text-zinc-300 mb-4">
        <strong>Eco Score the App</strong> is a user-friendly application
        designed to empower individuals in their journey toward sustainability.
        With a focus on reducing carbon footprints, the app provides a
        straightforward scoring system that rates eco-friendly behaviors on a
        scale from 1 to 10.
      </p>
      <p class="text-zinc-700 dark:text-zinc-300 mb-4">
        Whether you're a sustainability novice or a seasoned eco-warrior, Eco
        Score the App offers personalized insights and actionable tips to help
        you make informed decisions about your daily habits. Users can track
        their environmental impact, discover new ways to reduce waste, and
        ultimately contribute to a healthier planet.
      </p>
      <p class="text-zinc-700 dark:text-zinc-300">
        Our mission is to raise awareness about the importance of sustainable
        living and to inspire positive change through engaging, easy-to-use
        technology. Join us in making a difference—one score at a time!
      </p>
    </div>
  );
}

export default AboutPage;
