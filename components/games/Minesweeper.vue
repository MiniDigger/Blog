<template>
  <div>
    <div class="board">
      <div v-for="(row, rowIdx) in revealedBoard" class="board-row">
        <button
          v-for="(cell, cellIdx) in row"
          class="board-cell"
          :data-val="revealedBoard[rowIdx][cellIdx]"
          :disabled="revealedBoard[rowIdx][cellIdx] != HIDDEN"
          @click="clickCell(rowIdx, cellIdx)"
        >
          <template v-if="cell === BOMB"> 💣 </template>
          <template v-else-if="cell === HIDDEN"> ❓ </template>
          <template v-else>
            {{ cell }}
          </template>
        </button>
      </div>
    </div>
    <button @click="revealAll">Reveal all</button>
    <button @click="initBoard(10, 10, 10)">Beginner</button>
    <button @click="initBoard(16, 16, 40)">Intermediate</button>
    <button @click="initBoard(16, 30, 99)">Expert</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "#imports"

const BOMB = -1
const HIDDEN = -2

const board = reactive<Array<Array<number>>>([])
const revealedBoard = reactive<Array<Array<number>>>([])

function initBoard(width: number, height: number, bombs: number) {
  board.splice(0)
  revealedBoard.splice(0)

  // init board
  for (let x = 0; x < width; x++) {
    board.push([])
    revealedBoard.push([])
    for (let y = 0; y < height; y++) {
      board[x].push(0)
      revealedBoard[x].push(HIDDEN)
    }
  }

  // place bombs
  let placed = 0
  while (placed < bombs) {
    const x = randomNumberInRange(0, width - 1)
    const y = randomNumberInRange(0, height - 1)
    if (board[x][y] !== BOMB) {
      board[x][y] = BOMB
      placed++
    }
  }

  // recalc board
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let val = board[x][y]
      if (val === BOMB) continue

      const x1 = board[x - 1]
      if (x1) {
        val += x1[y - 1] === BOMB ? 1 : 0
        val += x1[y] === BOMB ? 1 : 0
        val += x1[y + 1] === BOMB ? 1 : 0
      }

      const x2 = board[x]
      val += x2[y - 1] === BOMB ? 1 : 0
      val += x2[y + 1] === BOMB ? 1 : 0

      const x3 = board[x + 1]
      if (x3) {
        val += x3[y - 1] === BOMB ? 1 : 0
        val += x3[y] === BOMB ? 1 : 0
        val += x3[y + 1] === BOMB ? 1 : 0
      }

      board[x][y] = val
    }
  }
}

function clickCell(row: number, col: number) {
  if (board[row][col] === BOMB) {
    alert("boom")
  }
  revealedBoard[row][col] = board[row][col]
}

function revealAll() {
  for (let x = 0; x < revealedBoard.length; x++) {
    for (let y = 0; y < revealedBoard[x].length; y++) {
      revealedBoard[x][y] = board[x][y]
    }
  }
}

function randomNumberInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

initBoard(10, 10, 20)
</script>

<style scoped>
.board-row {
  display: flex;
}

.board-cell {
  aspect-ratio: 1;
  height: 30px;
  padding: 0;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
}

.board-cell,
.board-cell:disabled {
  background: white;
  border: 1px grey solid;
}

.board-cell:disabled {
  cursor: not-allowed;
}

.board-cell[data-val="1"] {
  color: blue;
}

.board-cell[data-val="2"] {
  color: green;
}

.board-cell[data-val="3"] {
  color: red;
}

.board-cell[data-val="4"] {
  color: darkblue;
}

.board-cell[data-val="5"] {
  color: saddlebrown;
}

.board-cell[data-val="6"] {
  color: cyan;
}

.board-cell[data-val="7"] {
  color: black;
}

.board-cell[data-val="8"] {
  color: grey;
}
</style>
