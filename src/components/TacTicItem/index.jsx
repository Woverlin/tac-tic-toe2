import React from 'react';
import './TacTicItem.scss'
const TacticItem = ({ table, col, row, round, onClick, className = '' }) => {
    const tableValue = table?.[col]?.[row]
    const value = tableValue === -1 ? null : tableValue === 1 ? 'X' : 'O'
    return (
        <div className={`tac-tic-item ${className}`} onClick={onClick}>
            {value}
        </div>
    )
}

export default TacticItem