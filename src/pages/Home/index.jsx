import React, { useState, useEffect } from "react";
import { ROUND } from "../../utils/constant";
import { onCheckWinner } from "../../utils/helper";
import HomeView from "./HomeView";

const Home = () => {
    const initTabel = [new Array(3).fill(-1), new Array(3).fill(-1), new Array(3).fill(-1)];
    const [table, setTable] = useState(initTabel);
    const [round, setRound] = useState(ROUND.ONE)
    const [winner, setWinner] = useState(-1);


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
