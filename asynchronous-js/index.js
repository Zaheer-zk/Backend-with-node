//* 1 ---- Demo
console.log('before');
const user = getUser('1'); // by this we can't access return value as this is
// async code which is not available, So we will get undefined from console
// "User:  undefined"
console.log('User: ', user);
console.log('After');

function getUser(id) {
  setTimeout(() => {
    console.log('Reading user from database...');
    return { id: id, gitHubUserName: 'Zaheer--zk' };
  }, 2000);
}
