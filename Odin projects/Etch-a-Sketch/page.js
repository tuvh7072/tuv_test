let rows = 16;
let columns = 16;

// DOM Elements
const gridContainer = document.querySelector('.grids');
const inputField = document.querySelector('.grid_input');
const button = document.querySelector('.grid_button');

// Function to create the grid
function createGrid(rows, columns) {
    // Clear the current grid
    gridContainer.innerHTML = '';
    
    // Set CSS grid template
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        
        for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {
        
                        //Create grid item element
                        const cell = document.createElement('div');
                        cell.classList.add('cell');
                        gridContainer.appendChild(cell);
                } 
        }
}

button.addEventListener('click', () => {
        const inputValue = parseInt(inputField.value);

        if (!isNaN(inputValue) && inputValue > 0) {
                rows = inputValue;
                columns = inputValue;
        } else {
                alert('Please enter a valid positive number');
                return;
        }

        createGrid(rows, columns)
})

gridContainer.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('cell')) {
                event.target.style.backgroundColor = 'a0a0a0';
                setTimeout(() => {
                        event.target.style.backgroundColor = '#ffc107';
                }, 100);
                setTimeout(() => {
                        event.target.style.backgroundColor = '#e0e0e0';
                }, 90000);
        }
}); 

createGrid(rows, columns);