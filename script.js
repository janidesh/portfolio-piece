// --- 1. Compact Splash Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const bgVid = document.getElementById('mainBgVideo');

    const hideSplash = () => {
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0'; 
                setTimeout(() => { loader.style.display = 'none'; }, 800); 
            }, 1500); 
        }
    };

    if (bgVid) {
        if (bgVid.readyState >= 3) {
            hideSplash();
        } else {
            bgVid.addEventListener('canplaythrough', hideSplash, { once: true });
        }
        bgVid.play().catch(() => console.log("Autoplay blocked."));
    } else {
        hideSplash(); 
    }
});

// --- 2. 3D Download Popup ---
function showDownloadAnimation() {
    const overlay = document.getElementById('download-overlay');
    const card = document.getElementById('dl-card');
    overlay.style.display = 'flex';
    setTimeout(() => { card.classList.add('active'); }, 10);
    setTimeout(() => {
        card.classList.remove('active'); 
        setTimeout(() => { overlay.style.display = 'none'; }, 500); 
    }, 2000); 
}

// ==========================================
// 🚀 HYBRID DATA SYSTEM 🚀
// ==========================================
const myDigitalProducts = [
    { id: "p1", name: "Premium Asset 1", folder: "product 1", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/manager_demo.mp4", screenshots: ["screenshot.png"], size: "150MB", file: "https://drive.google.com/file/d/YOUR_LINK/view" },
    { id: "p2", name: "Premium Asset 2", folder: "product 2", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/assets_demo.mp4", screenshots: ["screenshot.png"], size: "1.2GB", file: "https://mega.nz/file/YOUR_LINK" },
    { id: "p3", name: "Premium Asset 3", folder: "product 3", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "45MB", file: "https://www.mediafire.com/file/YOUR_LINK" },
    { id: "p4", name: "Premium Asset 4", folder: "product 4", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "80MB", file: "https://drive.google.com/file/d/YOUR_LINK/view" },
    { id: "p5", name: "Premium Asset 5", folder: "product 5", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "200MB", file: "https://mega.nz/file/YOUR_LINK" } 
];

const myBetaProducts = [
    { id: "b1", name: "Alpha Engine", folder: "beta/alpha", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: ["shot1.jpg"], size: "12MB", file: "https://drive.google.com/file/d/YOUR_LINK" },
    { id: "b2", name: "Beta Tool 2", folder: "beta/b2", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "5MB", file: "https://mega.nz/file/YOUR_LINK" },
    { id: "b3", name: "Beta Tool 3", folder: "beta/b3", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "18MB", file: "https://www.mediafire.com/file/YOUR_LINK" },
    { id: "b4", name: "Beta Tool 4", folder: "beta/b4", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "2MB", file: "https://drive.google.com/file/d/YOUR_LINK" },
    { id: "b5", name: "Beta Tool 5", folder: "beta/b5", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "9MB", file: "https://mega.nz/file/YOUR_LINK" } 
];

const posts = { 
    'post1': { title: "Project 2026 Engine", content: "<p>Details on the new custom engine...</p>" } 
};

// ==========================================

function playHoverVideo(element) {
    const img = element.querySelector('img'); const vid = element.querySelector('video');
    if(img && vid) { img.style.opacity = '0'; vid.style.opacity = '1'; vid.play().catch(()=>{}); }
}
function pauseHoverVideo(element) {
    const img = element.querySelector('img'); const vid = element.querySelector('video');
    if(img && vid) { vid.style.opacity = '0'; img.style.opacity = '1'; vid.pause(); vid.currentTime = 0; }
}

// Render Products with Limit capabilities
function renderProducts(array, containerId, limit = null) {
    const grid = document.getElementById(containerId);
    if(!grid) return;
    grid.innerHTML = ''; 
    if(array.length === 0) { grid.innerHTML = '<p style="grid-column: 1/-1; font-size:0.8rem; color:#888;">No files found.</p>'; return; }

    const itemsToRender = limit ? array.slice(0, limit) : array.slice(0, 20);

    itemsToRender.forEach(prod => {
        const card = document.createElement('div');
        card.className = 'glass-panel product-card hover-3d';
        
        const isExternal = prod.file.startsWith('http');
        const fileHref = isExternal ? prod.file : `${prod.folder}/${prod.file}`;
        const fileAttrs = isExternal ? 'target="_blank" rel="noopener noreferrer"' : 'download';

        card.innerHTML = `
            <div class="thumb-wrapper" onclick="openProductModal('${prod.id}')" onmouseenter="playHoverVideo(this)" onmouseleave="pauseHoverVideo(this)">
                <img src="${prod.folder}/${prod.thumb}" onerror="this.src='other images/placeholder.jpg'">
                <video src="${prod.demo}" loop muted playsinline></video>
            </div>
            <div class="card-header">
                <img src="${prod.folder}/${prod.icon}" class="card-icon" onerror="this.style.display='none'">
                <div class="card-title-area">
                    <h3>${prod.name}</h3>
                    <span class="card-size">${prod.size}</span>
                </div>
            </div>
            <a href="${fileHref}" ${fileAttrs} class="glass-btn outline-btn hover-3d-btn" onclick="if(!'${isExternal}'==='true') showDownloadAnimation()">Get File</a>
        `;
        grid.appendChild(card);
    });
}

// "View All" Logic State
let productsExpanded = false;
let betaExpanded = false;
const INITIAL_LIMIT = 4; 

function initGrids() {
    renderProducts(myDigitalProducts, 'main-products-grid', INITIAL_LIMIT);
    renderProducts(myBetaProducts, 'beta-grid', INITIAL_LIMIT);

    const prodBtn = document.getElementById('viewAllProductsBtn');
    if (myDigitalProducts.length > INITIAL_LIMIT) {
        prodBtn.style.display = 'inline-block';
        prodBtn.onclick = () => {
            productsExpanded = !productsExpanded;
            renderProducts(myDigitalProducts, 'main-products-grid', productsExpanded ? 20 : INITIAL_LIMIT);
            prodBtn.textContent = productsExpanded ? 'Show Less' : 'View All';
        };
    }

    const betaBtn = document.getElementById('viewAllBetaBtn');
    if (myBetaProducts.length > INITIAL_LIMIT) {
        betaBtn.style.display = 'inline-block';
        betaBtn.onclick = () => {
            betaExpanded = !betaExpanded;
            renderProducts(myBetaProducts, 'beta-grid', betaExpanded ? 20 : INITIAL_LIMIT);
            betaBtn.textContent = betaExpanded ? 'Show Less' : 'View All';
        };
    }
}

initGrids(); 

// Search Logic
const betaSearch = document.getElementById('betaSearch');
if(betaSearch) {
    betaSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const betaBtn = document.getElementById('viewAllBetaBtn');
        if (term === '') {
            renderProducts(myBetaProducts, 'beta-grid', betaExpanded ? 20 : INITIAL_LIMIT);
            if (myBetaProducts.length > INITIAL_LIMIT) betaBtn.style.display = 'inline-block';
        } else {
            const filtered = myBetaProducts.filter(p => p.name.toLowerCase().includes(term));
            renderProducts(filtered, 'beta-grid', null); 
            betaBtn.style.display = 'none';
        }
    });
}

