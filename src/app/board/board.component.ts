import { Component, OnInit } from '@angular/core';
import { CellEnum } from '../cell/CellEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  private currentPlayer: CellEnum;
  public board: CellEnum[][];
  private isGameOver: boolean;
  public statusMessage;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  get gameOver(): boolean {
    return this.isGameOver;
  }

  newGame() {
    this.board = [];
    for (let row=0; row<3; row++) {
      this.board[row] = [];
      for(let col=0; col<3; col++) {
        this.board[row][col] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.x;
    this.isGameOver = false;
    this.statusMessage = 'Player $(this.currentPlayer) turn';
  }

  move(row: number, col: number): void {
    if(!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      if(this.isDraw()) {
        this.statusMessage = 'It\'s a Draw!';
        this.isGameOver = true;
      }
      else if(this.isWin()) {
          this.statusMessage = 'player $(this.currentPlayer) won!';
          this.isGameOver = true;
      }
      else {
        this.currentPlayer = this.currentPlayer === CellEnum.x ? CellEnum.o : CellEnum.x;
      }
    }
  }

  isDraw(): boolean {
    for(const columns of this.board) {
      for(const col of columns) {
        if(col === CellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): boolean {
    //horizontal
    for(const columns of this.board) {
      if(columns[0] === columns[1] && columns[0] === columns[2] && columns[0] !== CellEnum.EMPTY) {
        return true;
      }
    }
    // vertical
    for(let col=0; col<this.board[0].length; col++) {
      if (this.board[0][col] === this.board[1][col] && this.board[0][0] === this.board[2][col] && this.board[0][col] !== CellEnum.EMPTY) {
        return true;
      }
    }
    // diagonal
    if(this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2] && this.board[0][0] !== CellEnum.EMPTY) {
      return true;
    }
    if(this.board[0][2] === this.board[1][1] && this.board[0][2] == this.board[2][0] && this.board[0][2] !== CellEnum.EMPTY) {
      return true;
    }
    return false;
  }

}
