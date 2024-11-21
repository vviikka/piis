const canvas = document.getElementById('drawing-area');
        const ctx = canvas.getContext('2d');
        const shapeSelect = document.querySelectorAll('input[name="shape"]');

        let isDrawing = false;
        let startX, startY;
        let currentShape = null;
        const shapes = [];  // Массив для хранения фигур

        function getSelectedShape() {
            for (const shape of shapeSelect) {
                if (shape.checked) {
                    return shape.value; 
                }
            }
            return null; 
        }

        function drawShapes() {
            // Очищаем канвас
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Рисуем все сохраненные фигуры
            for (const shape of shapes) {
                if (shape.type === 'circle') {
                    ctx.beginPath();
                    ctx.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
                    ctx.fill();
                    ctx.closePath();
                } else if (shape.type === 'rectangle') {
                    ctx.fillStyle = 'rgba(255, 150, 0, 0.5)';
                    ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
                }
            }
        }

        canvas.addEventListener('mousedown', (event) => {
            isDrawing = true;
            startX = event.offsetX;
            startY = event.offsetY;
            currentShape = { type: getSelectedShape(), startX, startY }; // Сохраняем текущую фигуру
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!isDrawing) return;

            const currentX = event.offsetX;
            const currentY = event.offsetY;

            // Обновляем параметры текущей фигуры
            if (currentShape.type === 'circle') {
                currentShape.radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            } else if (currentShape.type === 'rectangle') {
                currentShape.width = currentX - startX;
                currentShape.height = currentY - startY;
            }

            // Перерисовываем все фигуры
            drawShapes();

            // Рисуем текущую фигуру
            if (currentShape.type === 'circle') {
                ctx.beginPath();
                ctx.arc(startX, startY, currentShape.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
                ctx.fill();
                ctx.closePath();
            } else if (currentShape.type === 'rectangle') {
                ctx.fillStyle = 'rgba(255, 150, 0, 0.5)';
                ctx.fillRect(startX, startY, currentShape.width, currentShape.height);
            }
        });

        canvas.addEventListener('mouseup', () => {
            if (!isDrawing) return;

            // Сохраняем текущую фигуру в массив
            shapes.push(currentShape);

            isDrawing = false;
            currentShape = null;  // Сбрасываем текущую фигуру
        });

        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
