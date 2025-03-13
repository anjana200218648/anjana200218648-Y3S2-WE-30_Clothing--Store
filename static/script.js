function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const resultDiv = document.getElementById("result");

    if (!fileInput.files.length) {
        resultDiv.style.display = "block";
        resultDiv.className = "alert alert-danger";
        resultDiv.innerText = "⚠ Please select a file!";
        return;
    }

    let formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.style.display = "block";
        if (data.error) {
            resultDiv.className = "alert alert-danger";
            resultDiv.innerText = "❌ " + data.error;
        } else {
            resultDiv.className = "alert alert-success";
            resultDiv.innerText = "✅ " + data.message + " | 📈 Prediction: " + data.prediction;
        }
    })
    .catch(error => {
        resultDiv.style.display = "block";
        resultDiv.className = "alert alert-danger";
        resultDiv.innerText = "❌ Error uploading file.";
    });
}
