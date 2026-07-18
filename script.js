
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

button.onclick = () => {
    let choice = search.value;
    getData(choice).then(function(response){
        name_user.textContent = response.login;
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

    })
}