import React from 'react';
import Rock from '../../assets/rock';
import Paper from '../../assets/paper';
import Scissors from '../../assets/scissors';

type directionType = 'left' | 'right'
type weaponType = {
    rock: JSX.Element
    paper: JSX.Element
    scissors: JSX.Element
}
type weapon = {
    height: number
    width: number
    type: keyof weaponType,
    player: directionType
}

const Weapon = ({ height, width, type, player }: weapon) => {

    const handOption: weaponType = {
        "rock": <Rock width={width} height={height} direction={player} />,
        "paper": <Paper width={width} height={height} direction={player} />,
        "scissors": <Scissors width={width} height={height} direction={player} />
    }

    return (
        <div className={`weapon ${player}`}>
            {handOption[type]}
        </div>
    )
}

export default Weapon