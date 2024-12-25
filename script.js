document.getElementById('upload').addEventListener('change', handleImageUpload);
document.getElementById('uploadedImage').addEventListener('mousedown', startDrag);
document.getElementById('downloadButton').addEventListener('click', downloadImage);

let isDragging = false;
let startX, startY, initialX, initialY;

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('uploadedImage');
        img.src = e.target.result;
        img.onload = function() {
            // Căn giữa hình ảnh
            img.style.left = '50%';
            img.style.top = '50%';
            img.style.transform = 'translate(-50%, -50%)';
        }
    };
    reader.readAsDataURL(file);
}

function startDrag(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    const img = document.getElementById('uploadedImage');
    initialX = parseInt(img.style.left);
    initialY = parseInt(img.style.top);
    document.addEventListener('mousemove', dragImage);
    document.addEventListener('mouseup', stopDrag);
}

function dragImage(event) {
    if (isDragging) {
        const img = document.getElementById('uploadedImage');
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        img.style.left = `${initialX + dx}px`;
        img.style.top = `${initialY + dy}px`;
    }
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', dragImage);
    document.removeEventListener('mouseup', stopDrag);
}

function downloadImage() {
    const frame = document.querySelector('.frame');
    html2canvas(frame).then(canvas => {
        const link = document.createElement('a');
        link.download = 'framed-photo.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}