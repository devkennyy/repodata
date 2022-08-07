const gitHubForm = document.getElementById('gitHubForm');
const navButtons = document.getElementById('navButtons');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const headingTag = document.getElementById('heading');
const label = document.getElementById('theme-text');
let flag = true;

navButtons.style.display = 'none';

gitHubForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let usernameInput = document.getElementById('usernameInput');

	let gitHubUsername = usernameInput.value;

	requestUserRepos(gitHubUsername);
});

function requestUserRepos(username) {
	const xhr = new XMLHttpRequest();
	const url = `https://api.github.com/users/${username}/repos`;
	xhr.open('GET', url, true);
	xhr.onload = function () {
		const data = JSON.parse(this.response);
		// if user doesn't exist, show error message
		if (data.message === 'Not Found') {
			let noRepos = document.createElement('div');
			noRepos.id = 'theme-text';
			noRepos.classList.add('text-center');
			noRepos.innerHTML = `
          <h5><strong>🤷‍♂️ No repos found for ${username}</strong></h5>
      `;
			console.log(`${username} does not exist`);
			document.getElementById('userRepos').appendChild(noRepos);
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
				let repo = document.createElement('div');
				repo.classList.add('repo');
				repo.innerHTML = `
          <div id="theme-text"><h5><strong>📛 Repo: <br/></strong></h5><p>${data[i].name}</p></div>
          <h5 id="theme-text"><strong>📙 Description: <br/></strong></h5> <p id="theme-text">${data[i].description}</p>
          <h5 id="theme-text"><strong>🔗 URL: <br/></strong></h5> <p id="theme-text"><a href="${data[i].html_url}">${data[i].html_url}</a></p>
          <h5 id="theme-text"><strong>⭐ Stars:</strong> ${data[i].stargazers_count} </h5> 
          <h5 id="theme-text"><strong>🍴 Forks:</strong> ${data[i].forks_count} </h5>
      `;
				document.getElementById('userRepos').appendChild(repo);
			}

			let repos = document.getElementsByClassName('repo');

			// hide all repos but the first
			for (let i = 1; i < repos.length; i++) {
				repos[i].style.display = 'none';
			}

			// show the nav buttons (left and right)
			navButtons.style.display = 'flex';

			let repoCount = 0;
			// when the right button is clicked, hide the current repo and display the next repo
			rightButton.addEventListener('click', () => {
				repos[repoCount].style.display = 'none';
				repoCount++;
				repos[repoCount].style.display = 'block';
			});
			// when the left button is clicked, hide the current repo and display the previous repo
			leftButton.addEventListener('click', () => {
				leftButton.disabled = false;
				repos[repoCount].style.display = 'none';
				repoCount--;
				repos[repoCount].style.display = 'block';
			});
		}
	};

	xhr.send();
}
function toggleTheme() {
	if (flag) {
		document.body.style.background = 'black';
		flag = false;
		heading.style.color = 'white';
		label.style.color = 'white';
		label.style.color = 'white';
		label.innerHTML = '☀️ theme';
	} else {
		document.body.style.background = 'white';
		flag = true;
		heading.style.color = 'black';
		label.style.color = 'black';
		label.innerHTML = '🌙 theme';
	}
}
