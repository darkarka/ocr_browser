function performOCR() {
  const fileInput = document.getElementById('image-upload');
  const outputDiv = document.getElementById('output-text');

  if (fileInput.files.length === 0) {
      alert('Please upload an image first.');
      return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const imageData = e.target.result;
      outputDiv.style.display = 'none'; // Hide previous results
      outputDiv.textContent = 'Processing...';
      outputDiv.style.display = 'block'; // Show processing message
      
      Tesseract.recognize(
          imageData,
          'eng',
          {
              logger: (m) => console.log(m)
          }
      ).then(({ data: { text } }) => {
          outputDiv.textContent = text;
      }).catch(error => {
          outputDiv.textContent = 'An error occurred during OCR processing.';
          console.error(error);
      });
  };

  reader.readAsDataURL(file);
}
