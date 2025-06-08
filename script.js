const uploadInput = document.getElementById("upload");
const originalImg = document.getElementById("original-img");
const resultImg = document.getElementById("result-img");
const removeBtn = document.getElementById("remove-bg-btn");
const loading = document.getElementById("loading");

const API_KEY = "ykotqcB6cqaWpUpncbmZuvGa";

uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    originalImg.src = URL.createObjectURL(file);
    resultImg.src = "";
  }
});

removeBtn.addEventListener("click", async () => {
  const file = uploadInput.files[0];
  if (!file) return alert("Please upload an image first.");

  loading.style.display = "block";

  const formData = new FormData();
  formData.append("image_file", file);
  formData.append("size", "auto");

  try {
    const res = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": API_KEY,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to remove background");

    const blob = await res.blob();
    resultImg.src = URL.createObjectURL(blob);
  } catch (error) {
    alert("Error: " + error.message);
  } finally {
    loading.style.display = "none";
  }
});
