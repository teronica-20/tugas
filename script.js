let isMenuOpen = false;

// Toggle menu burger
document.getElementById("menu-burger").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    if (isMenuOpen) {
        sidebar.style.left = "-250px";
        isMenuOpen = false;
    } else {
        sidebar.style.left = "0";
        isMenuOpen = true;
    }
});

// Menampilkan pop-up petunjuk
function showInstructions() {
    document.getElementById("popup-instructions").style.display = "flex";
}

// Menutup pop-up petunjuk
function closePopup() {
    document.getElementById("popup-instructions").style.display = "none";
}

// Mengganti tema (Mode Terang / Gelap)
function changeTheme() {
    document.body.classList.toggle('dark-theme');
    const themeButton = document.getElementById("theme-button");

    if (document.body.classList.contains('dark-theme')) {
        themeButton.innerText = "Mode Terang";
    } else {
        themeButton.innerText = "Mode Gelap";
    }
}

// Menyimpan leaderboard dan pencapaian
let leaderboard = [
    { name: 'John', score: 100 },
    { name: 'Jane', score: 85 },
    { name: 'Doe', score: 75 },
];

let achievements = {
    level1: false,
    noMistakes: false
};

let timer;
let timeLeft = 60; // Waktu dalam detik

// Memulai timer
function startTimer() {
    if (timer) {
        clearInterval(timer); // Hentikan timer sebelumnya jika ada
    }

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Waktu tersisa: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Waktu habis! Permainan selesai.");
        }
    }, 1000);
}

// Menampilkan leaderboard
function showLeaderboard() {
    let leaderboardList = document.getElementById("leaderboard-list");
    leaderboardList.innerHTML = '';
    leaderboard.forEach(player => {
        let li = document.createElement("li");
        li.innerText = `${player.name} - ${player.score} poin`;
        leaderboardList.appendChild(li);
    });
    document.getElementById("popup-leaderboard").style.display = "flex";
}

// Menampilkan pencapaian
function showAchievements() {
    let achievementsList = document.getElementById("popup-achievements").getElementsByClassName("popup-content")[0];
    achievementsList.innerHTML = '<h2>Pencapaian Anda</h2>';
    for (const achievement in achievements) {
        if (achievements[achievement]) {
            achievementsList.innerHTML += `<p><strong>${achievement}</strong> - Selesai</p>`;
        }
    }
    document.getElementById("popup-achievements").style.display = "flex";
}

// Fungsi menang
function winGame() {
    const winSound = new Audio('path/to/win-sound.mp3');
    winSound.play();
    achievements.level1 = true;
    showAchievements();
    clearInterval(timer); // Hentikan timer jika menang
}

// Fungsi kalah
function loseGame() {
    const loseSound = new Audio('path/to/lose-sound.mp3');
    loseSound.play();
    clearInterval(timer); // Hentikan timer jika kalah
    alert("Game Over!");
}

// Tombol untuk memulai permainan ulang
function resetGame() {
    timeLeft = 60; // Reset timer
    startTimer();  // Mulai timer lagi
    // Reset permainan, leaderboard, dan pencapaian
    leaderboard = [
        { name: 'John', score: 100 },
        { name: 'Jane', score: 85 },
        { name: 'Doe', score: 75 },
    ];
    achievements = {
        level1: false,
        noMistakes: false
    };
    document.getElementById('guess-input').value = '';
    document.getElementById('feedback').innerText = '';
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('restart-btn').style.display = 'none';  // Sembunyikan tombol "Mulai Lagi" setelah di-reset
}

// Menutup pop-up leaderboard
function closeLeaderboard() {
    document.getElementById("popup-leaderboard").style.display = "none";
}

// Menutup pop-up pencapaian
function closeAchievements() {
    document.getElementById("popup-achievements").style.display = "none";
}

// Menutup sidebar (menu burger)
function closeSidebar() {
    document.getElementById("sidebar").style.left = "-250px";
    isMenuOpen = false;
}

// Menambahkan event listener untuk menutup pop-up ketika klik di luar pop-up
window.addEventListener("click", function(event) {
    // Menutup pop-up leaderboard dan pencapaian jika klik di luar area pop-up
    if (event.target === document.getElementById("popup-leaderboard")) {
        closeLeaderboard();
    }
    if (event.target === document.getElementById("popup-achievements")) {
        closeAchievements();
    }

    // Menutup sidebar jika klik di luar area sidebar
    if (event.target !== document.getElementById("menu-burger") && isMenuOpen) {
        closeSidebar();
    }

    // Menutup pop-up petunjuk jika klik di luar area pop-up petunjuk
    if (event.target === document.getElementById("popup-instructions")) {
        closePopup();
    }
});
