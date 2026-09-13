const args = process.argv;

const num1 = parseFloat(args[2]);
const num2 = parseFloat(args[3]);
const operator = args[4];

if (Number.isNaN(num1) || Number.isNaN(num2)) {
    console.log("Usage: node calc-cli.js <number1> <number2> <operator>");
    process.exit(1);
}

let result;

switch (operator) {
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "*":
        result = num1 * num2;
        break;
    case "/":
        if (num2 === 0) {
            console.log("Error: Cannot divide by zero.");
            process.exit(1);
        }
        result = num1 / num2;
        break;
    default:
        console.log("Invalid operator. Use +, -, * or /.");
        process.exit(1);
}

console.log(`${num1} ${operator} ${num2} = ${result}`);
