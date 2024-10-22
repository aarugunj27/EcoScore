import React from 'react';

const tips = [
  "Switch to reusable water bottles.",
  "Reduce energy consumption by unplugging electronics.",
  "Walk or bike to school instead of driving.",
  "Use cloth bags instead of plastic.",
  "Recycle paper, plastic, and glass.",
  "Conserve water by taking shorter showers.",
  "Eat more plant-based meals.",
  "Buy second-hand clothes instead of fast fashion."
];

function Tips() {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="tips">
      <h2>Eco-Friendly Tip of the Day</h2>
      <p>{randomTip}</p>
    </div>
  );
}

export default Tips;
