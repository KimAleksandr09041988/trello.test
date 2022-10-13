const boardLists = document.querySelectorAll('.board__list');
const wrapperBtn = document.querySelector('.wrapper__btn');

function createCard() {
  const boardBtn = document.querySelector('.board__btn');
  const boardItemnBtnAdd = document.querySelector('.board__item-btn_action_add');
  const boardItemnBtnCancel = document.querySelector('.board__item-btn_action_cancel');
  const boardTextarea = document.querySelector('.board__textarea');
  const boardForm = document.querySelector('.board__form');

  let value;

  boardBtn.addEventListener('click', () => {
    boardForm.classList.add('board__form_active');
    boardBtn.classList.add('board__btn_disabled');
    boardItemnBtnAdd.classList.add('board__item-btn_disabled');
  })

  boardTextarea.addEventListener('input', (e) => {
    value = e.target.value;

    if (value) {
      boardItemnBtnAdd.classList.remove('board__item-btn_disabled');
    } else {
      boardItemnBtnAdd.classList.add('board__item-btn_disabled');
    }
  })

  boardItemnBtnCancel.addEventListener('click', (e) => {
    e.preventDefault();
    boardTextarea.value = '';
    value = '';
    boardForm.classList.remove('board__form_active');
    boardBtn.classList.remove('board__btn_disabled');
  })

  boardItemnBtnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const newItem = document.createElement('li');
    newItem.classList.add('board__item');
    newItem.draggable = true;
    newItem.textContent = value;
    boardLists[0].append(newItem);

    boardTextarea.value = '';
    value = '';
    boardForm.classList.remove('board__form_active');
    boardBtn.classList.remove('board__btn_disabled');

    dragandDrop();
  })
}

createCard();

function createBoard() {
  const wrapper = document.querySelector('.wrapper');
  const board = document.createElement('div');
  board.classList.add('board');
  board.innerHTML = `
    <span contenteditable="true" class="board__title">Введите название</span>
    <ul class="board__list"></ul> `;

  wrapper.append(board);

  revomeTextTitle();
  dragandDrop();
  removeBoard()
}

// доработать...спросить у стаса)
function removeBoard() {
  const boards = document.querySelectorAll('.board');
  for (let k = 1; k < boards.length; k++) {
    let board = boards[k];
    board.addEventListener('dblclick', function (e) {
      if (e.target === e.currentTarget)
        this.remove();
    });
  }
}

wrapperBtn.addEventListener('click', createBoard);

function revomeTextTitle() {
  const boardTitles = document.querySelectorAll('.board__title');

  boardTitles.forEach(boardTitle => {
    boardTitle.addEventListener('click', e => e.target.textContent = '');
  })
}

revomeTextTitle();

let draggedItem = null;

function dragandDrop() {
  const boardItems = document.querySelectorAll('.board__item');
  const boardLists = document.querySelectorAll('.board__list');

  for (let i = 0; i < boardItems.length; i++) {
    const boardItem = boardItems[i];

    boardItem.addEventListener('dragstart', () => {
      draggedItem = boardItem;
      setTimeout(() => {
        boardItem.classList.add('board__item_disabled');
      }, 0)
    });

    boardItem.addEventListener('dragend', () => {
      setTimeout(() => {
        boardItem.classList.remove('board__item_disabled');
        draggedItem = null;
      }, 0)
    });

    boardItem.addEventListener('dblclick', () => {
      boardItem.remove();
    });


    for (let j = 0; j < boardLists.length; j++) {
      const boardList = boardLists[j];

      boardList.addEventListener('dragover', e => e.preventDefault());

      boardList.addEventListener('dragenter', function (e) {
        e.preventDefault();
        this.classList.add('board__list_style');
      })

      boardList.addEventListener('dragleave', function (e) {
        this.classList.remove('board__list_style');
      })

      boardList.addEventListener('drop', function (e) {
        this.classList.remove('board__list_style');
        this.append(draggedItem);
      })

    }
  }
};

dragandDrop();
