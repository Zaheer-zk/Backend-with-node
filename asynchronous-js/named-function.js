//* 2 ---- named-function
console.log('before');
getUser('1', fetchGithub(user));
console.log('After');

function fetchGithub(user) {
  getUserGithubRepo(user.gitHubUserName, displayRepo(repos));
}

function displayRepo(repos) {
  console.log('Github Repos: ', repos);
  displayDetails(repos[0]);
}

function displayDetails(details) {
  console.log('Details: ', details);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log('Reading user from database...');
    callback({ id: id, gitHubUserName: 'Zaheer--zk' });
  }, 2000);
}

function getUserGithubRepo(username, callback) {
  setTimeout(() => {
    console.log(`Calling Github API with username as ${username}`);
    callback(['repo1', 'repo2', 'repo3']);
  }, 2000);
}
