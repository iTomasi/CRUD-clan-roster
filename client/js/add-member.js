const $inputFile = document.getElementById("inputFile");
const $inputSpan = document.getElementById("inputSpan");
const $form_preview = document.querySelector(".form__preview");
const $form = document.querySelector(".form");

$inputFile.addEventListener("change", () => {
    const fileName = $inputFile.files[0].name;
    const imgPreview = document.getElementById("form__preview-img");
    const showImg = URL.createObjectURL($inputFile.files[0]);

    $form_preview.style.display = "block";
    imgPreview.setAttribute("src", showImg)
    

    if (fileName.length >= 15) {
        $inputSpan.textContent = fileName.substring(0, 15) + ".."
    }

    else {
        $inputSpan.textContent = fileName
    }
});

$form.addEventListener("submit", async e => {
    e.preventDefault()

    const $inputNickname = document.getElementById("inputNickname").value
    const $selectRol = document.getElementById("selectRol").value;
    const $inputRank = document.getElementById("inputRank").value;

    const formData = new FormData();

    formData.append("nickname", $inputNickname);
    formData.append("therol", $selectRol);
    formData.append("therank", $inputRank);
    formData.append("inputFile", $inputFile.files[0]);

    await fetch("http://localhost:3000/", {
        method: "POST",
        body: formData
    })
        .then(async res => await res.json())
        .then(res => {
            if (res.message === "Fail :(") {
                console.log(res)
            }

            else {
                window.location.href = "index.html"
            }
        })
})