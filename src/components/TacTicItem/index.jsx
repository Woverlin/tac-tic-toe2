import React from 'react';
import './TacTicItem.scss'
const TacticItem = ({ gridValue, onClick, className = '' }) => {
    const value = gridValue === -1 ? null : gridValue === 1 ? 'X' : 'O'
    return (
        <div className={`tac-tic-item ${className}`} onClick={onClick}>
            {value}
        </div>
    )
}

export default TacticItem