async function submitScore(username, score) {
  await fetch('http://localhost:3000/submit-score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, score })
  });
}

async function getLeaderboard() {
  const response = await fetch('http://localhost:3000/leaderboard');
  const leaderboard = await response.json();
  displayLeaderboard(leaderboard);
}

function displayLeaderboard(leaderboard) {
  const leaderboardElement = document.getElementById('leaderboard');
  leaderboardElement.innerHTML = leaderboard.map(entry => `<li>${entry.username}: ${entry.score}</li>`).join('');
}

// Call getLeaderboard() to fetch and display the leaderboard when needed
getLeaderboard();