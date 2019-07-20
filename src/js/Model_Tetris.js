const figures = [
  {
    name: 'figure_T',
    firstPos: [[0, 1], [1, 1], [2, 1], [1, 2]],
    secondPos: [[1, 0], [1, 1], [1, 2], [2, 1]],
    thirdPos: [[0, 1], [1, 1], [2, 1], [1, 0]],
    fourthPos: [[1, 0], [1, 1], [1, 2], [0, 1]],
  },
  {
    name: 'figure_Q',
    firstPos: [[1, 0], [0, 1], [1, 1], [0, 0]],
    secondPos: [[1, 0], [0, 1], [1, 1], [0, 0]],
    thirdPos: [[1, 0], [0, 1], [1, 1], [0, 0]],
    fourthPos: [[1, 0], [0, 1], [1, 1], [0, 0]],
  },
  {
    name: 'figure_Z',
    firstPos: [[0, 1], [1, 1], [1, 0], [2, 0]],
    secondPos: [[0, 0], [1, 1], [0, 1], [1, 2]],
    thirdPos: [[0, 1], [1, 1], [1, 0], [2, 0]],
    fourthPos: [[0, 0], [1, 1], [0, 1], [1, 2]],
  },
  {
    name: 'figure_S',
    firstPos: [[0, 0], [1, 1], [1, 0], [2, 1]],
    secondPos: [[1, 0], [1, 1], [0, 1], [0, 2]],
    thirdPos: [[0, 0], [1, 1], [1, 0], [2, 1]],
    fourthPos: [[1, 0], [1, 1], [0, 1], [0, 2]],
  },
  {
    name: 'figure_J',
    firstPos: [[1, 0], [1, 1], [1, 2], [2, 2]],
    secondPos: [[0, 2], [1, 2], [2, 2], [2, 1]],
    thirdPos: [[2, 0], [2, 1], [2, 2], [1, 0]],
    fourthPos: [[0, 1], [1, 0], [0, 0], [2, 0]],
  },
  {
    name: 'figure_L',
    firstPos: [[1, 0], [1, 1], [1, 2], [0, 2]],
    secondPos: [[0, 1], [1, 1], [2, 1], [2, 2]],
    thirdPos: [[1, 0], [1, 1], [1, 2], [2, 0]],
    fourthPos: [[0, 1], [1, 1], [0, 0], [2, 1]],
  },
  {
    name: 'figure_I',
    firstPos: [[1, 0], [1, 1], [1, 2], [1, 3]],
    secondPos: [[0, 1], [1, 1], [2, 1], [3, 1]],
    thirdPos: [[1, 0], [1, 1], [1, 2], [1, 3]],
    fourthPos: [[0, 1], [1, 1], [2, 1], [3, 1]],
  },
];
// Model ответственнен за расчет всех поступающих данных от контроллера и действий юзера. Здесь будут располагаться все методы и свойства которые управляют состоянием внутренних данных приложения
const ModelTetris = (() => {
  let randomCurrentNumber,
    randomNextNumber,
    currentFigure,
    curFigurePositions,
    curPositionIndex = 0;
  const computeCellsAndRows = parent => {
    return {
      cells: parseInt(getComputedStyle(parent).width) / 30,
      rows: parseInt(getComputedStyle(parent).height) / 30,
    };
  };
  const chooseFigure = () => {
    // get random number
    randomNextNumber === undefined
      ? (randomCurrentNumber = Math.floor(Math.random() * 7))
      : (randomCurrentNumber = randomNextNumber);
    randomNextNumber = Math.floor(Math.random() * 7);
    // choose figure from data based on the random number
    currentFigure = Object.assign({}, figures[randomCurrentNumber]);
    curFigurePositions = [
      currentFigure.firstPos,
      currentFigure.secondPos,
      currentFigure.thirdPos,
      currentFigure.fourthPos,
    ];
    return currentFigure;
  };
  const setInitialPosition = () => {
    return curFigurePositions[curPositionIndex];
  };
  const changeLevel = () => {
    curFigurePositions.forEach(item => item.forEach(elem => elem[1]++));
    return curFigurePositions[curPositionIndex];
  };
  const isWayDown = parent => {
    return curFigurePositions[curPositionIndex].every(item => {
      let targetRow = parent.children[item[1] + 1];
      if (targetRow !== undefined) {
        let targetCell = targetRow.children[item[0]];
        return !targetCell.classList.contains('staticCube');
      } else {
        return false;
      }
    });
  };
  return {
    computeCellsAndRows,
    chooseFigure,
    setInitialPosition,
    changeLevel,
    isWayDown,
  };
})();

export default ModelTetris;
