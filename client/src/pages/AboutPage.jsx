import React from 'react';
import '../assets/css/style.css'

//import About from '../components/About';

function AboutPage() {
  return (
    <div class="body">
      <section className="bg-zinc-100 dark:bg-zinc-800 relative">
        <h1>Nice Curves</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt atque
          consequatur sed dolor rerum quidem fugiat enim harum quam asperiores
          ex saepe ipsum autem, numquam mollitia nemo! Ab, accusamus excepturi.
        </p>
      </section>
      <section className="bg-zinc-200 dark:bg-zinc-700 relative">
        <h1>Nice Curves</h1>
        <p>
          Omnis ab, illo facere neque expedita doloribus vel voluptatum
          accusamus aliquid ex deleniti, tenetur blanditiis reprehenderit.
          Minima omnis distinctio iure architecto culpa. Eius eligendi dolor,
          ducimus minus est aliquid harum.
        </p>
        <div class="custom-shape-divider-top-1728751592">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
