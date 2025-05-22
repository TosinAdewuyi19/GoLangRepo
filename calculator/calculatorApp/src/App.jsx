import { useState } from 'react';
import './index.css';


function App() {
    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('+');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('operand1', operand1);
        formData.append('operand2', operand2);
        formData.append('operator', operator);

        try {
            const res = await fetch('http://localhost:8080/calculate', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setResult(`Result: ${data.result}`);
            } else {
                setResult(`Error: ${data.error || 'Calculation failed'}`);
            }
        } catch (error) {
            setResult('Error: Unable to reach the server');
        }
    };

    return (
        <div className="container">
            <h1>Web Calculator</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Operand 1"
                    value={operand1}
                    onChange={(e) => setOperand1(e.target.value)}
                    required
                />
                <select
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                >
                    <option value="+">+</option>
                    <option value="-">−</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                </select>
                <input
                    type="number"
                    placeholder="Operand 2"
                    value={operand2}
                    onChange={(e) => setOperand2(e.target.value)}
                    required
                />
                <button type="submit">Calculate</button>
            </form>
            {result && <div className="result">{result}</div>}
        </div>
    );
}

export default App;
