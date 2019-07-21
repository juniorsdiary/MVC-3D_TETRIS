const figures = [
  {
    name: 'figure_T',
    positions: [
      [[0, 1], [1, 1], [2, 1], [1, 2]],
      [[1, 0], [1, 1], [1, 2], [2, 1]],
      [[0, 1], [1, 1], [2, 1], [1, 0]],
      [[1, 0], [1, 1], [1, 2], [0, 1]],
    ],
  },
  {
    name: 'figure_Q',
    positions: [
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
      [[1, 0], [0, 1], [1, 1], [0, 0]],
    ],
  },
  {
    name: 'figure_Z',
    positions: [
      [[0, 1], [1, 1], [1, 0], [2, 0]],
      [[0, 0], [1, 1], [0, 1], [1, 2]],
      [[0, 1], [1, 1], [1, 0], [2, 0]],
      [[0, 0], [1, 1], [0, 1], [1, 2]],
    ],
  },
  {
    name: 'figure_S',
    positions: [
      [[0, 0], [1, 1], [1, 0], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
      [[0, 0], [1, 1], [1, 0], [2, 1]],
      [[1, 0], [1, 1], [0, 1], [0, 2]],
    ],
  },
  {
    name: 'figure_J',
    positions: [
      [[1, 0], [1, 1], [1, 2], [2, 2]],
      [[0, 2], [1, 2], [2, 2], [2, 1]],
      [[2, 0], [2, 1], [2, 2], [1, 0]],
      [[0, 1], [1, 0], [0, 0], [2, 0]],
    ],
  },
  {
    name: 'figure_L',
    positions: [
      [[1, 0], [1, 1], [1, 2], [0, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[1, 0], [1, 1], [1, 2], [2, 0]],
      [[0, 1], [1, 1], [0, 0], [2, 1]],
    ],
  },
  {
    name: 'figure_I',
    positions: [
      [[1, 0], [1, 1], [1, 2], [1, 3]],
      [[0, 1], [1, 1], [2, 1], [3, 1]],
      [[1, 0], [1, 1], [1, 2], [1, 3]],
      [[0, 1], [1, 1], [2, 1], [3, 1]],
    ],
  },
];
// Model ответственнен за расчет всех поступающих данных от контроллера и действий юзера. Здесь будут располагаться все методы и свойства которые управляют состоянием внутренних данных приложения
const ModelTetris = (() => {
  let randomCurrentNumber, randomNextNumber, currentFigure, curPositionIndex, nextFigure;
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
    currentFigure = JSON.parse(JSON.stringify(figures[randomCurrentNumber]));
    nextFigure = JSON.parse(JSON.stringify(figures[randomNextNumber]));
    return {
      currentFigure,
      nextFigure,
    };
  };
  const setInitialPosition = () => {
    curPositionIndex = 0;
    return {
      curInitPosition: currentFigure.positions[curPositionIndex],
      nextInitPositions: nextFigure.positions[curPositionIndex],
    };
  };
  const changeLevel = () => {
    currentFigure.positions.forEach(item => item.forEach(elem => elem[1]++));
    return currentFigure.positions[curPositionIndex];
  };
  const changePositinon = step => {
    currentFigure.positions.forEach(item => item.forEach(elem => (elem[0] += step)));
    return currentFigure.positions[curPositionIndex];
  };
  const checkCubeCoords = (parent, coords, step) => {
    let targetRow = parent.children[coords[1]];
    let targetCell = targetRow.children[coords[0] + step];
    if (targetCell !== undefined) {
      if (targetCell.firstElementChild !== null) {
        let targetCube = targetCell.firstElementChild;
        return !targetCube.classList.contains('staticCube');
      } else {
        return true;
      }
    } else {
      return false;
    }
  };
  const rotateFigure = () => {
    curPositionIndex <= 2 ? curPositionIndex++ : (curPositionIndex = 0);
    return currentFigure.positions[curPositionIndex];
  };
  const isWayDown = parent => {
    return currentFigure.positions[curPositionIndex].some(item => {
      let targetRow = parent.children[item[1] + 1];
      if (targetRow !== undefined) {
        let targetCell = targetRow.children[item[0]];
        if (targetCell.firstElementChild !== null) {
          return targetCell.firstElementChild.classList.contains('staticCube');
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
  };
  const isWayAside = (parent, step) => {
    return currentFigure.positions[curPositionIndex].every(item => checkCubeCoords(parent, item, step));
  };
  const isRotationPossible = parent => {
    let coords = currentFigure.positions[curPositionIndex][1];
    return checkCubeCoords(parent, coords, 1) && checkCubeCoords(parent, coords, -1);
  };
  const countLevelsToErase = () => {
    let nodesLevels = document.querySelectorAll('.row');
    let levelsHTML = Array.from(nodesLevels);
    let levelsToErase = [];
    levelsHTML
      .map(item => Array.from(item.children).every(elem => elem.firstElementChild))
      .forEach((item, i) => (item ? levelsToErase.push(i) : null));
    return levelsToErase;
  };
  return {
    computeCellsAndRows,
    chooseFigure,
    setInitialPosition,
    changeLevel,
    changePositinon,
    rotateFigure,
    isWayDown,
    isWayAside,
    isRotationPossible,
    countLevelsToErase,
  };
})();

export default ModelTetris;
