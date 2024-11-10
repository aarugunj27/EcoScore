import React from "react";

function Contact() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-zinc-100 dark:bg-zinc-900 p-8">
      {/* Left Side - Text */}
      <div className="md:w-1/2 p-8">
        <h1 className="text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 leading-tight">
          Have a question?
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
          We’re here to help! Fill out the form or reach us via email. Our
          Customer Care Team is available to help you get the best experience
          whether you have an issue about your order or are looking for helpful
          tips.
        </p>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
          Everyone gets a personalized response, so please allow 24 hours during
          business hours for a reply. Our business hours are M-F from 9am to 5pm
          PT.
        </p>
        <ul className="text-lg text-zinc-800 dark:text-zinc-300 space-y-3">
          <li className="flex items-center space-x-2">
            <span className="font-medium">Email:</span>
            <span>hello@domain.com</span>
          </li>
        </ul>
      </div>

      {/* Right Side - Form */}
      <form className="md:w-1/2 bg-zinc-200 dark:bg-zinc-800 p-8 rounded-lg shadow-lg space-y-6">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <input
              type="text"
              id="first-name"
              className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
              placeholder="First Name"
            />
          </div>
          <div className="w-1/2">
            <input
              type="text"
              id="last-name"
              className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
            placeholder="Your email"
            required
          />
        </div>

        <div>
          <textarea
            id="message"
            rows="4"
            className="w-full px-3 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
            placeholder="Your message"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-600 dark:bg-zinc-500 text-zinc-100 dark:text-zinc-900 px-4 py-2 rounded-lg hover:bg-zinc-500 dark:hover:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
