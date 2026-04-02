// --- 1. Compact Splash Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const splashVid = document.getElementById('splashVideo');
    if (splashVid) splashVid.play().catch(() => console.log("Autoplay blocked."));
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0'; 
            setTimeout(() => { loader.style.display = 'none'; }, 800); 
        }, 2500); 
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
// Note: Put your Drive/Mega/MediaFire links directly into the "file" property

const myDigitalProducts = [
    { id: "p1", name: "Premium Asset 1", folder: "product 1", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/manager_demo.mp4", screenshots: ["screenshot.png"], size: "150MB", file: "https://drive.google.com/file/d/YOUR_LINK/view" },
    { id: "p2", name: "Premium Asset 2", folder: "product 2", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/assets_demo.mp4", screenshots: ["screenshot.png"], size: "1.2GB", file: "https://mega.nz/file/YOUR_LINK" },
    { id: "p3", name: "Premium Asset 3", folder: "product 3", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "45MB", file: "https://www.mediafire.com/file/YOUR_LINK" },
    { id: "p4", name: "Premium Asset 4", folder: "product 4", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "80MB", file: "https://drive.google.com/file/d/YOUR_LINK/view" },
    { id: "p5", name: "Premium Asset 5", folder: "product 5", icon: "icon.png", thumb: "screenshot.png", demo: "demo videos/demo.mp4", screenshots: [], size: "200MB", file: "https://mega.nz/file/YOUR_LINK" } // 5th item triggers View All
];

const myBetaProducts = [
    { id: "b1", name: "Alpha Engine", folder: "beta/alpha", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: ["shot1.jpg"], size: "12MB", file: "https://drive.google.com/file/d/YOUR_LINK" },
    { id: "b2", name: "Beta Tool 2", folder: "beta/b2", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "5MB", file: "https://mega.nz/file/YOUR_LINK" },
    { id: "b3", name: "Beta Tool 3", folder: "beta/b3", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "18MB", file: "https://www.mediafire.com/file/YOUR_LINK" },
    { id: "b4", name: "Beta Tool 4", folder: "beta/b4", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "2MB", file: "https://drive.google.com/file/d/YOUR_LINK" },
    { id: "b5", name: "Beta Tool 5", folder: "beta/b5", icon: "icon.png", thumb: "thumb.jpg", demo: "demo.mp4", screenshots: [], size: "9MB", file: "https://mega.nz/file/YOUR_LINK" } // 5th item triggers View All
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
        
        // Smart External Link Logic
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

    // Premium Assets Button
    const prodBtn = document.getElementById('viewAllProductsBtn');
    if (myDigitalProducts.length > INITIAL_LIMIT) {
        prodBtn.style.display = 'inline-block';
        prodBtn.onclick = () => {
            productsExpanded = !productsExpanded;
            renderProducts(myDigitalProducts, 'main-products-grid', productsExpanded ? 20 : INITIAL_LIMIT);
            prodBtn.textContent = productsExpanded ? 'Show Less' : 'View All';
        };
    }

    // Beta Vault Button
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

initGrids(); // Initialize grids on load

// Search Logic (hides button when searching)
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
            renderProducts(filtered, 'beta-grid', null); // Show all results up to 20
            betaBtn.style.display = 'none'; 
        }
    });
}

// --- 4. 3D Modals Logic ---
function openProductModal(id) {
    const prod = [...myDigitalProducts, ...myBetaProducts].find(p => p.id === id);
    if(!prod) return;
    
    document.getElementById('prod-modal-title').textContent = prod.name;
    const downloadBtn = document.getElementById('prod-modal-download');
    
    const isExternal = prod.file.startsWith('http');
    downloadBtn.href = isExternal ? prod.file : `${prod.folder}/${prod.file}`;
    if (isExternal) {
        downloadBtn.target = "_blank";
        downloadBtn.removeAttribute("download");
        downloadBtn.onclick = null; // Don't show fake animation for external links
    } else {
        downloadBtn.removeAttribute("target");
        downloadBtn.setAttribute("download", "");
        downloadBtn.onclick = showDownloadAnimation;
    }
    
    const shotsGrid = document.getElementById('prod-modal-screenshots');
    shotsGrid.innerHTML = `<div class="shot-thumb vid-thumb" onclick="setMainMedia('video', '${prod.demo}')">DEMO</div>`;
    if(prod.screenshots && prod.screenshots.length > 0) {
        prod.screenshots.forEach(shot => {
            shotsGrid.innerHTML += `<img src="${prod.folder}/${shot}" class="shot-thumb" onclick="setMainMedia('image', this.src)">`;
        });
    }
    setMainMedia('video', `${prod.demo}`);
    
    const modal = document.getElementById('product-modal');
    const content = modal.querySelector('.modal-content');
    modal.style.display = 'flex';
    setTimeout(() => content.classList.add('active'), 10);
}

