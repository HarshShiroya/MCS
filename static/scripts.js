function updateLabel(sliderId, value, name) {
    const label = document.querySelector(`label[for='${sliderId}']`);
    label.textContent = `${name}: ${value}`;
}

function submitForm() {
    const generateButton = document.getElementById('generateButton');
    generateButton.textContent = 'Generating...';
    generateButton.disabled = true;

    const form = document.getElementById('musicForm');
    const formData = new FormData(form);
    fetch('/', {
        method: 'POST',
        body: formData
    }).then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const audio = document.querySelector('audio');
        audio.src = url;
        document.getElementById('audioPlayer').style.display = 'block';
        audio.onloadeddata = () => {
            generateButton.textContent = 'Generate';
            generateButton.disabled = false;
        };
    }).catch(error => {
        console.error('Error:', error);
        generateButton.textContent = 'Generate';
        generateButton.disabled = false;
    });
}
