const form = document.getElementById("github-form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    //event.taget[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
    .then(response => response.json())
    .then(response => {
        const nameList = document.querySelector("#user-list")
        const reposList = document.getElementById("repos-list")
        reposList.innerHTML = ""
        nameList.innerHTML = ""
        console.log("response", response)
        response.items.map(item => {
            const li = document.createElement("li")
            const header = document.createElement("h2")
            header.textContent = item.login

            header.addEventListener("click" , e => showUserRepos(item.login, e))
            const img = document.createElement("img")
            img.src = item.avatar_url

            
            li.append(header, img)
            nameList.append(li)
        })
    })
})

function showUserRepos(username, e) {
    const reposList = document.getElementById("repos-list")
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(response => response.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name
        li.append(h1)
        reposList.append(li)
     
    }))
}