let count = 0;
let clickValue = 1;
const countDisplay = document.getElementById('count');
const cookie = document.getElementById('cookie');
const resetButton = document.getElementById('reset');

const upgradesData = [
    { name: 'small femboy', desc: '+1 click per click', baseCost: 10, effect: () => clickValue += 1 },
    { name: 'big femboy', desc: '+5 clicks per click', baseCost: 50, effect: () => clickValue += 5 },
    { name: 'Peasant femboy', desc: 'Auto-clicks every 2s', baseCost: 250, effect: () => startAutoClick(2000, 1) },
    { name: 'Double femboys', desc: 'Double click power', baseCost: 500, effect: () => clickValue *= 2 },
    { name: '10 femboys', desc: '+10 clicks per click', baseCost: 1000, effect: () => clickValue += 10 },
    { name: 'Fast femboy', desc: 'Auto-clicks every 1s', baseCost: 2000, effect: () => startAutoClick(1000, 1) },
    { name: 'Triple femboys', desc: 'Triple click power', baseCost: 5000, effect: () => clickValue *= 3 },
    { name: 'Get a real message from a real femboy', desc: 'Donate at least $5 (this will be split among the creators of the project)', baseCost: 100000, effect: () => window.open('https://account.venmo.com/u/jacobjoubert', "_blank") },
    { name: 'Massive femboy', desc: '+50 clicks per click', baseCost: 10000, effect: () => clickValue += 50 },
    { name: 'fast peasant femboy', desc: 'Auto-clicks twice per second', baseCost: 25000, effect: () => startAutoClick(500, 2) },
    { name: 'group of femboys', desc: 'Quadruple click power', baseCost: 50000, effect: () => clickValue *= 4 },
];

const upgradesElement = document.getElementById('upgrades');

upgradesData.forEach((upgrade, index) => {
    upgrade.currentCost = upgrade.baseCost;
    const div = document.createElement('div');
    div.className = 'upgrade';
    div.innerHTML = `
    <img src="https://i.imgur.com/${['TRvPcpc','MIiWCue','o00wovo','a2qBqw4','ImDjhvc','incdlsW','TLYMsVY','g31vRo4','H6PFlvS','q10Nba7','oSa78Nq'][index]}.png" alt="upgrade">
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

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

// Load the score from the cookie when the page is loaded
window.onload = () => {
    const savedCount = getCookie("count");
    if (savedCount) {
        count = parseInt(savedCount);
        updateDisplay();
    }
};

function updateDisplay() {
    countDisplay.textContent = `Clicks: ${count}`;
    setCookie("count", count, 365);
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

function changeSong(src) {
    const audioSource = document.getElementById('audioSource');
    audioSource.src = src;
    audio.load();
    audio.play();
}
