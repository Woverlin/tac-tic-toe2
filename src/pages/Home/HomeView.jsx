import React from "react";
import { PLAYERS } from ".";
import TacticItem from "../../components/TacTicItem";
import './Home.scss';
const HomeView = ({ table, player, onClick, winner, reset, mode, setMode, isGameRunning }) => {
    const getWinnerName = (winner) =>  winner === 2 ? 'No one win' : winner === 1 ? 'X win' : 'O win';

    let historyGame = localStorage.getItem('historyGame');
    if (historyGame && Array.isArray(JSON.parse(historyGame))) {
        historyGame = JSON.parse(historyGame)
    }

    return (
        <div className='home'>
            <div className='title'>
                Tac Tic Toe
            </div>
            <div className='table'>
                {table?.map((col, indexCol) => <div key={indexCol} className='table-row'>
                    {col?.map((row, indexRow) =>
                        <TacticItem
                            key={indexCol + indexRow}
                            gribValue={table[indexCol][indexRow]}
                            className={`tactic${indexCol}${indexRow}`}
                            onClick={() => onClick(indexCol, indexRow, player, false)} />)}
                </div>
                )}
                <div className='result-container'>
                    {winner !== -1 ?
                        <div className='result'>
                            {getWinnerName(winner)}
                        </div>
                        : <div className="turn">
                            {player === PLAYERS.ONE ? "X's turn" : "O's turn"}
                        </div>
                    }
                </div>
            </div>
            <div className='game-mode'>
                <div className='game-mode__title'>
                    Mode:
                </div>

                <div >
                    <span>
                        <input onChange={() => !isGameRunning && setMode(0)} checked={mode === 0} type="radio" /> PvP
                    </span>
                    <span>
                        <input onChange={() => !isGameRunning && setMode(1)} type="radio" checked={mode === 1} /> PvC
                    </span>
                </div>
            </div>
            <button className='button-reset' onClick={reset}>
                Reset game
            </button>
            <div className='history-container'>
                <div>
                    Hisotry
                </div>
                {historyGame?.map((item, index) => <div className='history-item' key={index} >
                    <span>
                        Round {index + 1}
                    </span>
                    <span>
                        {getWinnerName(item.winnerId)}
                    </span>
                   
                </div>)}
            </div>

         
        </div>
    );
};
export default HomeView;
