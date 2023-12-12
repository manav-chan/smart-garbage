document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const fileContent = e.target.result;
            displayDumpsterStatus(fileContent);
        };

        reader.readAsText(file);
    }
}
// ... existing code ...

// Fetch file content from the server
fetch('Smart Bin.txt')
    .then(response => response.text())
    .then(fileContent => displayDumpsterStatus(fileContent))
    .catch(error => console.error('Error fetching file:', error));




function displayDumpsterStatus(fileContent) {
    const lines = fileContent.split('\n');
    const dumpsterIdLine = lines.find(line => line.includes('Dumpster ID'));
    const locationLine = lines.find(line => line.includes('Location'));

    if (dumpsterIdLine && locationLine) {
        const dumpsterId = dumpsterIdLine.split(':')[1].trim();
        const location = locationLine.split(':')[1].trim();

        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = `<p>Dumpster ID ${dumpsterId} is nearly full at Location ${location}. Consider emptying the garbage.</p>`;
    } else {
        alert('Invalid file format. Please provide a valid text file.');
    }
}


// Fetch file content from the server
// fetch('Details.txt')
//     .then(response => response.text())
//     .then(fileContent => displayDumpsterStatus(fileContent))
//     .catch(error => console.error('Error fetching file:', error));

// // Rest of your existing code...

// function displayDumpsterStatus(fileContent) {
//     const lines = fileContent.split('\n');
//     const dumpsterIdLine = lines.find(line => line.includes('Dumpster ID'));
//     const locationLine = lines.find(line => line.includes('Location'));

//     if (dumpsterIdLine && locationLine) {
//         const dumpsterId = dumpsterIdLine.split(':')[1].trim();
//         const location = locationLine.split(':')[1].trim();

//         const outputDiv = document.getElementById('output');
//         outputDiv.innerHTML = `<p>Dumpster ID ${dumpsterId} is nearly full at Location ${location}. Consider emptying the garbage.</p>`;
//     } else {
//         alert('Invalid file format. Please provide a valid text file.');
//     }
// }
