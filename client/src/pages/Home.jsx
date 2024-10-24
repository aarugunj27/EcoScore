import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link from react-router-dom
import "animate.css"; // Import Animate.css

function Home() {
  return (
    <div>
      <section id="hero" className="bg-zinc-200 dark:bg-zinc-700 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-white mb-4 animate__animated animate__fadeIn">
            Welcome to Eco Score the App
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Discover your carbon footprint and learn how to reduce your
            environmental impact through personalized tips and progress
            tracking.
          </p>
          <Link
            to="/tracker"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-zinc-300 dark:bg-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 animate__animated animate__fadeIn">
            About Eco Score
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Eco Score is designed to empower individuals to understand and
            improve their environmental impact. By calculating your carbon
            footprint and providing actionable tips, we aim to foster a
            community focused on sustainability.
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 animate__animated animate__fadeIn animate__delay-2s">
            Our app combines cutting-edge technology with user-friendly features
            to help you track your progress. Whether you're a sustainability
            novice or an eco-warrior, Eco Score provides the tools you need to
            make a difference.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-zinc-200 dark:bg-zinc-700 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 animate__animated animate__fadeIn">
            App Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/tracker"
              className="bg-white dark:bg-zinc-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s"
            >
              <h3 className="font-semibold text-zinc-800 dark:text-white mb-2 animate__animated animate__bounce">
                Eco Score Calculator
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Easily calculate your carbon footprint and discover personalized
                strategies to improve your environmental impact.
              </p>
              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300">
                <li>Simple input interface for tracking daily activities</li>
                <li>Visual representations of your score over time</li>
                <li>Understand the impact of your choices</li>
              </ul>
            </Link>
            <Link
              to="/tracker"
              className="bg-white dark:bg-zinc-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s"
            >
              <h3 className="font-semibold text-zinc-800 dark:text-white mb-2 animate__animated animate__bounce">
                Personalized Tips
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Receive tailored suggestions based on your lifestyle and
                preferences to help you make sustainable choices.
              </p>
              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300">
                <li>Weekly updates with new eco-friendly tips</li>
                <li>Customizable goals to track your progress</li>
                <li>Access to community challenges and rewards</li>
              </ul>
            </Link>
            <Link
              to="/tracker"
              className="bg-white dark:bg-zinc-600 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s"
            >
              <h3 className="font-semibold text-zinc-800 dark:text-white mb-2 animate__animated animate__bounce">
                Progress Tracking
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                Monitor your eco-friendly actions and visualize your impact over
                time with insightful graphs and statistics.
              </p>
              <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-300">
                <li>Monthly progress reports</li>
                <li>Track your actions and see their cumulative effect</li>
                <li>Stay motivated with goal-setting features</li>
              </ul>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="bg-zinc-300 dark:bg-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 animate__animated animate__fadeIn">
            Join Us in Making a Difference
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Are you ready to take the first step towards a more sustainable
            lifestyle? Join the Eco Score community today and start tracking
            your carbon footprint!
          </p>
          <Link
            to="/tracker"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-500 transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      <footer className="bg-zinc-800 dark:bg-zinc-900 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-white">
            © 2024 Eco Score the App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
