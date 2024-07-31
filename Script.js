// script.js
const canvas = document.getElementById('scratchCanvas');
const ctx = canvas.getContext('2d');
const hiddenContent = document.getElementById('hiddenContent');
let isDrawing = false;

canvas.width = 300;
canvas.height = 200;

// Crear la capa de "rasca"
ctx.fillStyle = 'gray'; // Puede ser una textura o imagen
ctx.fillRect(0, 0, canvas.width, canvas.height);

canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', scratch);

function scratch(event) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();

    checkScratchCompletion();
}

function checkScratchCompletion() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let visiblePixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
            visiblePixels++;
        }
    }
    const visiblePercentage = visiblePixels / (canvas.width * canvas.height);
    if (visiblePercentage > 0.5) { // 50% visible
        hiddenContent.style.display = 'block';
    }
}
