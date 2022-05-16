import { createMachine, assign } from 'xstate';

const WINNING_CELLS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

type Player = 'x' | 'o';
type Cell = 'x' | 'o' | ' ';
interface Context {
  currentPlayer: Player;
  cells: Cell[];
  winner: Player | null;
}

const findWinningRow = (context: Context) => {
  return WINNING_CELLS.find((winningRows) => {
    const firstIndex = winningRows[0];
    const firstValue = context.cells[firstIndex];
    if (firstValue === ' ') {
      return false;
    }
    const didWin = winningRows.every((index) => context.cells[index] === firstValue);
    return didWin;
  });
};

const TicTacToeMachine = createMachine<Context>(
  {
    context: {
      currentPlayer: 'x',
      winner: null,
      cells: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    },
    id: 'TicTacToeMachine',
    initial: 'playing',
    states: {
      playing: {
        always: [
          {
            cond: 'checkSomeoneWon',
            actions: 'decideWinner',
            target: 'finished'
          },
          {
            cond: 'checkDraw',
            actions: assign({
              winner: (context) => null
            }),
            target: 'draw'
          }
        ],
        on: {
          click: {
            cond: 'isValidClick',
            actions: assign({
              cells: (context, event) => {
                const updateCell = [...context.cells];
                updateCell[event.clickedCell] = context.currentPlayer;
                return updateCell;
              },
              currentPlayer: (context) => {
                if (context.currentPlayer === 'x') {
                  return 'o';
                } else {
                  return 'x';
                }
              }
            })
          },
          RESET: {
            target: 'playing',
            actions: assign({
              cells: (context) => [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
            })
          }
        }
      },
      finished: {},
      draw: {}
    }
  },
  {
    actions: {
      decideWinner: assign({
        winner: (context) => {
          const winningRow = findWinningRow(context);
          const winningPlayer = context.cells[winningRow[2]] as Player;
          return winningPlayer;
        }
      })
    },
    guards: {
      checkSomeoneWon: (context) => {
        const winningRow = WINNING_CELLS.find((winningRows) => {
          const firstIndex = winningRows[0];
          const firstValue = context.cells[firstIndex];
          if (firstValue === ' ') {
            return false;
          }
          const didWin = winningRows.every((index) => context.cells[index] === firstValue);
          return didWin;
        });

        return winningRow !== undefined;
      },
      checkDraw: (context) => {
        let hasEmptyCell = false;
        for (let i = 0; i < context.cells.length; i++) {
          if (context.cells[i] == ' ') {
            hasEmptyCell = true;
          }
        }

        return hasEmptyCell === false;
      },
      isValidClick: (context, event) => {
        const cellIndex = event.clickedCell;
        return context.cells[cellIndex] == ' ';
      }
    }
  }
);

export default TicTacToeMachine;
