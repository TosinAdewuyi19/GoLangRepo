// document.getElementById('calcForm').addEventListener('submit', async function (e) {
//     e.preventDefault();
//
//     const form = new FormData(e.target);
//     const response = await fetch('/calculate', {
//         method: 'POST',
//         body: form
//     });
//
//     const resultDiv = document.getElementById('result');
//     const data = await response.json();
//
//     if (response.ok) {
//         resultDiv.textContent = `Result: ${data.result}`;
//     } else {
//         resultDiv.textContent = `Error: ${data.error}`;
//     }
// });
