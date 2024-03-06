let barWidth = 11;
let barHeight = 120; // Height for all bars
let barCount = 7; // Number of bars
let spacing = barWidth * 0.6; // Spacing between bars
let startX; // Starting X position to center the bars
let secondToLastLength = 145; // Length of the second to last bar
let thirdToLastLength = 151; // Length of the third to last bar
let animateSpeed = 2; // Speed of animation

// Animation state
let currentLengths = [];
let growing = true; // Shared direction of animation for both animated bars
let isPausing = false; // Shared pausing state for both animated bars
let pauseStart = 0; // When we started pausing for both animated bars

let bauhausBoldFont;
let bauhausItalicFont;

function preload() {
  bauhausBoldFont = loadFont('helvetica-bold.ttf');
  bauhausItalicFont = loadFont('helvetica-bold.ttf');
}

function setup() {
  createCanvas(600, 600);
  background(230, 226, 215);

  let totalWidth = barCount * barWidth + (barCount - 1) * spacing;
  startX = (width - totalWidth) / 2;

  // Initialize animation states
  for (let i = 0; i < barCount; i++) {
    currentLengths[i] = barHeight; // Set static length for all bars
    if (i === barCount - 2 || i === barCount - 3) {
      currentLengths[i] = 0; // Starting length for animated bars
    }
  }

  textFont(bauhausBoldFont);
}

function draw() {
  background(230, 226, 215); // Clear the canvas on each frame
  
  // Handle animation
  if (!isPausing) {
    if (growing) {
      // Grow
      currentLengths[barCount - 3] += animateSpeed;
      currentLengths[barCount - 2] += animateSpeed;
      
      if (currentLengths[barCount - 3] >= thirdToLastLength || currentLengths[barCount - 2] >= secondToLastLength) {
        isPausing = true;
        pauseStart = millis();
      }
    } else {
      // Shrink
      currentLengths[barCount - 3] -= animateSpeed;
      currentLengths[barCount - 2] -= animateSpeed;

      currentLengths[barCount - 3] = max(0, currentLengths[barCount - 3]);
      currentLengths[barCount - 2] = max(0, currentLengths[barCount - 2]);

      if (currentLengths[barCount - 3] === 0 && currentLengths[barCount - 2] === 0) {
        growing = true;
      }
    }
  } else if (millis() - pauseStart >= 1000) {
    isPausing = false;
    growing = !growing;
  }

  // Draw all bars
  for (let i = 0; i < barCount; i++) {
    let x = startX + i * (barWidth + spacing);
    let y = height / 2 - barHeight / 2;
    fill(0); // Set fill color to black for all bars
    
    if (i === barCount - 3) {
      // Draw the third to last bar growing downwards from the top
      rect(x, y + barHeight - currentLengths[i], barWidth, currentLengths[i]);
    } else {
      // Draw the second to last bar and others normally
      rect(x, y, barWidth, currentLengths[i]);
    }
  }

  // Text rendering
  push(); // Save current drawing style settings and transformations
  textSize(12);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  translate(width / 1.79, height / 2.3);
  rotate(HALF_PI);
  text("Muriel", 0, 0);
  translate(80, 16); // Move for the second piece of text
  text("Cooper", 0, 0);
  pop(); // Restore original state
}
