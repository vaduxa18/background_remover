function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  }

  function handleFiles(files) {
    const file = files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'nVyYpVaAcAnEiJg6NLdF3qVF', // Replace with your actual Remove.bg API key
      },
      body: formData,
    })
    .then(response => response.blob())
    .then(blob => {
      const imageUrl = URL.createObjectURL(blob);
      const preview = document.getElementById('image-preview');
      preview.innerHTML = `<img src="${imageUrl}" alt="Background Removed" />`;
      document.getElementById('download-button').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
    
  }

  function downloadImage() {
    const img = document.querySelector('#image-preview img');
    const url = img.src;
    const filename = 'background_removed_image.png';
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
  }
  