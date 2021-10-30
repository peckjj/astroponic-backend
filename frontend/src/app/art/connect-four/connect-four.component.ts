import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {

  private canvas: any;
  private cDiv: HTMLElement | undefined;

  constructor() {
    const d = document.getElementById("canvas");
    if (d !== null) {
      this.cDiv = d;
    }
  }

  ngOnInit(): void {
    const sketch = (s: any) => {

      this.canvas = s;

      s.ROWS = 6;
      s.COLUMNS = 7;
      s.IN_A_ROW = 4;

      s.EMPTY = 0;
      s.PLAYER = 1;
      s.CPU = 2;

      s.PLAYER_IS_CPU = true;
      s.CPU_IS_FIRST = true;

      s.CPU_WIN_BIAS = 10000000000000;
      s.CPU_3_BIAS = 20;
      s.CPU_2_BIAS = 10;

      s.PLAYER_CAN_WIN_BIAS = -10000000;
      s.PLAYER_3_BIAS = -100000;
      s.PLAYER_2_BIAS = -20;

      s.CENTER_BIAS = 10;

      s.CPU_DEPTH = 10;

      s.nodes_explored = 0;
      s.boardImage;

      s.CPU_COLOR;
      s.PLAYER_COLOR;

      s.HEIGHT_ADJUSTER = 0.9;
      s.WIDTH_ADJUSTER = 0.8;

      s.playerSelection;
      s.playerSelected = false;

      s.game_over = false;
      s.turn = s.CPU_IS_FIRST;

      s.preload = () => {
        s.boardImage = s.loadImage('https://raw.githubusercontent.com/peckjj/astroponic-backend/master/frontend/src/assets/board.png');
      };

      s.setup = () => {
        s.CPU_COLOR = s.color(255, 204, 0);
        s.PLAYER_COLOR = s.color(255, 100, 100);

        s.frameRate(10);

        s.createCanvas(this.cDiv?.offsetWidth, this.cDiv?.offsetHeight, 'p2d');
        s.background(0);
        s.CPU_DEPTH = 7;
        s.player = true;

        s.PLAYER_IS_CPU = false;
      };

      s.draw = () => {
        // Main game loop
        if (!s.game_over) {
          if (s.turn) {
            // # CPU moves
            // # cpu_move_random(board)
            // # player_move(board, CPU)
            //cpu_smart_move(board)
            s.cpu_minimax_move(s.board, s.CPU_DEPTH);

            s.game_over = s.check_endgame(s.board, s.CPU);
            if (s.game_over) {
              alert('you lost :(');
              console.log('you lose');
            }
            s.turn = !s.turn;
          }
          else {
            // # Player moves
            s.nodes_explored = 0;
            if (s.PLAYER_IS_CPU) {
              s.temp = s.CPU;
              s.CPU = s.PLAYER;
              s.PLAYER = s.temp;
              s.cpu_minimax_move(s.board, s.CPU_DEPTH);
              s.temp = s.CPU;
              s.CPU = s.PLAYER;
              s.PLAYER = s.temp;

              s.game_over = s.check_endgame(s.board, s.PLAYER);
              if (s.game_over) {
                alert('you win!');
                console.log('you win');
              }

              s.turn = !s.turn;
            }
            else {
              if (s.playerSelected) {
                s.player_move(s.board, s.PLAYER);

                s.game_over = s.check_endgame(s.board, s.PLAYER);
                if (s.game_over) {
                  alert('you win!');
                  console.log('you win');
                }
                s.playerSelected = false;
                s.turn = !s.turn;
              }
            }
          }
        }
        else {
          s.print_board(s.board);
          s.noLoop();
        }
        s.print_board(s.board);
      };

      s.deepCopy = (arr: any) => {
        let newArr = Array(arr.length);
        for (let i = 0; i < newArr.length; i++) {
          newArr[i] = arr[i].slice();
        }
        return newArr;
      };

      s.countElem = (arr: any, val: any) => {
        let counter = 0;
        for (let i = 0; i < arr.length; i++) {
          counter += arr[i] == val ? 1 : 0;
        }
        return counter;
      };

      s.score_board = (board: any) => {
        let score = 0;

        // # Score horizontal
        for (let col = 0; col < s.COLUMNS - (s.IN_A_ROW - 1); col++) {
          for (let row = 0; row < s.ROWS; row++) {
            score += s.score_window((board[row].slice(col, col + s.IN_A_ROW)));
          }
        }

        // # Score vertical
        for (let col = 0; col < s.COLUMNS; col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let win = [];
            for (let i = 0; i < s.IN_A_ROW; i++) {
              win.push(board[row + i][col]);
            }
            score += s.score_window(win);
          }
        }

        // # Score forwardslashers
        for (let col = 0; col < s.COLUMNS - (s.IN_A_ROW - 1); col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let win = [];
            for (let i = 0; i < s.IN_A_ROW; i++) {
              win.push(board[row + i][col + i]);
            }
            score += s.score_window(win);
          }
        }

        // # Score backslashers
        for (let col = s.IN_A_ROW - 1; col < s.COLUMNS; col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let win = [];
            for (let i = 0; i < s.IN_A_ROW; i++) {
              win.push(board[row + i][col - i]);
            }
            score += s.score_window(win);
          }
        }

        if (s.playerCanWin(board)) {
          score += s.PLAYER_CAN_WIN_BIAS;
        }

        return score;
      };

      s.playerCanWin = (board: any) => {
        let moves = s.get_valid_moves(board);

        for (let move of moves) {
          let new_board = s.deepCopy(board);
          s.drop_piece(new_board, move, s.PLAYER);
          if (s.check_endgame(board, s.PLAYER)) {
            return true;
          }
        }
        return false;
      };

      s.score_window = (win: any) => {
        let ai_count = s.countElem(win, s.CPU);
        let player_count = s.countElem(win, s.PLAYER);
        let empty_count = s.countElem(win, s.EMPTY);

        // # AI victory
        if (ai_count == s.IN_A_ROW) {
          return s.CPU_WIN_BIAS;
        }
        // # AI with 3
        else if (ai_count == 3 && empty_count == 1) {
          return s.CPU_3_BIAS;
        }
        // # AI with 2
        else if (ai_count == 2 && empty_count == 2) {
          return s.CPU_2_BIAS;
        }
        // # Player with 3
        else if (player_count == 3 && empty_count == 1) {
          return s.PLAYER_3_BIAS;
        }
        // # Player with 2
        else if (player_count == 2 && empty_count == 2) {
          return s.PLAYER_2_BIAS;
        }
        return 0;
      };

      s.cpu_move_random = (board: any) => {
        s.drop_piece(board, s.random(s.get_valid_moves(board)), s.CPU);
      };

      s.cpu_smart_move = (board: any) => {
        let best_score = -Infinity;
        let moves = s.get_valid_moves(board);
        let best_col = s.random(moves);

        for (let move of moves) {
          let new_board = s.deepCopy(board);
          s.drop_piece(new_board, move, s.CPU);

          let new_board_score = s.score_board(new_board);

          // # Weight center heavier
          if (move == s.floor(s.COLUMNS / 2)) {
            new_board_score += s.CENTER_BIAS;
          }

          if (new_board_score > best_score) {
            best_score = new_board_score;
            best_col = move;
          }
        }
        s.drop_piece(board, best_col, s.CPU);
      };

      s.minimax = (board: any, depth: any, a: any, b: any, isMax: any) => {
        s.nodes_explored += 1;

        if (depth == 0 || s.check_endgame(board, s.CPU) || s.check_endgame(board, s.PLAYER)) {
          return [null, s.score_board(board)];
        }

        if (isMax) {
          let value = -Infinity;
          let moves = s.get_valid_moves(board);
          let best_col = s.random(moves);

          for (let move of moves) {
            let new_board = s.deepCopy(board);
            s.drop_piece(new_board, move, s.CPU);
            let new_board_score = s.minimax(new_board, depth - 1, a, b, false)[1];

            // # Weight center heavier
            if (move == s.floor(s.COLUMNS / 2)) {
              new_board_score += s.CENTER_BIAS;
            }

            if (new_board_score > value) {
              value = new_board_score;
              best_col = move;
            }

            a = s.max(a, value);

            if (a >= b) {
              break;
            }
          }
          return [best_col, value];
        }
        else {
          let value = Infinity;
          let moves = s.get_valid_moves(board);
          let best_col = s.random(moves);

          for (let move of moves) {
            let new_board = s.deepCopy(board);
            s.drop_piece(new_board, move, s.PLAYER);
            let new_board_score = s.minimax(new_board, depth - 1, a, b, true)[1];

            if (new_board_score < value) {
              value = new_board_score;
              best_col = move;
            }

            b = s.min(b, value);

            if (b <= a) {
              break;
            }
          }
          return [best_col, value];
        }
      };

      s.cpu_minimax_move = (board: any, depth: any) => {
        let best_col = s.minimax(board, depth, -Infinity, Infinity, true)[0]

        s.drop_piece(board, best_col, s.CPU);
      };

      s.player_move = (board: any, piece: any) => {
        let col = s.playerSelection;

        s.drop_piece(board, col, piece);
      };

      s.check_endgame = (board: any, piece: any) => {
        // # Check horizontal
        for (let col = 0; col < s.COLUMNS - (s.IN_A_ROW - 1); col++) {
          for (let row = 0; row < s.ROWS; row++) {
            let count = 0;
            for (let i = 0; i < s.IN_A_ROW; i++) {
              if (board[row][col + i] == piece) {
                count += 1;
              }
            }
            if (count == s.IN_A_ROW) {
              return true;
            }
          }
        }

        // # Check vertical
        for (let col = 0; col < s.COLUMNS; col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let count = 0;
            for (let i = 0; i < s.IN_A_ROW; i++) {
              if (board[row + i][col] == piece) {
                count += 1;
              }
            }
            if (count == s.IN_A_ROW) {
              return true;
            }
          }
        }

        // # Check forwardslashers
        for (let col = 0; col < s.COLUMNS - (s.IN_A_ROW - 1); col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let count = 0;
            for (let i = 0; i < s.IN_A_ROW; i++) {
              if (board[row + i][col + i] == piece) {
                count += 1;
              }
            }
            if (count == s.IN_A_ROW) {
              return true;
            }
          }
        }

        // # Check backslashers
        for (let col = s.IN_A_ROW - 1; col < s.COLUMNS; col++) {
          for (let row = 0; row < s.ROWS - (s.IN_A_ROW - 1); row++) {
            let count = 0;
            for (let i = 0; i < s.IN_A_ROW; i++) {
              if (board[row + i][col - i] == piece) {
                count += 1;
              }
            }
            if (count == s.IN_A_ROW) {
              return true;
            }
          }
        }

        // # Check full board
        if (s.get_valid_moves(board).length == 0) {
          return true;
        }

        return false;
      };

      s.get_valid_moves = (board: any) => {
        let valid_moves = [];
        for (let col = 0; col < s.COLUMNS; col++) {
          if (s.is_valid_move(board, col)) {
            valid_moves.push(col);
          }
        }
        return valid_moves;
      };

      s.drop_piece = (board: any, col: any, piece: any) => {
        let row = s.get_next_row(board, col);

        board[row][col] = piece;
      };

      s.get_next_row = (board: any, col: any) => {
        for (let y = 0; y < s.ROWS; y++) {
          if (board[y][col] == 0) {
            return y;
          }
        }
        return -1;
      };

      s.is_valid_move = (board: any, col: any) => {
        return (col >= 0 && col < s.COLUMNS) && board[s.ROWS - 1][col] == 0;
      };

      s.print_board = (board: any) => {
        console.log(' 0 1 2 3 4 5 6');
        console.log();
        console.log(board);
        console.log('nodes explored: ${nodes_explored}');
        s.drawBoard(board);
      };

      s.drawBoard = (board: any) => {
        s.background(0);
        for (let row = 0; row < s.ROWS; row++) {
          for (let col = 0; col < s.COLUMNS; col++) {
            if (board[row][col] == s.PLAYER) {
              s.drawPiece(row, col, s.PLAYER_COLOR);
            }
            else if (board[row][col] == s.CPU) {
              s.drawPiece(row, col, s.CPU_COLOR);
            }
          }
        }
        s.image(s.boardImage, 0, 0, s.width, s.height);
      };

      s.drawPiece = (row: any, col: any, color: any) => {
        s.push();
        s.stroke(color);
        s.fill(color);

        s.ellipse(col * (s.width / s.COLUMNS) + ((s.width / s.COLUMNS) / 2), s.height - (row * (s.height / s.ROWS)) - ((s.height / s.ROWS) / 2), (s.width / s.COLUMNS) * s.WIDTH_ADJUSTER, (s.height / s.ROWS) * s.HEIGHT_ADJUSTER);
      };

      s.create_board = () => {
        let board = Array(s.ROWS);
        for (let i = 0; i < board.length; i++) {
          board[i] = Array(s.COLUMNS);
        }

        for (let row = 0; row < board.length; row++) {
          for (let col = 0; col < board[row].length; col++) {
            board[row][col] = 0;
          }
        }
        return board;
      };

      s.board = s.create_board();

      s.mousePressed = () => {
        s.playerSelected = true;

        s.playerSelection = s.floor(s.mouseX / (s.width / s.COLUMNS));
      };

    }

    let canvas = new p5(sketch, this.cDiv);
  }

  ngOnDestroy() {
    this.canvas.remove();
  }

}