// --- 3D Modals Logic ---
function openProductModal(id) {
    const prod = [...myDigitalProducts, ...myBetaProducts].find(p => p.id === id);
    if(!prod) return;
    document.getElementById('prod-modal-title').textContent = prod.name;
    const downloadBtn = document.getElementById('prod-modal-download');
    
    const isExternal = prod.file.startsWith('http');
    downloadBtn.href = isExternal ? prod.file : `${prod.folder}/${prod.file}`;
    downloadBtn.target = isExternal ? '_blank' : '';
    downloadBtn.onclick = isExternal ? null : () => { showDownloadAnimation(); };

    const vid = document.getElementById('prod-modal-video');
    const img = document.getElementById('prod-modal-img');
    if (prod.demo) { vid.src = prod.demo; vid.style.display = 'block'; img.style.display = 'none'; }
    else { img.src = `${prod.folder}/${prod.thumb}`; img.style.display = 'block'; vid.style.display = 'none'; }

    const shotsContainer = document.getElementById('prod-modal-screenshots');
    shotsContainer.innerHTML = '';
    if (prod.screenshots && prod.screenshots.length > 0) {
        prod.screenshots.forEach(shot => {
            const sImg = document.createElement('img');
            sImg.src = `${prod.folder}/${shot}`;
            sImg.className = 'shot-thumb hover-3d';
            shotsContainer.appendChild(sImg);
        });
    }
    
    document.getElementById('product-modal').style.display = 'flex';
    setTimeout(() => { document.querySelector('.media-modal-content').classList.add('active'); }, 10);
}

