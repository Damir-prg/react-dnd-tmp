import './styles/App.css';
import {useState} from "react";

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: "Сделать", items: [
        {id: 1, title: "Пойти в магазин"},
        {id: 2, title: "Выкинуть мосур"},
        {id: 3, title: "Почистить зубы"}
      ]},
    {id: 2, title: "Проверить", items: [
        {id: 4, title: "Домашняя работа"},
        {id: 5, title: "Дипломная работа"},
        {id: 6, title: "Посуда"}
      ]},
    {id: 3, title: "Сделано", items: [
        {id: 7, title: "Уборка"},
        {id: 8, title: "Ужин"},
        {id: 9, title: "Запись"}
      ]}
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const [isBoard, setIsBoard] = useState(true)

  function dragOverHandler(e) {
      e.preventDefault();
      if (e.target.className == 'item') {
          e.target.style.boxShadow = '0 2px 3px gray'
          setIsBoard(false)
      }
  }

  function dragLeaveHandler(e) {
      e.target.style.boxShadow = 'none'
      setIsBoard(true)
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
      setCurrentItem(item)
  }

  function dragEndHandler(e) {
      e.target.style.boxShadow = 'none'
      setIsBoard(true)
  }

  function dropHandler(e, board, item) {
      e.preventDefault();
      const currentIndex = currentBoard.items.indexOf(currentItem);
      currentBoard.items.splice(currentIndex, 1);
      const dropIndex = board.items.indexOf(item);
      board.items.splice(dropIndex + 1, 0, currentItem);
      setBoards(boards.map(b => {
          if (b.id === board.id){
              return board
          }
          if (b.id === currentBoard.id){
              return currentBoard
          }
          return b
      }))
  }

  function dropCardHandler(e, board) {
      e.preventDefault();
      if (isBoard) {
          board.items.push(currentItem)
          const currentIndex = currentBoard.items.indexOf(currentItem);
          currentBoard.items.splice(currentIndex, 1);
          setBoards(boards.map(b => {
              if (b.id === board.id){
                  return board
              }
              if (b.id === currentBoard.id){
                  return currentBoard
              }
              return b
          }))
      }
  }

  return (
    <div className="app">
      {boards.map(board =>
          <div
              className="board"
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map(item =>
                <div
                    className="todo"
                    className="item"
                     onDragOver={(e) => dragOverHandler(e)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragStart={(e) => dragStartHandler(e, board, item)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDrop={(e) => dropHandler(e, board, item)}
                     draggable={true}
                >{item.title}</div>)}
          </div>)}
    </div>
  );
}

export default App;
