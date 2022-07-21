import React from "react";
import Square from "./Square";
class Board extends React.Component {
    renderSquare(i, whichClass) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                className={whichClass}
            />
        );
    }

    render() {
        const cols = Array(3).fill("")

        const row = (rowOffset) => cols.map((elem, squareNumber) => {
            return (
                <React.Fragment key={squareNumber}>
                    {(squareNumber + rowOffset) === this.props.winSquares[0] ? this.renderSquare((squareNumber + rowOffset), "winSquare") :
                        (squareNumber + rowOffset) === this.props.winSquares[1] ? this.renderSquare((squareNumber + rowOffset), "winSquare") :
                            (squareNumber + rowOffset) === this.props.winSquares[2] ? this.renderSquare((squareNumber + rowOffset), "winSquare") :
                                this.renderSquare((squareNumber + rowOffset), "square")}
                </React.Fragment>
            )
        })

        const rows = Array(3).fill("")
        const board = rows.map((elem, rowNumber) => {
            return (
                <div className="board-row" key={rowNumber}>
                    {row(rowNumber * rows.length)}
                </div>
            )
        })
        return (
            <div>
                {board}
            </div>
        )
    }
}
export default Board;