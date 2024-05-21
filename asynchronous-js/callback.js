//* 2 ---- Callback
console.log('before');
getUser('1', (user) => {
  getUserGithubRepo(user.gitHubUserName, (repos) => {
    console.log('Github Repos: ', repos);
  });
});
console.log('After');

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

/* NOTE: Here we will face a issue which is known as callback hell
Which means call function inside function deep nested function calls
for example:  getUser('1', (user) => {
  getUserGithubRepo(user.gitHubUserName, (repos) => {
    getRepoDetails(repos[0], (details) => {
      Nested callback for getting repository details
    });
  });
});

*To handle this we have Promises, Async/Await, and named functions
*/
