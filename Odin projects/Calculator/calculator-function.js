// DOM Elements
const inputField = document.querySelector('.user_input');

let calculationComplete = false;

document.querySelector('.buttons').addEventListener('click', event => {
    const clickedButton = event.target; // Identify which button is clicked

    if (clickedButton.tagName === 'DIV') {
        const buttonValue = clickedButton.textContent;

        if (buttonValue === 'AC') {
            // Clear the input field
            inputField.value = '';
        } else if (buttonValue === 'backspace') {
            // Remove the last character from the input field
            inputField.value = inputField.value.slice(0, -1);
        } else if (buttonValue === '=') {
            inputField.value = calculate(inputField.value);
            // Calculate the result and show it in the input field
            calculationComplete = true;
            // This changes the bol value so that when the first number is typed after this, the input field is blank
        } else {
                if (calculationComplete) {
                        inputField.value = '';
                        calculationComplete = false;
                }

            if (buttonValue === '.') {
                // Prevent multiple decimals in the same number
                const lastNumber = inputField.value.split(/[\+\-\*\/\%]/).pop();
                if (lastNumber.includes('.')) return;
            }
            // Append the button value to the input field
            inputField.value += buttonValue;
        }
    }
});

document.addEventListener('keydown', (event) => {
// keydown is for all keys, regardless of whether they produce a character value. This show an indication to what key is pressed, whereas keypress indicates which character was entered. 

        const key = event.key;

        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '%', '.', 'Enter', 'Backspace'];
        
        if (validKeys.includes(key)) {
                event.preventDefault();
        } // This prevent default action for specific keys (e.g. enter submitting a form)

        // The following check if the key pressed is a valid input for the calculator
        if (key >= '0' && key <= '9') {
                if (calculationComplete) {
                        inputField.value = ''; // Reset input field after calculation
                        calculationComplete = false;
                }
                inputField.value += key;
        } else if (key === '.') {
                const lastNumber = inputField.value.split(/[\+\-\*\/\%]/).pop();
                if (!lastNumber.includes('.')) {
                        inputField.value += '.';
                }
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
                // Append (adds something to the end) the operator to the input field
                if (calculationComplete) {
                        inputField.value = '';
                        calculationComplete = false;
                }
                inputField.value += key;
        } else if (key === 'Enter') {
                inputField.value = calculate(inputField.value);
                // Calculates the result and show it in the input filed
                calculationComplete = true;
        } else if (key === 'Backspace') {
                inputField.value = inputfield.value.slice(0, -1);
        }
})


function calculate(expression) {
    const parts = expression.match(/(\d+(\.\d+)?|[\+\-\*\/\%])/g);
    // This uses regex to split numbers and operators. Example: "12+3*4" becomes ["12", "+", "3", "*", "4"].

    if (!parts || parts.length < 3) {
        return "Error";
    }

    let sum = parseFloat(parts[0]); // This starts with the first number

    for (let i = 1; i < parts.length; i += 2) { // This iterates through the array and apply each operator to the current result
        const operator = parts[i];
        const nextNumber = parseFloat(parts[i + 1]);

        if (isNaN(nextNumber)) {
            return "Error"; // Handle invalid numbers
        }

        // This applies the operator to the result
        switch (operator) {
            case "+":
                sum += nextNumber;
                break;
            case "-":
                sum -= nextNumber;
                break;
            case "*":
                sum *= nextNumber;
                break;
            case "/":
                if (nextNumber === 0) { // This ensures that you can't divide by 0
                    return "Error";
                }
                sum /= nextNumber;
                break;
            case "%":
                sum %= nextNumber;
                break;
            default:
                return "Error"; // This handles invalid operator
        }
    }
    return Math.round(sum * 100) / 100;
    // This rounds the result to two decimal places if it's a float
}
