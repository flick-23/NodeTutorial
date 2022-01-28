console.log("Before"); //sync - code
const user = getUser(1);
console.log(user);
console.log("After"); //sync - code

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from the database ....");
    return { id: id, gitHubUsername: "mosh" };
  }, 2000);
  return 1;
}
