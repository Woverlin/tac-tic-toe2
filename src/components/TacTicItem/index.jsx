import React from 'react';
import './TacTicItem.scss'
const TacticItem = ({ gribValue, onClick, className = '' }) => {
    const value = gribValue === -1 ? null : gribValue === 1 ? 'X' : 'O'
    return (
        <div className={`tac-tic-item ${className}`} onClick={onClick}>
            {value}
        </div>
    )
}

export default TacticItem