let count = 0;
let clickValue = 1;
const countDisplay = document.getElementById('count');
const cookie = document.getElementById('cookie');
const resetButton = document.getElementById('reset');

const upgradesData = [
    { name: 'Small Boost', desc: '+1 click per click', baseCost: 10, effect: () => clickValue += 1 },
    { name: 'Power Tap', desc: '+5 clicks per click', baseCost: 50, effect: () => clickValue += 5 },
    { name: 'Auto-Clicker', desc: 'Auto-clicks every 2s', baseCost: 250, effect: () => startAutoClick(2000, 1) },
    { name: 'Double Up', desc: 'Double click power', baseCost: 500, effect: () => clickValue *= 2 },
    { name: 'Mega Tap', desc: '+10 clicks per click', baseCost: 1000, effect: () => clickValue += 10 },
    { name: 'Fast Clicker', desc: 'Auto-clicks every 1s', baseCost: 2000, effect: () => startAutoClick(1000, 1) },
    { name: 'Triple Power', desc: 'Triple click power', baseCost: 5000, effect: () => clickValue *= 3 },
    { name: 'Get a real message from a real femboy', desc: 'Donate at least $5 (this will be split among the creators of the project)', baseCost: 100000, effect: () => window.open('https://account.venmo.com/u/jacobjoubert', "_blank") },
    { name: 'Massive Tap', desc: '+50 clicks per click', baseCost: 10000, effect: () => clickValue += 50 },
    { name: 'Rapid Clicker', desc: 'Auto-clicks twice per second', baseCost: 25000, effect: () => startAutoClick(500, 2) },
    { name: 'Quad Power', desc: 'Quadruple click power', baseCost: 50000, effect: () => clickValue *= 4 },
];

const upgradesElement = document.getElementById('upgrades');

upgradesData.forEach((upgrade, index) => {
    upgrade.currentCost = upgrade.baseCost;
    const div = document.createElement('div');
    div.className = 'upgrade';
    div.innerHTML = `
    <img src="https://i.imgur.com/${['TRvPcpc','MIiWCue','o00wovo','a2qBqw4','ImDjhvc','incdlsW','TLYMsVY','H6PFlvS','q10Nba7','oSa78Nq','g31vRo4'][index]}.png" alt="upgrade">
    <div class="upgrade-info">
        <div class="upgrade-name">${upgrade.name}</div>
        <div class="upgrade-desc">${upgrade.desc} (Cost: <span id="cost-${index}">${upgrade.currentCost}</span>)</div>
    </div>
    `;
    div.onclick = () => buyUpgrade(index);
    div.id = `upgrade-${index}`;
    div.style.display = index === 0 ? 'flex' : 'none'; // Only show the first upgrade initially
    upgradesElement.appendChild(div);
});

cookie.addEventListener('click', () => {
    count += clickValue;
    updateDisplay();
});

resetButton.addEventListener('click', () => {
    count = 0;
    clickValue = 1;
    upgradesData.forEach((upg, idx) => {
    upg.currentCost = upg.baseCost;
    document.getElementById(`cost-${idx}`).textContent = upg.currentCost;
    document.getElementById(`upgrade-${idx}`).style.display = idx === 0 ? 'flex' : 'none'; // Reset to show only the first upgrade
    });
    updateDisplay();
});

function updateDisplay() {
    countDisplay.textContent = `Clicks: ${count}`;
}

function buyUpgrade(index) {
    const upgrade = upgradesData[index];
    if (count >= upgrade.currentCost) {
    count -= upgrade.currentCost;
    upgrade.effect();
    upgrade.currentCost = Math.ceil(upgrade.currentCost * 1.5);
    document.getElementById(`cost-${index}`).textContent = upgrade.currentCost;
    updateDisplay();
    if (index + 1 < upgradesData.length) {
        document.getElementById(`upgrade-${index + 1}`).style.display = 'flex'; // Unlock the next upgrade
    }
    } else {
    alert('Not enough clicks!');
    }
}

function startAutoClick(interval, amount) {
    setInterval(() => {
    count += amount;
    updateDisplay();
    }, interval);
}

const audio = document.getElementById('audio');
const songList = document.getElementById('songList');

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function unpauseAudio() {
    if (audio.paused) {
    audio.play();
    }
}

function toggleSongList() {
    if (songList.style.display === 'none') {
    songList.style.display = 'flex';
    } else {
    songList.style.display = 'none';
    }
}

function changeSong(src) {
    const audioSource = document.getElementById('audioSource');
    audioSource.src = src;
    audio.load();
    audio.play();
}

function addSong() {
    const songName = document.getElementById('songName').value;
    const songUrl = document.getElementById('songUrl').value;
    if (songName && songUrl) {
    const button = document.createElement('button');
    button.textContent = songName;
    button.onclick = () => changeSong(songUrl);
    songList.appendChild(button);
    document.getElementById('songName').value = '';
    document.getElementById('songUrl').value = '';
    } else {
    alert('Please enter both song name and URL');
    }
}