console.log("Before"); //sync - code
getUser(1, getRepositories);
console.log("After"); //sync - code

function getRepositories(user) {
  getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos) {
  getCommits(repo, displayCommits);
}

function displayCommits(commits) {
  console.log("Comits: ", commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from the database ....");
    callback({ id: id, gitHubUsername: "mosh" });
  }, 2000);
  return 1;
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("\nCalling github API");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(callback) {
  setTimeout(() => {
    console.log("\nCalling GitHub API . . . ");
    callback("23 commits");
  }, 2000);
}
