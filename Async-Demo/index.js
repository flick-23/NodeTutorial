console.log("Before"); //sync - code
// getUser(1, getRepositories);
console.log("After"); //sync - code

//promise approach
getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("\nCommits : ", commits))
  .catch((err) => console.log("Error : ", err.message));

//async await
async function displayCommits() {
  const user = await getUser(1);
  const repos = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repos[0]);
  console.log(commits);
}

displayCommits();

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("\nReading a user from the database ....");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("\nCalling github API to get repos..");
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("\nCalling GitHub API to get commits... ");
      resolve(["23 commits"]);
    }, 2000);
  });
}
