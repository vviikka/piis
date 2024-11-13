// const svg = document.getElementById('drawing-area');
// const shapeSelect = document.querySelectorAll('input[name="shape"]');

// let isDrawing = false;
// let startX, startY;

// function getSelectedShape() {
//     for (const shape of shapeSelect) {
//         if (shape.checked) {
//             return shape.value; 
//         }
//     }
//     return null; 
// }

// svg.addEventListener('mousedown', (event) => {
//     isDrawing = true;
//     startX = event.offsetX;
//     startY = event.offsetY;
// });

// svg.addEventListener('mousemove', (event) => {
//     if (!isDrawing) return;

//     const currentX = event.offsetX;
//     const currentY = event.offsetY;

//     const shape = getSelectedShape();

//     if (shape === 'circle') {
//         const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
//         const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
//         circle.setAttribute('cx', startX);
//         circle.setAttribute('cy', startY);
//         circle.setAttribute('r', radius);
//         circle.setAttribute('fill', 'rgba(0, 150, 255, 0.5)');
//         svg.appendChild(circle);
//     } else if (shape === 'rectangle') {
//         const width = currentX - startX;
//         const height = currentY - startY;
//         const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
//         rect.setAttribute('x', width < 0 ? currentX : startX);
//         rect.setAttribute('y', height < 0 ? currentY : startY);
//         rect.setAttribute('width', Math.abs(width));
//         rect.setAttribute('height', Math.abs(height));
//         rect.setAttribute('fill', 'rgba(255, 150, 0, 0.5)');
//         svg.appendChild(rect);
//     } 
// });

// svg.addEventListener('mouseup', () => {
//     isDrawing = false;
// });

// svg.addEventListener('mouseleave', () => {
//     isDrawing = false;
// });

const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');
const shapeSelect = document.querySelectorAll('input[name="shape"]');

let isDrawing = false;
let startX, startY;

function getSelectedShape() {
    for (const shape of shapeSelect) {
        if (shape.checked) {
            return shape.value; 
        }
    }
    return null; 
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const shape = getSelectedShape();

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
        ctx.fill();
        ctx.closePath();
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.fillStyle = 'rgba(255, 150, 0, 0.5)';
        ctx.fillRect(width < 0 ? currentX : startX, height < 0 ? currentY : startY, Math.abs(width), Math.abs(height));
    } 
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});