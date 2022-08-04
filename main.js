const gitHubForm = document.getElementById("gitHubForm");
const navButtons = document.getElementById("navButtons");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

navButtons.style.display = "none";

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
    // if user doesn't exist, show error message
    if (data.message === "Not Found") {
      let noRepos = document.createElement("div");
      noRepos.classList.add("text-center");
      noRepos.innerHTML = `
          <h5><strong>🤷‍♂️ No repos found for ${username}</strong></h5>
      `;
      console.log(`${username} does not exist`);
      document.getElementById("userRepos").appendChild(noRepos);
    // }
    // else if (data.message.includes("API rate limit exceeded")) {
    //   let rateLimit = document.createElement("div");
    //   rateLimit.classList.add("text-center");
    //   rateLimit.innerHTML = `
    //       <h5><strong>🤷‍♂️ API rate limit exceeded</strong></h5>
    //   `;
    //   console.log(`API rate limit exceeded`);
    //   document.getElementById("userRepos").appendChild(rateLimit);
    } else {
      for (let i in data) {
        // create a repo card for each repo
        let repo = document.createElement("div");
        repo.classList.add("repo");
        repo.innerHTML = `
          <h5><strong>📛 Repo: <br/></strong></h5> <p>${data[i].name}</p>
          <h5><strong>📙 Description: <br/></strong></h5> <p>${data[i].description}</p>
          <h5><strong>🔗 URL: <br/></strong></h5> <p><a href="${data[i].html_url}">${data[i].html_url}</a></p>
          <h5><strong>⭐ Stars:</strong> ${data[i].stargazers_count} </h5> 
          <h5><strong>🍴 Forks:</strong> ${data[i].forks_count} </h5>
      `;
        document.getElementById("userRepos").appendChild(repo);
      }

      let repos = document.getElementsByClassName("repo");

      // hide all repos but the first
      for (let i = 1; i < repos.length; i++) {
        repos[i].style.display = "none";
      }

      // show the nav buttons (left and right)
      navButtons.style.display = "flex";

      let repoCount = 0;
      // when the right button is clicked, hide the current repo and display the next repo
      rightButton.addEventListener("click", () => {
        repos[repoCount].style.display = "none";
        repoCount++;
        repos[repoCount].style.display = "block";
      });
      // when the left button is clicked, hide the current repo and display the previous repo
      leftButton.addEventListener("click", () => {
        leftButton.disabled = false;
        repos[repoCount].style.display = "none";
        repoCount--;
        repos[repoCount].style.display = "block";
      });
    }
  };

  xhr.send();
}
