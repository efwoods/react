import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
//     <div>
//     <div className="board-row">
//         {this.renderSquare(0)}
//         {this.renderSquare(1)}
//         {this.renderSquare(2)}
//     </div>
//     <div className="board-row">
//         {this.renderSquare(3)}
//         {this.renderSquare(4)}
//         {this.renderSquare(5)}
//     </div>
//     <div className="board-row">
//         {this.renderSquare(6)}
//         {this.renderSquare(7)}
//         {this.renderSquare(8)}
//     </div>
// </div>
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }
    renderColumns(props) {
        const elements = [0, 1, 2];
        const items = []

        for (const [index, value] of elements.entries()) {
            items.push(this.renderSquare(props.value + value));
        }

        return (
            <div className="board-row">
                {items}
            </div>
        );

    }
    renderBoardByRows() {
        const elements = [0,1,2];
        const items = []

        for (const [index, value] of elements.entries()) {
            items.push(this.renderColumns(value));
        }

        return (
            <>
                {items}
            </>
        )
    }


    render() {
        return (
          <div>
            {this.renderBoardByRows()}
          </div>  
        );
    }
}

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
            squareNumberToRender: 0
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
                    <button className={boldClass} onClick={() => this.jumpTo(move)}>{desc}{move}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.nextPlayerIsX ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        squareNumberToRender={this.state.squareNumberToRender}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
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
            return squares[a];
        }
    }
    return null;
}