// server.js - Simple Black & White Web Calculator
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Main calculator route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Simple Calculator</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Arial', sans-serif;
                background-color: white;
                color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
            }
            
            .calculator {
                background-color: white;
                border: 2px solid black;
                border-radius: 0;
                padding: 20px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                width: 300px;
                max-width: 100%;
            }
            
            .title {
                text-align: center;
                font-size: 1.5em;
                margin-bottom: 20px;
                font-weight: bold;
                color: black;
            }
            
            .display {
                width: 100%;
                height: 60px;
                border: 2px solid black;
                background-color: white;
                color: black;
                font-size: 1.5em;
                text-align: right;
                padding: 0 15px;
                margin-bottom: 20px;
                outline: none;
                font-family: 'Courier New', monospace;
            }
            
            .buttons {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
            }
            
            .btn {
                height: 50px;
                border: 2px solid black;
                background-color: white;
                color: black;
                font-size: 1.2em;
                cursor: pointer;
                transition: all 0.2s ease;
                font-weight: bold;
            }
            
            .btn:hover {
                background-color: black;
                color: white;
            }
            
            .btn:active {
                transform: scale(0.95);
            }
            
            .btn.operator {
                background-color: black;
                color: white;
            }
            
            .btn.operator:hover {
                background-color: white;
                color: black;
            }
            
            .btn.equals {
                background-color: black;
                color: white;
                grid-column: span 2;
            }
            
            .btn.equals:hover {
                background-color: white;
                color: black;
            }
            
            .btn.clear {
                background-color: white;
                color: black;
                grid-column: span 2;
            }
            
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 0.9em;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="calculator">
            <div class="title">Simple Calculator</div>
            
            <input type="text" class="display" id="display" readonly>
            
            <div class="buttons">
                <button class="btn clear" onclick="clearDisplay()">Clear</button>
                <button class="btn operator" onclick="deleteLast()">Del</button>
                
                <button class="btn" onclick="appendToDisplay('7')">7</button>
                <button class="btn" onclick="appendToDisplay('8')">8</button>
                <button class="btn" onclick="appendToDisplay('9')">9</button>
                <button class="btn operator" onclick="appendToDisplay('/')">÷</button>
                
                <button class="btn" onclick="appendToDisplay('4')">4</button>
                <button class="btn" onclick="appendToDisplay('5')">5</button>
                <button class="btn" onclick="appendToDisplay('6')">6</button>
                <button class="btn operator" onclick="appendToDisplay('*')">×</button>
                
                <button class="btn" onclick="appendToDisplay('1')">1</button>
                <button class="btn" onclick="appendToDisplay('2')">2</button>
                <button class="btn" onclick="appendToDisplay('3')">3</button>
                <button class="btn operator" onclick="appendToDisplay('-')">-</button>
                
                <button class="btn" onclick="appendToDisplay('0')">0</button>
                <button class="btn" onclick="appendToDisplay('.')">.</button>
                <button class="btn operator" onclick="appendToDisplay('+')">+</button>
                <button class="btn equals" onclick="calculate()">=</button>
            </div>
            
            <div class="footer">
                Black & White Design • Simple & Clean
            </div>
        </div>

        <script>
            let display = document.getElementById('display');
            let currentInput = '';
            let operator = '';
            let previousInput = '';

            function appendToDisplay(value) {
                if (['+', '-', '*', '/'].includes(value)) {
                    if (currentInput !== '') {
                        if (previousInput !== '' && operator !== '') {
                            calculate();
                        }
                        operator = value;
                        previousInput = currentInput;
                        currentInput = '';
                        display.value = previousInput + ' ' + (value === '*' ? '×' : value === '/' ? '÷' : value) + ' ';
                    }
                } else {
                    currentInput += value;
                    if (operator === '') {
                        display.value = currentInput;
                    } else {
                        display.value = previousInput + ' ' + (operator === '*' ? '×' : operator === '/' ? '÷' : operator) + ' ' + currentInput;
                    }
                }
            }

            function calculate() {
                if (previousInput !== '' && currentInput !== '' && operator !== '') {
                    let result;
                    const prev = parseFloat(previousInput);
                    const current = parseFloat(currentInput);
                    
                    if (isNaN(prev) || isNaN(current)) return;
                    
                    switch (operator) {
                        case '+':
                            result = prev + current;
                            break;
                        case '-':
                            result = prev - current;
                            break;
                        case '*':
                            result = prev * current;
                            break;
                        case '/':
                            if (current === 0) {
                                display.value = 'Error';
                                clearAll();
                                return;
                            }
                            result = prev / current;
                            break;
                        default:
                            return;
                    }
                    
                    // Round to avoid floating point issues
                    result = Math.round(result * 100000000) / 100000000;
                    
                    display.value = result;
                    currentInput = result.toString();
                    previousInput = '';
                    operator = '';
                }
            }

            function clearDisplay() {
                clearAll();
                display.value = '';
            }
            
            function clearAll() {
                currentInput = '';
                previousInput = '';
                operator = '';
            }

            function deleteLast() {
                if (currentInput !== '') {
                    currentInput = currentInput.slice(0, -1);
                    if (operator === '') {
                        display.value = currentInput;
                    } else {
                        display.value = previousInput + ' ' + (operator === '*' ? '×' : operator === '/' ? '÷' : operator) + ' ' + currentInput;
                    }
                } else if (operator !== '') {
                    operator = '';
                    currentInput = previousInput;
                    previousInput = '';
                    display.value = currentInput;
                }
            }

            // Keyboard support
            document.addEventListener('keydown', function(event) {
                const key = event.key;
                
                if ('0123456789.'.includes(key)) {
                    appendToDisplay(key);
                } else if ('+-*/'.includes(key)) {
                    appendToDisplay(key);
                } else if (key === 'Enter' || key === '=') {
                    calculate();
                } else if (key === 'Escape') {
                    clearDisplay();
                } else if (key === 'Backspace') {
                    deleteLast();
                }
            });
        </script>
    </body>
    </html>
  `);
});

// API endpoint for calculations
app.post('/api/calculate', (req, res) => {
  const { expression } = req.body;
  
  try {
    // Simple expression evaluation (be careful with eval in production!)
    const result = Function('"use strict"; return (' + expression + ')')();
    res.json({
      success: true,
      expression: expression,
      result: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Invalid expression',
      message: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log('🧮 Simple Calculator Server Started!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🔢 Calculator: http://localhost:${PORT}/`);
  console.log(`🎨 Design: Black & White Minimalist`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Ready to calculate!');
});

export default app;