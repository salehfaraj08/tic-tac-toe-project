import React, { useEffect, useState } from "react";

import BoardGame from "./boardgame";



const Game = () => {
    const [historyBoardState, setHistoryBoardState] = useState([Array(9).fill('')]);
    const [stepNumber, setStepNumber] = useState(0);
    const [turn, setTurn] = useState('x');
    const [turnsHistory, setTurnsHistory] = useState([]);
    const [winner, setWinner] = useState('');
    const xOro = turn !== 'x' ? "x" : "o";

    const isWinner = (checkboard) => {
        const winOptions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        for (let i = 0; i < winOptions.length; i++) {
            const [a, b, c] = winOptions[i];
            if (checkboard[a] && checkboard[a] === checkboard[b] && checkboard[a] === checkboard[c]) {
                return checkboard[a];
            }
        }
        return null;
    }
    useEffect(() => {
        setWinner(isWinner(historyBoardState[stepNumber]));
    },[historyBoardState,stepNumber]);
    const handleClick = (i) => {
        const historyPoint = historyBoardState.slice(0, stepNumber + 1);
        const current = historyPoint[stepNumber];
        let shapes=[];
        shapes.push(...current);
        console.log(historyPoint);
        if (winner || shapes[i]) return;
        shapes[i] = xOro;
        setHistoryBoardState([...historyPoint, shapes]);
        setStepNumber(historyPoint.length);
        setTurnsHistory([...turnsHistory, turn]);
        setTurn(turn === 'x' ? 'o' : 'x');
    };

    const goTo = (step) => {
        setStepNumber(step);
        setTurn(turnsHistory[step]);
    };

    const handleMove = () =>
        historyBoardState.map((_, move) => {
            return (
                <li key={move}>
                    <input type='button' onClick={() => goTo(move)} value={move ? `Go to move #${move}` : "Go to Start"}/>
                </li>
            );
        });

    return (
        <>
            <h1>Tic Tac Toe</h1>
            <BoardGame shapes={historyBoardState[stepNumber]} onClick={handleClick} />
            <div className="history">
                <div>
                    <h3>History</h3>
                    {handleMove()}
                </div>
                <h3>{winner ? "Winner: " + winner : "Next Player: " + xOro}</h3>
            </div>
        </>
    );

}

export default Game;
