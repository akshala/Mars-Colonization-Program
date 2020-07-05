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
  private myBoard: CellEnum[][];
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
    this.myBoard = [];
    for (let row=0; row<3; row++) {
      this.board[row] = [];
      this.myBoard[row] = [];
      for(let col=0; col<3; col++) {
        this.board[row][col] = CellEnum.EMPTY;
        this.myBoard[row][col] = CellEnum.EMPTY;
      }
    }
    this.currentPlayer = CellEnum.x;
    this.isGameOver = false;
    // this.statusMessage = 'Player ' + this.currentPlayer + ' turn';
  }

  move(row: number, col: number): void {
    if(!this.isGameOver && this.board[row][col] === CellEnum.EMPTY) {
      this.board[row][col] = this.currentPlayer;
      this.myBoard[row][col] = this.currentPlayer;
      if(this.isDraw()) {
        this.statusMessage = 'It\'s a Draw!';
        this.isGameOver = true;
        return;
      }
      else if(this.isWin() === 'You') {
          this.statusMessage = 'You won!';
          this.isGameOver = true;
          return;
      }
      else if(this.isWin() === 'Computer') {
        this.statusMessage = 'You lose!';
        this.isGameOver = true;
        return;
    }
      else {
        //this.currentPlayer = this.currentPlayer === CellEnum.x ? CellEnum.o : CellEnum.x;
        let robot = this.currentPlayer === CellEnum.x ? CellEnum.o : CellEnum.x;
        this.AImove(robot, 3);
        if (this.isWin() === 'Computer') {
          this.statusMessage = 'You lose!';
          this.isGameOver = true;
          return;
        }
      }
    }
    
  }

  isDraw(): boolean {
    for(const columns of this.myBoard) {
      for(const col of columns) {
        if(col === CellEnum.EMPTY) {
          return false;
        }
      }
    }
    return !this.isWin();
  }

  isWin(): string {
    //horizontal
    if(this.playerWon(CellEnum.x)) {
        return 'You';
    }  
    if(this.playerWon(CellEnum.o)) {
        return 'Computer';
    }
    return ''
  }

  playerWon(player: CellEnum): boolean{
    // horizontal
    for(const columns of this.myBoard) {
      if(columns[0] === columns[1] && columns[0] === columns[2] && columns[0] === player) {
        return true;
      }
    }
    // vertical
    for(let col=0; col<this.myBoard[0].length; col++) {
      if (this.myBoard[0][col] === this.myBoard[1][col] && this.myBoard[0][0] === this.myBoard[2][col] && this.myBoard[0][col] === player) {
        return true;
      }
    }
    // diagonal
    if(this.myBoard[0][0] === this.myBoard[1][1] && this.myBoard[0][0] === this.myBoard[2][2] && this.myBoard[0][0] === player) {
      return true;
    }
    if(this.myBoard[0][2] === this.myBoard[1][1] && this.myBoard[0][2] == this.myBoard[2][0] && this.myBoard[0][2] === player) {
      return true;
    }
    return false;
  }

  shuffle(array: number[][]): void{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  AImove(player: CellEnum, difficulty: number) : void{
    var cells: number[][] = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    this.shuffle(cells);
    var depths: number[] = [2,4,6,1000];

    if(player === CellEnum.x){
      var r: number = -1;
      var c: number = -1;
      var best: number = -10;
      for(const points of cells){
        let x = points[0];
        let y = points[1];
        if(this.myBoard[x][y] !== CellEnum.EMPTY){
          continue;
        }
        this.myBoard[x][y] = CellEnum.x;
        let temp = this.getScore(CellEnum.o, depths[difficulty]);
        this.myBoard[x][y] = CellEnum.EMPTY;
        if(temp>best){
          best = temp;
          r = x;
          c = y;
        }
      }
    }else{
      var r: number = -1;
      var c: number = -1;
      var best: number = 10;
      for(const points of cells){
        let x = points[0];
        let y = points[1];
        if(this.myBoard[x][y] !== CellEnum.EMPTY){
          continue;
        }
        this.myBoard[x][y] = CellEnum.o;
        let temp = this.getScore(CellEnum.x, depths[difficulty]);
        this.myBoard[x][y] = CellEnum.EMPTY;
        if(temp<best){
          best = temp;
          r = x;
          c = y;
        }
      }
    }
    this.board[r][c] = player;
    this.myBoard[r][c] = player;
  }

  getScore(player : CellEnum,  depth: number): number {
    if(this.isDraw()){
        return 0;
    }
    if(this.playerWon(CellEnum.x)){
      return 1;
    }
    if(this.playerWon(CellEnum.o)){
      return -1;
    }

    if(player===CellEnum.x){
      if(depth===0)
        return -10;
      //maximizing 
      var best:number = -10;
      for(let row = 0; row<3; row++){
        for(let col = 0; col<3; col++){
          if(this.myBoard[row][col]===CellEnum.EMPTY){
            this.myBoard[row][col] = CellEnum.x;
            best = Math.max(this.getScore(CellEnum.o, depth-1), best);
            this.myBoard[row][col] = CellEnum.EMPTY;
          }
        }

      }
      return best;
    }else{
      if(depth===0)
        return 10;
      //maximizing 
      var best:number = 10;
      for(let row = 0; row < 3; row++){
        for(let col = 0; col < 3; col++){
          if(this.myBoard[row][col]===CellEnum.EMPTY){
            this.myBoard[row][col] = CellEnum.o;
            best = Math.min(this.getScore(CellEnum.x, depth-1), best);
            this.myBoard[row][col] = CellEnum.EMPTY;
          }
        }

      }
      return best;
    }
  }

}
