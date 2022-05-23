import { GitUser } from "./Gituser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.add();
  };

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites: ')) || [];
  };

  async add(username) {
    try {
      const user = await GitUser.search(username);

      if(user.login === undefined) {
        throw new Error('Usuário não encontrado! ;/');
      };

      this.entries = [user, ...this.entries];
      this.update();
    } catch(error) {
      alert(error.message);
    };
  };
};

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.tbody = this.root.querySelector('tbody');

    this.update();
    this.onadd();
  };

  update() {
    this.deleteAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user img').alt = `${user.name}`;
      row.querySelector('.user a').href = `https://github.com/${user.login}`;
      row.querySelector('.user p').textContent = `${user.name}`;
      row.querySelector('.user span').textContent = `${user.login}`;
      row.querySelector('.repositories').textContent = `${user.public_repos}`;
      row.querySelector('.followers').textContent = `${user.following}`;

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm('Deseja deleta essa linha mesmo?');
        
        if(isOk) {
          this.delete(user);
        }
      };
      this.tbody.append(row);
    });
  };

  onadd() {
    const addButton = document.querySelector('.search button');

    addButton.onclick = () => {
      const { value } = document.querySelector('.search input');

      this.add(value);
    };
  };

  deleteAllTr() {
    this.tbody.querySelectorAll('tr')
    .forEach(tr => tr.remove())
  };

  createRow() {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td class="user">
      <img src="https://github.com/jdeymisson.png" alt="Imagem do perfil do Johnny Deymisson">
      <div>
        <a href="https://github.com/" target="_blank">
          <p>Johnny Deymisson</p>
          <span>/jdeymisson</span>
        </a>
      </div>
      </td>
      <td class="repositories">123</td>
      <td class="followers">223</td>
      <td class="btn-remove">
        <button>Remover</button>
      </td>
    `
    return row;
  };
};