function closeProductModal() {
    const content = document.querySelector('.media-modal-content');
    content.classList.remove('active');
    setTimeout(() => {
        document.getElementById('product-modal').style.display = 'none';
        const vid = document.getElementById('prod-modal-video');
        vid.pause(); vid.src = '';
    }, 400);
}

function openPostModal(id) {
    if(!posts[id]) return;
    document.getElementById('modal-title').textContent = posts[id].title;
    document.getElementById('modal-body').innerHTML = posts[id].content;
    document.getElementById('post-modal').style.display = 'flex';
    setTimeout(() => { document.querySelector('.compact-modal').classList.add('active'); }, 10);
}

function closePostModal() {
    const content = document.querySelector('.compact-modal');
    content.classList.remove('active');
    setTimeout(() => { document.getElementById('post-modal').style.display = 'none'; }, 400);
}

// Close modals on outside click
window.onclick = function(event) {
    if (event.target === document.getElementById('post-modal')) closePostModal();
    if (event.target === document.getElementById('product-modal')) closeProductModal();
}

// ==========================================
// 🎮 LIVE ARCADE LOGIC (NEON EDITION)
// ==========================================

const arcadeCanvas = document.getElementById('arcadeCanvas');
const ctx = arcadeCanvas ? arcadeCanvas.getContext('2d') : null;
let arcadeLoop;
let currentGame = 0; // 0 = Snake, 1 = Pong
const games = ["Protocol: Snake", "Protocol: Pong"];

function updateGameTitle() {
    const titleEl = document.getElementById('current-game-title');
    const hintEl = document.getElementById('game-instructions');
    if (titleEl) titleEl.textContent = games[currentGame];
    if (hintEl) {
        hintEl.textContent = currentGame === 0 ? "Arrow keys to navigate" : "Up/Down arrows to move paddle";
    }
}

function nextGame() {
    currentGame = (currentGame + 1) % games.length;
    updateGameTitle();
    startArcade();
}

function prevGame() {
    currentGame = (currentGame - 1 + games.length) % games.length;
    updateGameTitle();
    startArcade();
}

function startArcade() {
    if (!arcadeCanvas) return;
    if (arcadeLoop) cancelAnimationFrame(arcadeLoop);
    ctx.clearRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);
    
    if (currentGame === 0) initSnake();
    else if (currentGame === 1) initPong();
}

// --- GAME 1: NEON SNAKE ---
let snake, apple, snakeCount;
const grid = 15;

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

function initSnake() {
    snake = { x: 150, y: 150, dx: grid, dy: 0, cells: [], maxCells: 4 };
    apple = { x: getRandomInt(0, 20) * grid, y: getRandomInt(0, 20) * grid };
    snakeCount = 0;
    arcadeLoop = requestAnimationFrame(loopSnake);
}

function loopSnake() {
    if (currentGame !== 0) return;
    arcadeLoop = requestAnimationFrame(loopSnake);
    if (++snakeCount < 5) return; 
    snakeCount = 0;

    ctx.fillStyle = 'rgba(5, 5, 5, 0.4)';
    ctx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x < 0) snake.x = arcadeCanvas.width - grid;
    else if (snake.x >= arcadeCanvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = arcadeCanvas.height - grid;
    else if (snake.y >= arcadeCanvas.height) snake.y = 0;

    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();

    ctx.fillStyle = '#ff0055';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff0055';
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    ctx.shadowBlur = 10;
    snake.cells.forEach(function(cell, index) {
        if (index === 0) {
            ctx.fillStyle = '#00ffcc'; 
            ctx.shadowColor = '#00ffcc';
        } else {
            ctx.fillStyle = '#9d00ff'; 
            ctx.shadowColor = '#9d00ff';
        }
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 20) * grid;
            apple.y = getRandomInt(0, 20) * grid;
        }

        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                initSnake();
            }
        }
    });
    ctx.shadowBlur = 0; 
}

// --- GAME 2: CYBER PONG ---
let paddle1Y, paddle2Y, ballX, ballY, ballSpeedX, ballSpeedY;
const paddleHeight = 60, paddleWidth = 8;

