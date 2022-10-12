const lists = document.querySelectorAll('.board__list');
const button = document.querySelector('.wrapper__btn');

function addTask() {
  const addBtn = document.querySelector('.board__btn');
  const addItemBtn = document.querySelector('.board__item-btn_action_add');
  const cancelItemBtn = document.querySelector('.board__item-btn_action_cancel');
  const textarea = document.querySelector('.board__textarea');
  const form = document.querySelector('.board__form');

  let value;

  addBtn.addEventListener('click', () => {
    form.style.display = 'block';
    addBtn.style.display = 'none';
    addItemBtn.style.display = 'none';
  })

  textarea.addEventListener('input', (e) => {
    value = e.target.value;

    if (value) {
      addItemBtn.style.display = 'block';
    } else {
      addItemBtn.style.display = 'none';
    }
  })

  cancelItemBtn.addEventListener('click', (e) => {
    e.preventDefault();
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    addBtn.style.display = 'flex';
  })

  addItemBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newItem = document.createElement('li');
    newItem.classList.add('board__item');
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);

    textarea.value = '';
    value = '';
    form.style.display = 'none';
    addBtn.style.display = 'flex';

    dragnDrop();
  })
}

addTask();

function addBoard() {
  const boards = document.querySelector('.wrapper');
  const board = document.createElement('div');
  board.classList.add('board');
  board.innerHTML = `
    <span contenteditable="true" class="board__title">Введите название</span>
    <ul class="board__list"></ul> `;

  boards.append(board);

  changeTitle();
  dragnDrop();
  removeBoard()
}

function removeBoard() {
  const boardItems = document.querySelectorAll('.board');
  for (let k = 1; k < boardItems.length; k++) {
    let boardItem = boardItems[k];
    boardItem.addEventListener('dblclick', () => {
      boardItem.remove();
    });
  }
}



button.addEventListener('click', addBoard);

function changeTitle() {
  const titles = document.querySelectorAll('.board__title');

  titles.forEach(title => {
    title.addEventListener('click', e => e.target.textContent = '');
  })
}

changeTitle();

let draggedItem = null;

function dragnDrop() {
  const listItems = document.querySelectorAll('.board__item');
  const lists = document.querySelectorAll('.board__list');

  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener('dragstart', () => {
      draggedItem = item;
      setTimeout(() => {
        item.style.display = 'none';
      }, 0)
    });

    item.addEventListener('dragend', () => {
      setTimeout(() => {
        item.style.display = 'block';
        draggedItem = null;
      }, 0)
    });

    item.addEventListener('dblclick', () => {
      item.remove();
    });


    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener('dragover', e => e.preventDefault());

      list.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, .3)';
      })

      list.addEventListener('dragleave', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      })

      list.addEventListener('drop', function (e) {
        this.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        this.append(draggedItem);
      })

    }
  }
};

dragnDrop();
