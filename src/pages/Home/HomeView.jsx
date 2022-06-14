import React from "react";
import TacticItem from "../../components/TacTicItem";
import './Home.scss';
const HomeView = ({ table, round, onClick, winner, reset }) => {
    const winnerName = winner === 2 ? 'No one win' : winner === 1 ? 'X win' : 'O win'
    return (
        <div className='home'>
            <div className='table'>
                {table?.map((col, indexCol) => <div key={indexCol} className='table-row'>
                    {col?.map((row, indexRow) =>
                        <TacticItem key={indexCol + indexRow} onClick={() => onClick(indexCol, indexRow)} row={indexRow} col={indexCol} {...{ round, table }} />)}
                </div>
                )}
                {winner !== -1 &&
                    <div className='result'>
                        {winnerName}
                    </div>
                }
                <button onClick={reset}>
                    Reset game 
                </button>
            </div>
        </div>
    );
};
export default HomeView;
