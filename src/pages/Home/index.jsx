import React, { useState } from "react";
import HomeView from "./HomeView";

export const ROUND = {
    ONE: 1,
    TWO: 0,
};
const Home = () => {
    const initTabel = [new Array(3).fill(-1), new Array(3).fill(-1), new Array(3).fill(-1)];
    const [table, setTable] = useState(initTabel);
    const [round, setRound] = useState(ROUND.ONE)
    const [winner, setWinner] = useState(-1);

    const onCheckWinner = () => {
        const diagonals = checkDiagonals();
        const winer = checkVerticalsAndHorizontals();

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


    const checkDiagonals = () => {
        if (
            (table[0][0] === round && table[1][1] === round && table[2][2] === round) ||
            (table[0][2] === round && table[1][1] === round && table[2][0] === round)
        ) {
            return round;
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

    const checkVerticalsAndHorizontals = () => {
        for (let i = 0; i <= 2; i++) {
            if (
                (table[0][i] === round && table[1][i] === round && table[2][i] === round) ||
                (table[i][0] === round && table[i][1] === round && table[i][2] === round)
            ) {
                return round;
            }
        }
        return -1;
    };

    const onClick = (col, row) => {
        if (table[col][row] !== -1 || winner !== -1) return null;
        table[col][row] = round;

        setRound(round === ROUND.TWO ? ROUND.ONE : ROUND.TWO)
        setTable([...table])
        setWinner(onCheckWinner(table, round))
    }

    const reset = () => {
        setTable(initTabel);
        setWinner(-1);
        setRound(ROUND.ONE)
    }

    return <HomeView {...{ table, round, onClick, reset, winner }} />;
};
export default Home;
