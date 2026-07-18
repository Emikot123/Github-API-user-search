
async function getData(user){
    let response = await fetch(`https://api.github.com/users/${user}`);
    let data = await response.json();
    console.log(data);
    return data;
}

let button = document.getElementById("submit");
let name_user = document.getElementById("name");
let company  = document.getElementById("company");
let username = document.getElementById("username");
let repo_amount = document.getElementById("repo_amount");
let followers = document.getElementById("followers");
let following = document.getElementById("following");
let email = document.getElementById("email");
let search = document.getElementById("search");
let pfp = document.getElementById("pfp_icon");

button.onclick = () => {
    let choice = search.value;
    getData(choice).then(function(response){
        name_user.textContent = response.login;
        username.href = response.html_url;
        username.textContent = response.name;
        if(response.company !== null){
            company.textContent = response.company;
        } else {
            company.textContent = "Not Shown";
        }
        repo_amount.textContent = response.public_repos;
        followers.textContent = response.followers;
        following.textContent = response.following;
        if(response.email !== null){
            email.textContent = response.email;
        } else {
            email.textContent = "Not Shown";
        }
        pfp.src = response.avatar_url;
        getRepoData(choice)

    })

}

async function getRepoData(user){
    let response = await fetch(`https://api.github.com/users/${user}/repos`);
    let data = await response.json();
    console.log(data);
    display(data);
    return data;
}


let visibility = document.getElementById("visibility");
let repo_NameLink = document.getElementById("repo_name");
let count = document.getElementById("repo_count");
let program = document.getElementById("repo_lang");
const reposContainer = document.querySelector("#repo_container");

function display(repos) {
    reposContainer.innerHTML = "";

    repos.forEach(repo => {
        const repoElement = document.createElement("article");

        repoElement.classList.add("repo-card");

        repoElement.innerHTML = `
        <h2>
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
        </a>
        </h2>

        <p>
            Stars: ${repo.stargazers_count}
        </p>

      <p>
        Visibility: ${repo.visibility}
      </p>

      <p>
        Programming Language: ${repo.language ?? "Not shown"}
      </p>
    `;

        reposContainer.appendChild(repoElement);
    });
}