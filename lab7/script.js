let circle; // Переменная для круга
let isDrawing = false; // Флаг, указывающий на то, рисуем ли мы

svg.addEventListener('mousedown', (event) => {
    isDrawing = true; // Устанавливаем флаг рисования

    const centerX = event.offsetX;
    const centerY = event.offsetY;

    // Создаем круг, если его еще нет
    if (!circle) {
        circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('fill', 'rgba(255, 150, 0, 0.5)');
        svg.appendChild(circle);
    }

    circle.setAttribute('cx', centerX);
    circle.setAttribute('cy', centerY);
    circle.setAttribute('r', 0); // Начальный радиус = 0

    // Обновляем круг при движении мыши
    svg.addEventListener('mousemove', onMouseMove);

    // Завершаем рисование при отпускании кнопки мыши
    svg.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(event) {
    if (!isDrawing) return; // Если не рисуем, выходим из функции

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const radius = Math.sqrt(
        Math.pow(currentX - circle.getAttribute('cx'), 2) +
        Math.pow(currentY - circle.getAttribute('cy'), 2)
    );

    // Обновляем только радиус круга
    circle.setAttribute('r', radius);
}

function onMouseUp() {
    isDrawing = false; // Сбрасываем флаг рисования

    // Удаляем обработчики, чтобы предотвратить дальнейшие изменения
    svg.removeEventListener('mousemove', onMouseMove);
    svg.removeEventListener('mouseup', onMouseUp);
}

svg.addEventListener('mouseleave', () => {
    isDrawing = false; // Сбрасываем флаг при выходе мыши из SVG

    // Удаляем обработчики, чтобы предотвратить дальнейшие изменения
    svg.removeEventListener('mousemove', onMouseMove);
    svg.removeEventListener('mouseup', onMouseUp);
});
