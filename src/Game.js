import React from 'react';
import calculateWinner from './CalculateWinner';
import Board from './Board';
import './index.css';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                cols: Array(9).fill(null),
                rows: Array(9).fill(null)
            }],
            stepNumber: 0,
            nextPlayerIsX: true,
            btnIsPressed: false,
            isSortAscending: false,
            winState: Array(3).fill(null)
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const cols = current.cols.slice();
        const rows = current.rows.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.nextPlayerIsX ? 'X' : 'O';
        cols[history.length] = (i % 3) + 1;
        rows[history.length] = Math.floor(i / 3) + 1;

        this.setState({
            history: history.concat([{
                squares: squares,
                cols: cols,
                rows: rows
            }]),
            stepNumber: history.length,
            nextPlayerIsX: !this.state.nextPlayerIsX,

        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            nextPlayerIsX: (step % 2) === 0,
            btnIsPressed: !this.state.btnIsPressed
        });
    }

    swapSort() {
        this.setState({
            isSortAscending: !this.state.isSortAscending
        });
    }

    identifyWinningSquares(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + " (" + step.cols[move] + "," + step.rows[move] + ")" :
                'Go to game start';

            var boldClass = ""
            if (this.state.btnIsPressed && move == this.state.stepNumber) {
                boldClass = "bold-btn"
                this.state.btnIsPressed = false
            } else {
                boldClass = ""
            }

            return (
                <li key={move}>
                    <button className={boldClass} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        let winSquares = Array(3).fill(null);
        if (winner) {
            status = 'Winner: ' + winner;
            winSquares = this.identifyWinningSquares(current.squares)
        } else if (this.state.stepNumber == 9) {
            status = 'Draw'
        } else {
            status = 'Next player: ' + (this.state.nextPlayerIsX ? 'X' : 'O');
        }

        let sortDescription;
        if (this.state.isSortAscending) {
            sortDescription = 'Sort is Ascending';
        } else {
            sortDescription = 'Sort is Descending';
        }
        let sort = (this.state.isSortAscending ? moves.reverse() : moves);

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winSquares={winSquares}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.swapSort()}>{sortDescription}</button>
                    <ol>{sort}</ol>
                </div>
            </div>
        );
    }
}

export default Game;