//*#### Handling Callback hell with async-await  ####*//
console.log('before');
// --- CALLBACK HELL
// getUser('1', (user) => {
//   getUserGithubRepo(user.gitHubUserName, (repos) => {
//     console.log('Github Repos: ', repos);
//   });
// });

//* #### ASYNC-AWAIT #### *//

(async function () {
  try {
    const user = await getUser('1');
    const repos = await getUserGithubRepo(user.gitHubUserName);
    console.log('Repos: ', repos);
  } catch (error) {
    console.error(error);
  }
})();

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
