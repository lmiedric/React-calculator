import React, {useState} from 'react';
import '../css/Card.css';
import CalcCell from './CalcCell';
import OutputText from './OutputText';

let lastInput = -1;
let countNaN = 0;

const Card = () => {
    const calcCells = [1, 2, 3, '+', 4, 5, 6, '-', 7, 8, 9, 'x', '/', 0, '.', '='];

    const [result, setResult] = useState('');

    const handleClick = (event) => {
        const buttonValue = event.target.innerText;
        let isNumber = !isNaN(buttonValue);
        let wasNumber = !isNaN(lastInput);

        switch (buttonValue) {
            case '=':
                if (result && result !== '-') {
                    const evalValue = eval(result.replace('x', '*'));
                    setResult(evalValue);
                    lastInput = evalValue;
                    countNaN = 0;
                }
                break;
            case 'C':
                setResult('');
                lastInput = -1;
                countNaN = 0;
                break;
            case '.':
                if (wasNumber) {
                    setResult(result + buttonValue);
                    lastInput = buttonValue;
                }
                break;
            default:
                if (!isNumber) {
                    // If no input was made yet, only allow the minus operator to be input
                    if (!result && buttonValue !== '-') {
                        break;
                    }
                    
                    if (!wasNumber) {
                        // Not another operator after leading minus sign
                        if (result === '-') {
                            break;
                        }
                        
                        // If two operators are next to each other, replace the first by the second operator
                        if (isNaN(result)) {
                            let cutResult = result.slice(0, -1);
                            setResult(cutResult + buttonValue);
                            countNaN = 1;
                            lastInput = buttonValue;
                            break;
                        }
                        break;
                    }

                    if (wasNumber) {
                        countNaN++;
                        lastInput = buttonValue;

                        // If the input is the second operator within the result, calculate the previous result before adding the input operator
                        if (countNaN > 1) {
                            const evalValue = eval(result.replace('x', '*'));
                            setResult(evalValue + buttonValue);
                            countNaN = 1;
                            break;
                        }
                    }
                }

                // Simply add the input number to the result string.
                setResult(result + buttonValue);
                lastInput = buttonValue;
                break;
        }
    };

    return (
        <div className='grid'>
            <OutputText column={'1/4'} row={1} value={result} /> 
            <CalcCell column={4} row={1} number={'C'} className="delete" onClick={handleClick} />
            
            {calcCells.map((x, index) => {
                return (
                    <CalcCell key={index} number={x} onClick={handleClick}/>
                )
            })}
        </div>
    );
};

export default Card;