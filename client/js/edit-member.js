const $cross = document.querySelector(".form__times");
const $form_editMember = document.querySelector(".form__editMember");
const $form = document.querySelector("form");
const $content = document.querySelector(".content");
const $removeMemberBtn = document.querySelector(".deleteMemberBTN");

const $inputNickname = document.getElementById("inputNickname");
const $selectRol = document.getElementById("selectRol");
const $inputRank = document.getElementById("inputRank");
const $inputSpan = document.getElementById("inputSpan");
const $inputFile = document.getElementById("inputFile");

$cross.addEventListener("click", () => $form_editMember.style.display = "none");

$content.addEventListener("click", e => {
    if (e.target.classList.contains("player__edit")) {
        fetch(`http://localhost:3000/data-member/${e.target.dataset.id}`)
            .then(res => res.json())
            .then(res => {
                $form_editMember.style.display = "flex";
                $removeMemberBtn.setAttribute("data-id", res.id);
                $form.setAttribute("data-id", res.id);

                if (res.theimg.length >= 13) {
                    $inputSpan.textContent = res.theimg.substring(0, 13) + ".."
                }

                else {
                    $inputSpan.textContent = res.theimg
                }

                $inputNickname.value = res.nickname;
                $inputRank.value = res.therank;
            })
    }
})

$inputFile.addEventListener("change", () => {
    const fileName = $inputFile.files[0].name;

    if (fileName.length >= 11) {
        $inputSpan.textContent = fileName.substring(0, 13) + ".."
    }

    else {
        $inputSpan.textContent = fileName
    }
})

$form.addEventListener("submit", e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nickname", $inputNickname.value);
    formData.append("therol", $selectRol.value);
    formData.append("therank", $inputRank.value);
    formData.append("inputFile", $inputFile.files[0])

    fetch(`http://localhost:3000/${e.currentTarget.dataset.id}`, {
        method: "PUT",
        body: formData
    })
        .then(res => res.json())
        .then(res => {
            if (res.message === "ERROR :(") {
                console.log(res)
            }

            else {
                location.reload();
            }
        })
})

$removeMemberBtn.addEventListener("click", e => {
    const getId = e.target.dataset.id;

    fetch(`http://localhost:3000/${getId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(res => {
            location.reload();
        })
})
