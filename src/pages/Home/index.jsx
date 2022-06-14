import React, { useState, useEffect } from "react";
import HomeView from "./HomeView";

export const PLAYERS = {
    ONE: 1,
    TWO: 0,
};
const Home = () => {
    const initTabel = [new Array(3).fill(-1), new Array(3).fill(-1), new Array(3).fill(-1)];
    const [table, setTable] = useState(initTabel);
    const [player, setPlayer] = useState(PLAYERS.ONE)
    const [winner, setWinner] = useState(-1);
    const [mode, setMode] = useState(0);
    const [isGameRunning, setIsGameRunning] = useState(false)

    useEffect(() => {
        resumeGame()
    }, [])

    const resumeGame = () => {
        const persistData = localStorage.getItem('tableData');
        const player = localStorage.getItem('player');
        const mode = localStorage.getItem('mode');

        if (persistData && Array.isArray(JSON.parse(persistData))) {
            setTable(JSON.parse(persistData))
        }
        if (player !== null) setPlayer(+player);
        setMode(+mode)
    }

    const onCheckWinner = (player) => {
        const diagonals = checkDiagonals(player);
        const winer = checkVerticalsAndHorizontals(player);

        if (diagonals !== -1) {
            return diagonals;
        }

        if (winer !== -1) {
            return winer;
        }

        if (checkNoOneWin()) {
            return 2;
        }
        return -1
    };

    const checkDiagonals = (player) => {
        if (
            (table[0][0] === player && table[1][1] === player && table[2][2] === player) ||
            (table[0][2] === player && table[1][1] === player && table[2][0] === player)
        ) {
            return player;
        }
        return -1;
    };

    const checkNoOneWin = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (table[i][j] === -1) {
                    return false;
                }
            }
        }
        return true;
    };

    const checkVerticalsAndHorizontals = (player) => {
        for (let i = 0; i <= 2; i++) {
            if (
                (table[0][i] === player && table[1][i] === player && table[2][i] === player) ||
                (table[i][0] === player && table[i][1] === player && table[i][2] === player)
            ) {
                return player;
            }
        }
        return -1;
    };

    const changePlayer = (currentPlayer) => {
        const nextPlayer = currentPlayer === PLAYERS.TWO ? PLAYERS.ONE : PLAYERS.TWO;
        setPlayer(nextPlayer);
        localStorage.setItem("player", nextPlayer.toString());
    }

    const resetTable = () => {
        setIsGameRunning(false);
        localStorage.removeItem("player");
        localStorage.removeItem("tableData");
    }

    const ComputerCheck = (player) => {
        let col = 0;
        let row = 0;
        do {
            col = Math.floor(Math.random() * 3);
            row = Math.floor(Math.random() * 3);
        }
        while (table[col][row] !== -1);
        onClick(col, row, player, true)
    }

    const saveWinner = (winner) => {
        let historyGame = localStorage.getItem("historyGame");
        if (historyGame && Array.isArray(JSON.parse(historyGame))) {
            historyGame = JSON.parse(historyGame)
        }
        historyGame.push({ winnerId: winner });
        localStorage.setItem('historyGame', JSON.stringify(historyGame))
    }

    const onClick = (col, row, player, isComputor = false) => {
        if (table[col][row] !== -1 || winner !== -1) return null;
        setIsGameRunning(true)
        table[col][row] = player;
        setTable([...table])
        const newWinner = onCheckWinner(player)
        if (newWinner !== -1) {
            resetTable();
            saveWinner(newWinner)
            return setWinner(newWinner);
        }
        changePlayer(player);
        localStorage.setItem('tableData', JSON.stringify(table))
        localStorage.setItem('mode', mode.toString());
        
        if (!isComputor && mode === 1 && newWinner === -1) {
            const nextPlayer = player === PLAYERS.TWO ? PLAYERS.ONE : PLAYERS.TWO;
            ComputerCheck(nextPlayer)
        }
    }

    const reset = () => {
        setTable(initTabel);
        setWinner(-1);
        setPlayer(PLAYERS.ONE);
        resetTable()
    }

    return <HomeView {...{ table, player, onClick, reset, winner, mode, setMode, isGameRunning }} />;
};
export default Home;
