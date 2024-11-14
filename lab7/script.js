const svg = document.getElementById('drawing-area');
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

svg.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

svg.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const shape = getSelectedShape();

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', startX);
        circle.setAttribute('cy', startY);
        circle.setAttribute('r', radius);
        circle.setAttribute('fill', 'rgba(0, 150, 255, 0.5)');
        svg.appendChild(circle);
    } else if (shape === 'rectangle') {
        rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', startX);
    rect.setAttribute('y', startY);
    rect.setAttribute('fill', 'rgba(255, 150, 0, 0.5)');
    rect.setAttribute('width', 0); // Начальная ширина
    rect.setAttribute('height', 0); // Начальная высота

    svg.appendChild(rect); // Добавляем прямоугольник в SVG
});

svg.addEventListener('mousemove', (event) => {
    if (!isDrawing) return; // Если не рисуем, выходим из функции

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const width = currentX - rect.getAttribute('x');
    const height = currentY - rect.getAttribute('y');

    // Обновляем только размеры прямоугольника
    rect.setAttribute('width', Math.abs(width));
    rect.setAttribute('height', Math.abs(height));

    // Устанавливаем правильные координаты x и y
    rect.setAttribute('x', width < 0 ? currentX : rect.getAttribute('x'));
    rect.setAttribute('y', height < 0 ? currentY : rect.getAttribute('y'));
});
});

svg.addEventListener('mouseup', () => {
    isDrawing = false;
});

svg.addEventListener('mouseleave', () => {
    isDrawing = false;
});