function setMainMedia(type, src) {
    const vid = document.getElementById('prod-modal-video'); const img = document.getElementById('prod-modal-img');
    if(type === 'video') {
        img.style.display = 'none'; vid.style.display = 'block'; vid.src = src; vid.play().catch(()=>{});
    } else {
        vid.style.display = 'none'; vid.pause(); img.style.display = 'block'; img.src = src;
    }
}

function closeProductModal() { 
    const modal = document.getElementById('product-modal');
    const content = modal.querySelector('.modal-content');
    content.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; document.getElementById('prod-modal-video').pause(); }, 500); 
}

const postModal = document.getElementById('post-modal');

function openPostModal(id) {
    if(posts[id]) {
        document.getElementById('modal-title').innerHTML = posts[id].title;
        document.getElementById('modal-body').innerHTML = posts[id].content;
        const content = postModal.querySelector('.modal-content');
        postModal.style.display = 'flex';
        setTimeout(() => content.classList.add('active'), 10);
    }
}
function closePostModal() { 
    const content = postModal.querySelector('.modal-content');
    content.classList.remove('active');
    setTimeout(() => { postModal.style.display = 'none'; }, 500);
}
window.addEventListener('click', e => { 
    if(e.target == document.getElementById('product-modal')) closeProductModal(); 
    if(e.target == postModal) closePostModal();
});

// --- 5. Tool Logic ---
const imageInput = document.getElementById('imageInput');
const convertBtn = document.getElementById('convertBtn');
const downloadLink = document.getElementById('downloadLink');
const canvas = document.getElementById('imageCanvas');
let uploadedImage = new Image();

if (imageInput) {
    imageInput.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file && file.type === "image/png") {
            document.getElementById('fileName').textContent = file.name;
            const reader = new FileReader();
            reader.onload = ev => { uploadedImage.onload = () => { convertBtn.style.display = 'inline-block'; downloadLink.style.display = 'none'; }; uploadedImage.src = ev.target.result; }
            reader.readAsDataURL(file);
        }
    });
    convertBtn.addEventListener('click', () => {
        canvas.width = uploadedImage.width; canvas.height = uploadedImage.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(uploadedImage, 0, 0);
        downloadLink.href = canvas.toDataURL("image/jpeg", 0.9);
        downloadLink.download = document.getElementById('fileName').textContent.replace(/\.png$/i, '.jpg');
        convertBtn.style.display = 'none'; downloadLink.style.display = 'inline-block';
    });
}

const runCodeBtn = document.getElementById('runCodeBtn');
if (runCodeBtn) {
    runCodeBtn.addEventListener('click', () => {
        const doc = document.getElementById('codeOutput').contentWindow.document;
        doc.open(); doc.write(document.getElementById('htmlCode').value); doc.close();
    });
}

// --- 6. MULTI-GAME ARCADE HUB ---
const arcadeCanvas = document.getElementById("arcadeCanvas");
const arcadeCtx = arcadeCanvas.getContext("2d");
const gameTitle = document.getElementById("current-game-title");
const gameHints = document.getElementById("game-instructions");

let grid = 15; 
let count = 0;
let snake = { x: 150, y: 150, dx: grid, dy: 0, cells: [], maxCells: 4 };
let apple = { x: 225, y: 225 };
let gameLoopReq; 

const arcadeGames = [
    { name: "Protocol: Snake", hint: "Arrow keys to navigate", start: startSnake, stop: stopSnake },
    { name: "System: Pong (Beta)", hint: "Coming soon... Uploading assets...", start: showComingSoon, stop: () => {} },
    { name: "Terminal: Invaders", hint: "Coming soon... Access denied.", start: showComingSoon, stop: () => {} }
];

