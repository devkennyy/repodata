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
                <p><strong>📛 Repo: <br/></strong> ${data[i].name}</p>
                <p><strong>📙 Description: <br/></strong> ${data[i].description}</p>
                <p><strong>🔗 URL: <br/></strong> <a href="${data[i].html_url}">${data[i].html_url}</a></p>
                <p><strong>⭐ Stars:</strong> ${data[i].stargazers_count}</p>
                <p><strong>🍴 Forks:</strong> ${data[i].forks_count}</p>
            `;

      ul.appendChild(li);
    }
  };

  xhr.send();
}