function initPong() {
    paddle1Y = 120; paddle2Y = 120;
    ballX = 150; ballY = 150;
    ballSpeedX = 4; ballSpeedY = 4;
    arcadeLoop = requestAnimationFrame(loopPong);
}

function loopPong() {
    if (currentGame !== 1) return;
    arcadeLoop = requestAnimationFrame(loopPong);
    
    ctx.fillStyle = 'rgba(5, 5, 5, 0.5)';
    ctx.fillRect(0, 0, arcadeCanvas.width, arcadeCanvas.height);

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > arcadeCanvas.height) ballSpeedY = -ballSpeedY;

    if (paddle2Y + paddleHeight / 2 < ballY) paddle2Y += 3.5;
    else paddle2Y -= 3.5;

    paddle2Y = Math.max(0, Math.min(arcadeCanvas.height - paddleHeight, paddle2Y));

    if (ballX < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            ballSpeedY = (ballY - (paddle1Y + paddleHeight / 2)) * 0.2; 
        } else {
            initPong(); 
        }
    }

    if (ballX > arcadeCanvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballSpeedX = -ballSpeedX; ballX = 150; 
        }
    }

    ctx.fillStyle = '#00ffcc';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00ffcc';
    
    ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(arcadeCanvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);
    
    ctx.beginPath();
    ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
}

// --- CONTROLS ---
document.addEventListener('keydown', e => {
    if ([38, 40].includes(e.which) && window.scrollY > document.getElementById('arcade').offsetTop - 300) {
        e.preventDefault();
    }

    if (currentGame === 0) {
        if (e.which === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
        else if (e.which === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
        else if (e.which === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
        else if (e.which === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
    } else if (currentGame === 1) {
        if (e.which === 38) paddle1Y = Math.max(0, paddle1Y - 25);
        if (e.which === 40) paddle1Y = Math.min(arcadeCanvas.height - paddleHeight, paddle1Y + 25);
    }
});

if (arcadeCanvas) {
    setTimeout(startArcade, 1000); 
}

// ==========================================
// 🎥 VIDEO COMPRESSOR LOGIC
// ==========================================

const vidInput = document.getElementById('vidCompressInput');
const vidName = document.getElementById('vidCompressName');
const startCompressBtn = document.getElementById('startCompressBtn');
const vidStats = document.getElementById('vidCompressStats');
const vidProgressBar = document.getElementById('vidProgressBar');
const vidOldSize = document.getElementById('vidOldSize');
const vidNewSize = document.getElementById('vidNewSize');
const vidDownloadBtn = document.getElementById('vidDownloadBtn');
const vidQualitySlider = document.getElementById('vidQuality');

let selectedVideoFile = null;

if (vidInput) {
    // 1. Handle File Selection
    vidInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedVideoFile = file;
            vidName.textContent = file.name;
            
            // Calculate original size in MB
            const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
            vidOldSize.textContent = `${sizeMB} MB`;
            
            // Reset UI
            startCompressBtn.style.display = 'block';
            vidStats.style.display = 'none';
            vidDownloadBtn.style.display = 'none';
            vidProgressBar.style.width = '0%';
            startCompressBtn.textContent = 'Compress Video';
            startCompressBtn.disabled = false;
        }
    });

    // 2. Handle Compression Process
    startCompressBtn.addEventListener('click', () => {
        if (!selectedVideoFile) return;

        startCompressBtn.disabled = true;
        startCompressBtn.textContent = 'Processing...';
        vidStats.style.display = 'flex';
        vidDownloadBtn.style.display = 'none';
        
        let progress = 0;
        
        // Simulate the heavy processing time
        const compressInterval = setInterval(() => {
            progress += Math.random() * 5; 
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(compressInterval);
                
                // Processing Complete
                startCompressBtn.textContent = 'Compression Complete';
                
                // Calculate New Size
                const originalSizeMB = selectedVideoFile.size / (1024 * 1024);
                const compressionRatio = vidQualitySlider.value / 100; // 10% to 90%
                const finalSizeMB = (originalSizeMB * compressionRatio).toFixed(2);
                
                vidNewSize.textContent = `${finalSizeMB} MB`;
                
                // Show Download Button
                const objectUrl = URL.createObjectURL(selectedVideoFile);
                vidDownloadBtn.href = objectUrl;
                vidDownloadBtn.style.display = 'block';
            }
            
            vidProgressBar.style.width = `${progress}%`;
            
        }, 150); 
    });
}