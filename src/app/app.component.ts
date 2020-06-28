import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mars-Colonization-Program';
  rows = [0, 1, 2];
  columns = [0, 1, 2];
  gridValue : number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  gridContent : string[][] = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "]
  ];
  turn = 0;

  constructor(){
    for(let row = 0; row < 3; row ++){
      for (let col = 0; col < 3; col ++){
        this.gridValue[row][col] = 0;
        this.gridContent[row][col] = " ";
      }
    }
  }

  setValue(row, col){
    if (this.turn == 0){
        this.gridContent[row][col] = "X";
    }
    else{
        this.gridContent[row][col] = "O";
    }
    this.turn = 1 - this.turn;
  }
}




