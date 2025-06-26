const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const startBtn = document.getElementById("startBtn");
const gameArea = document.getElementById("gameArea");
const playerTurn = document.getElementById("playerTurn");

const spinBtn = document.getElementById("spinBtn");
const wheel = document.getElementById("wheel");
const promptArea = document.getElementById("promptArea");
const promptText = document.getElementById("promptText");
const nextBtn = document.getElementById("nextBtn");

let players = [];
let currentPlayerIndex = 0;

// Improved, family-friendly prompts
const truthPrompts = [
  "What’s your biggest fear?",
  "Have you ever had a crush on a teacher?",
  "What's a secret no one knows?",
  "What’s your guilty pleasure?",
  "If you could change one thing about yourself, what would it be?",
  "What is your favorite memory?",
  "What is something you wish you could do?",
  "What is your most embarrassing moment?",
  "What is your favorite movie?",
  "What is your favorite food?",
  "What’s the most embarrassing thing that’s ever happened to you",
  "Have you ever had a crush on a teacher",
  "What’s your weirdest habit",
  "What’s the biggest lie you’ve ever told",
  "Have you ever stalked someone on social media?",
"What do you find most attractive in someone?",
"Have you ever flirted with someone just for fun?",
"Describe your favorite spot to be kissed.",
"What’s one thing about me you could never get tired of?",
"What’s something I do that makes you feel completely loved?",
"What's your secret fantasy you've never told anyone?",
];

const darePrompts = [
  "Do 10 jumping jacks.",
  "Speak in a funny voice for the next round.",
  "Do your best celebrity impression.",
  "Sing a random song out loud.",
  "Act like a baby for 30 seconds.",
  "Whine for 60 seconds.",
  "Do your best animal impression.",
  "Dance for 30 seconds.",
  "Tell a joke.",
  "Spin around 5 times and try to walk straight.",
  "Hold my hand and tell me what your heart feels when you look at me.",
"Give me a kiss on the forehead, then tell me why you chose that spot.",
"Wrap your arms around me and don’t let go for 30 seconds.",
"Play with my hair for one minute without saying a word.",
"Look into my eyes and say something you’ve been wanting to tell me.",
"Tell me one thing I do that makes you feel special.",
"I dare you to say my name in your most seductive voice.",
"Give me a slow, warm hug… and whisper your favorite thing about holding me",

];

// Validate player names and start game
startBtn.addEventListener("click", () => {
  const name1 = player1Input.value.trim() || "Player 1";
  const name2 = player2Input.value.trim() || "Player 2";
  if (!player1Input.value.trim() || !player2Input.value.trim()) {
    alert("Please enter both player names!");
    return;
  }
  players = [name1, name2];

  document.getElementById("playerSetup").classList.add("hide");
  gameArea.classList.remove("hide");
  updateTurnDisplay();
});

// Spin the wheel and show a prompt
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  wheel.style.transform = 'rotate(0deg)';
  const rotation = 720 + Math.floor(Math.random() * 360);
  wheel.style.transition = "transform 5s cubic-bezier(.17,.67,.83,.67)";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    // Truth: 0-179 deg, Dare: 180-359 deg
    const finalAngle = rotation % 360;
    const isTruth = finalAngle < 270;
    const result = isTruth ? "Truth" : "Dare";
    const prompt = isTruth
      ? truthPrompts[Math.floor(Math.random() * truthPrompts.length)]
      : darePrompts[Math.floor(Math.random() * darePrompts.length)];

    promptText.innerHTML = `<strong>${result}:</strong> ${prompt}`;
    promptArea.classList.remove("hide");

    // Optional: Change wheel color for Truth/Dare
    // wheel.style.background = isTruth ? "#4caf50" : "#f44336";
  }, 8000);
});

// Next player's turn
nextBtn.addEventListener("click", () => {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateTurnDisplay();
  promptArea.classList.add("hide");
  spinBtn.disabled = false;
  // wheel.style.background = ""; // Reset wheel color if you use color change
});

// Update turn display
function updateTurnDisplay() {
  playerTurn.textContent = `🎯 ${players[currentPlayerIndex]}'s Turn`;
}