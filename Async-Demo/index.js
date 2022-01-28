console.log("Before"); //sync - code
getUser(1, function (user) {
  console.log("User : ", user);

  getRepositories(user.gitHubUsername, (repos) => {
    console.log("Repos : ", repos);
  });
});

console.log("After"); //sync - code

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
