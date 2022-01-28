console.log("Before"); //sync - code
// getUser(1, getRepositories);
console.log("After"); //sync - code

getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("\nCommits : ", commits))
  .catch((err) => console.log("Error : ", err.message));

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
