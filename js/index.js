document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", (e) => e.preventDefault())
    loadMonsters();
})

const monsterContainer = document.querySelector("#monster-container")

const form = document.querySelector("#monster-creator")
form.addEventListener("submit", newMonster)

const forward = document.querySelector("#forward")
forward.addEventListener("click", nextMonsters)


const back = document.querySelector("#back")
back.addEventListener("click", prevMonsters)

let index = 0

function loadMonsters () {
    fetch("http://localhost:3000/monsters")
    .then(resp => resp.json())
    .then(data => {
        for (let i = index; i < index+50; i++) {
            let name = data[i].name
            let age = data[i].age
            let desc = data[i].description
            
            let div = document.createElement("div")
            div.innerHTML = `<h1>${name}</h1>
            <p><strong>Age: ${age}</strong></p>
            <p>${desc}</p>`
            monsterContainer.appendChild(div)
        }
    })
}

function newMonster() {
   let name = form[0].value
   let age = form[1].value
   let desc = form[2].value

   fetch("http://localhost:3000/monsters", {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: 
      JSON.stringify({"name": name, "age": age, "description": desc})
   })
   .then((resp) => resp.json())
   .then(data => console.log(data))

   form.reset()
}

function nextMonsters() {
    index += 50
    monsterContainer.innerHTML = ""
    loadMonsters();
}

function prevMonsters() {
    if (index > 49) {
        index -= 50
        monsterContainer.innerHTML = ""
        loadMonsters();
    } else {
        alert("No more monsters this way! Click => to see more monsters.")
    }
}