export class GitUser {
  static search(username) {
    const endpoid = `https://api.github.com/users/${username}`;

    return fetch(endpoid)
           .then(data => data.json())
           .then(({ login, name, public_repos, followers }) => ({
             login,
             name,
             public_repos,
             followers
           }));
  };
};