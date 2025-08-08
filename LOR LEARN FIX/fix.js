// const stops = [0, 1110, 2190, 3220]; // Change these based on your content layout


// Define your scroll stops (in pixels) and pause durations (ms)
const scrollPlan = [
  { y: 0, pause: 2000 },
  { y: 1110, pause: 8000 },
  { y: 2190, pause: 22000 },
  { y: 3220, pause: 8000 },
  { y: 4000, pause: 2500 }
];

// Set how long the scroll animation should take (in milliseconds)
const scrollDuration = 1000;

// Smooth scroll function with easing
const smoothScrollTo = (targetY) => {
  return new Promise((resolve) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / scrollDuration, 1);
      const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress); // easeInOut
      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
};

// Auto-scroll with custom pause durations
(async () => {
  for (const stop of scrollPlan) {
    await smoothScrollTo(stop.y);
    await new Promise(r => setTimeout(r, stop.pause));
  }
})();