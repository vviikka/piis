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

            // Удаляем временные фигуры
            const tempShapes = document.querySelectorAll('.temp-shape');
            tempShapes.forEach(shape => shape.remove());

            // Создаем временную фигуру
            if (shape === 'circle') {
                const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
                const tempCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                tempCircle.setAttribute("cx", startX);
                tempCircle.setAttribute("cy", startY);
                tempCircle.setAttribute("r", radius);
                tempCircle.setAttribute("fill", "rgba(0, 150, 255, 0.5)");
                tempCircle.setAttribute("class", "temp-shape");
                svg.appendChild(tempCircle);
            } else if (shape === 'rectangle') {
                const width = currentX - startX;
                const height = currentY - startY;
                const rectX = width < 0 ? currentX : startX; // Если текущая позиция меньше стартовой
                const rectY = height < 0 ? currentY : startY; 

                const tempRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                tempRect.setAttribute("x", rectX);
                tempRect.setAttribute("y", rectY);
                tempRect.setAttribute("width", Math.abs(width)); 
                tempRect.setAttribute("height", Math.abs(height)); 
                tempRect.setAttribute("fill", "rgba(255, 150, 0, 0.5)");
                tempRect.setAttribute("class", "temp-shape");
                svg.appendChild(tempRect);
            }
        });

        svg.addEventListener('mouseup', (event) => {
            if (!isDrawing) return;

            const currentX = event.offsetX;
            const currentY = event.offsetY;
            const shape = getSelectedShape();

            // Добавляем окончательную фигуру
            if (shape === 'circle') {
                const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
                const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                circle.setAttribute("cx", startX);
                circle.setAttribute("cy", startY);
                circle.setAttribute("r", radius);
                circle.setAttribute("fill", "rgba(0, 150, 255, 0.5)");
                svg.appendChild(circle);
            } else if (shape === 'rectangle') {
                const width = currentX - startX;
                const height = currentY - startY;
                const rectX = width < 0 ? currentX : startX; // Если текущая позиция меньше стартовой
                const rectY = height < 0 ? currentY : startY;
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute("x", rectX);
                rect.setAttribute("y", rectY);
                rect.setAttribute("width", Math.abs(width));
                rect.setAttribute("height", Math.abs(height)); 
                rect.setAttribute("fill", "rgba(255, 150, 0, 0.5)");
                svg.appendChild(rect);
            }

            isDrawing = false;
        });

        svg.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
