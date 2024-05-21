//* Holds an eventual result of an asynchronous operation

const p = new Promise((resolve, reject) => {
  // some async operation
  //*RESOLVE
  setTimeout(() => {
    resolve(1);
  }, 2000);

  //*REJECT
  //   setTimeout(() => {
  //     reject(new Error('message'));
  //   }, 2000);
});

p.then((response) => console.log('resolved: ', response)).catch((error) =>
  console.error(error)
);

//*#### Handling Callback hell with promises  ####*//
console.log('before');
// --- CALLBACK HELL
// getUser('1', (user) => {
//   getUserGithubRepo(user.gitHubUserName, (repos) => {
//     console.log('Github Repos: ', repos);
//   });
// });

// --- PROMISE BASED SOLUTION
const user = getUser('1');
user
  .then((userData) => getUserGithubRepo(userData.gitHubUserName))
  .then((repos) => console.log('Repos: ', repos))
  .catch((err) => {
    console.error(err);
  });

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading user from database...');
      resolve({ id: id, gitHubUserName: 'Zaheer--zk' });
    }, 2000);
  });
}

function getUserGithubRepo(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Calling Github API with username as ${username}`);
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}
