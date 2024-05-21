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

//* #### PROMISES #### *//

const user = getUser('1');
user
  .then((userData) => getUserGithubRepo(userData.gitHubUserName))
  .then((repos) => console.log('Repos: ', repos))
  .catch((err) => {
    console.error(err);
  });
