const $leaders = document.querySelector(".leaders");
const $staff = document.querySelector(".staff");
const $advanced_members = document.querySelector(".advanced-members");
const $members = document.querySelector(".members");
const $trials = document.querySelector(".trials")

const $leaders_grid = document.getElementById("leaders__grid");
const $staff_grid = document.getElementById("staff__grid");
const $advanced_members_grid = document.getElementById("advanced-members__grid");
const $members_grid = document.getElementById("members__grid");
const $trials_grid = document.getElementById("trials__grid");

fetch("http://localhost:3000/")
    .then(res => res.json())
    .then(res => {
        for (let i = 0; i < res.length; i++) {
            const cardMember = document.createElement("DIV");
            cardMember.classList.add("player");

            if (res[i].therol === "leaders") {
                
                cardMember.innerHTML = `

                <i class="player__edit fas fa-edit" data-id="${res[i].id}"></i>
                <img src="http://localhost:3000/image/${res[i].theimg}" alt="${res[i].nickname}">

                <h3 class="player__tag">iW//<span class="player__name-${res[i].therol}">${res[i].nickname}</span></h3>

                <h3 class="player__rank">${res[i].therank}</h3>`

                $leaders_grid.appendChild(cardMember)
            }

            else if (res[i].therol === "staff") {
                cardMember.innerHTML = `
                <i class="player__edit fas fa-edit" data-id="${res[i].id}"></i>
                <img src="http://localhost:3000/image/${res[i].theimg}" alt="${res[i].nickname}">

                <h3 class="player__tag">iW//<span class="player__name-${res[i].therol}">${res[i].nickname}</span></h3>

                <h3 class="player__rank">${res[i].therank}</h3>`

                $staff_grid.appendChild(cardMember)
            }

            else if (res[i].therol === "advanced-members") {
                cardMember.innerHTML = `
                <i class="player__edit fas fa-edit" data-id="${res[i].id}"></i>
                <img src="http://localhost:3000/image/${res[i].theimg}" alt="${res[i].nickname}">

                <h3 class="player__tag">iW//<span class="player__name-${res[i].therol}">${res[i].nickname}</span></h3>

                <h3 class="player__rank">${res[i].therank}</h3>`

                $advanced_members_grid.appendChild(cardMember)
            }

            else if (res[i].therol === "members") {
                cardMember.innerHTML = `
                <i class="player__edit fas fa-edit" data-id="${res[i].id}"></i>
                <img src="http://localhost:3000/image/${res[i].theimg}" alt="${res[i].nickname}">

                <h3 class="player__tag">iW//<span class="player__name-${res[i].therol}">${res[i].nickname}</span></h3>

                <h3 class="player__rank">${res[i].therank}</h3>`

                $members_grid.appendChild(cardMember)
            }

            else if (res[i].therol === "trials") {
                cardMember.innerHTML = `
                <i class="player__edit fas fa-edit" data-id="${res[i].id}"></i>
                <img src="http://localhost:3000/image/${res[i].theimg}" alt="${res[i].nickname}">

                <h3 class="player__tag">iW//<span class="player__name-${res[i].therol}">${res[i].nickname}</span></h3>

                <h3 class="player__rank">${res[i].therank}</h3>`

                $trials_grid.appendChild(cardMember);
            }
        }


        if ($leaders_grid.textContent === "") {
            $leaders.style.display = "none"
        }

        if ($staff_grid.textContent === "") {
            $staff.style.display = "none"
        }

        if ($advanced_members_grid.textContent === "") {
            $advanced_members.style.display = "none";
        }

        if ($members_grid.textContent === "") {
            $members.style.display = "none"
        }

        if ($trials_grid.textContent === "") {
            $trials.style.display = "none"
        }
    })