let currentGameIndex = 0;
function rand(min, max) { return Math.floor(Math.random() * (max - min)) + min; }

function snakeLoop() {
    gameLoopReq = requestAnimationFrame(snakeLoop); 
    if (++count < 6) return; 
    count = 0;
    
    arcadeCtx.clearRect(0,0,arcadeCanvas.width,arcadeCanvas.height);
    snake.x += snake.dx; snake.y += snake.dy;
    
    if (snake.x < 0) snake.x = arcadeCanvas.width - grid; else if (snake.x >= arcadeCanvas.width) snake.x = 0;
    if (snake.y < 0) snake.y = arcadeCanvas.height - grid; else if (snake.y >= arcadeCanvas.height) snake.y = 0;
    
    snake.cells.unshift({x: snake.x, y: snake.y});
    if (snake.cells.length > snake.maxCells) snake.cells.pop();
    
    arcadeCtx.fillStyle = '#ff3366'; arcadeCtx.fillRect(apple.x, apple.y, grid-1, grid-1);
    arcadeCtx.fillStyle = '#9d00ff'; 
    
    snake.cells.forEach((cell, index) => {
        arcadeCtx.fillRect(cell.x, cell.y, grid-1, grid-1);
        if (cell.x === apple.x && cell.y === apple.y) { snake.maxCells++; apple.x = rand(0, 20) * grid; apple.y = rand(0, 20) * grid; }
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) { snake.x=150; snake.y=150; snake.cells=[]; snake.maxCells=4; snake.dx=grid; snake.dy=0; }
        }
    });
}

function startSnake() { snake = { x: 150, y: 150, dx: grid, dy: 0, cells: [], maxCells: 4 }; gameLoopReq = requestAnimationFrame(snakeLoop); }
function stopSnake() { cancelAnimationFrame(gameLoopReq); }

function showComingSoon() {
    arcadeCtx.clearRect(0,0,arcadeCanvas.width,arcadeCanvas.height);
    arcadeCtx.fillStyle = "#ffffff";
    arcadeCtx.font = "14px monospace";
    arcadeCtx.textAlign = "center";
    arcadeCtx.fillText("LOADING PROTOCOL...", arcadeCanvas.width/2, arcadeCanvas.height/2);
}

// Touch controls for mobile snake playing
let touchStartX = 0;
let touchStartY = 0;

arcadeCanvas.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    e.preventDefault();
}, {passive: false});

arcadeCanvas.addEventListener('touchend', function(e) {
    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
    e.preventDefault();
}, {passive: false});

function handleSwipe(startX, startY, endX, endY) {
    if(currentGameIndex !== 0) return;
    let diffX = endX - startX;
    let diffY = endY - startY;
    
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; } 
        else if (diffX < 0 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; } 
    } else {
        if (diffY > 0 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; } 
        else if (diffY < 0 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; } 
    }
}

document.addEventListener('keydown', e => {
    if([37,38,39,40].includes(e.which) && currentGameIndex === 0) {
        e.preventDefault(); 
        if (e.which === 37 && snake.dx === 0) { snake.dx = -grid; snake.dy = 0; }
        else if (e.which === 38 && snake.dy === 0) { snake.dy = -grid; snake.dx = 0; }
        else if (e.which === 39 && snake.dx === 0) { snake.dx = grid; snake.dy = 0; }
        else if (e.which === 40 && snake.dy === 0) { snake.dy = grid; snake.dx = 0; }
    }
});

function updateGameUI() { gameTitle.textContent = arcadeGames[currentGameIndex].name; gameHints.textContent = arcadeGames[currentGameIndex].hint; }
function nextGame() { arcadeGames[currentGameIndex].stop(); currentGameIndex = (currentGameIndex + 1) % arcadeGames.length; updateGameUI(); arcadeGames[currentGameIndex].start(); }
function prevGame() { arcadeGames[currentGameIndex].stop(); currentGameIndex = (currentGameIndex - 1 + arcadeGames.length) % arcadeGames.length; updateGameUI(); arcadeGames[currentGameIndex].start(); }

updateGameUI();
arcadeGames[currentGameIndex].start();