const gitHubForm = document.getElementById("gitHubForm");

gitHubForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let usernameInput = document.getElementById("usernameInput");

  let gitHubUsername = usernameInput.value;

  requestUserRepos(gitHubUsername);
});

function requestUserRepos(username) {
  const xhr = new XMLHttpRequest();

  const url = `https://api.github.com/users/${username}/repos`;

  xhr.open("GET", url, true);

  xhr.onload = function () {
    const data = JSON.parse(this.response);

    for (let i in data) {
      let ul = document.getElementById("userRepos");

      let li = document.createElement("li");

      li.classList.add("list-group-item");

      li.innerHTML = `
                <h5><strong>📛 Repo: <br/></strong></h5> <p>${data[i].name}</p>
                <h5><strong>📙 Description: <br/></strong></h5> <p>${data[i].description}</p>
                <h5><strong>🔗 URL: <br/></strong></h5> <p><a href="${data[i].html_url}">${data[i].html_url}</a></p>
                <h5><strong>⭐ Stars:</strong> ${data[i].stargazers_count} </h5> 
                <h5><strong>🍴 Forks:</strong> ${data[i].forks_count} </h5>
            `;

      ul.appendChild(li);
    }
  };

  xhr.send();
}
