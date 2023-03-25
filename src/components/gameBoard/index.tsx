import React from 'react';

import Rock from '../../assets/rock';
import Paper from '../../assets/paper';
import Scissors from '../../assets/scissors';
import Weapon from '../weapon';

import useGameLoop from '../useGameLoop';

import Modal from '../modal';
import WelcomeModal from '../welcomeModal';
import EndGameModal from '../endGameModal';

import './index.scss';

const GameBoard = () => {
    const {
        userPlay,
        startStopGame,
        weapon,
        timer,
        gameStarted,
        winner,
        round,
        usersScores,
        playerWin,
        init,
    } = useGameLoop();
    const [openModal, setOpenModal] = React.useState(true);
    const [fistStart, setFirstStart] = React.useState(true);

    const closeModal = () => {
        setOpenModal(false)
    }

    const fistStartGame = () => {
        setFirstStart(false)
        setOpenModal(false)
    }

    const newGame = () => {
        init();
        closeModal()
    }

    const handOption = {
        "user": {
            "rock": <Rock width={150} height={150} direction="left" />,
            "paper": <Paper width={150} height={150} direction="left" />,
            "scissors": <Scissors width={150} height={150} direction="left" />
        },
        "ai": {
            "rock": <Rock width={150} height={150} direction="right" />,
            "paper": <Paper width={150} height={150} direction="right" />,
            "scissors": <Scissors width={150} height={150} direction="right" />
        }
    }

    const ModalElement = () => {
        if (fistStart) {
            return <WelcomeModal calback={fistStartGame} />
        } else if (playerWin.user === true || playerWin.ai === true) {
            return <EndGameModal playerWin={playerWin} newGame={newGame} />
        }
        else return null
    }

    const getWinnerColor = (): string => {
        if (winner === "User won") return "win"
        else if (winner === "Ai won") return "lose"
        else return ""
    }

    React.useEffect(() => {
        if (playerWin.user === true || playerWin.ai === true) {
            setOpenModal(true)
        }
    }, [playerWin])
    return (
        <div className='game-board'>
            {openModal &&
                <Modal closeModal={closeModal}>
                    <ModalElement />
                </Modal>
            }
            <div className='game-board-arena'>
                <div className='game-board-arena-round'>
                    <p className='point win'>{usersScores.user}</p>
                    <p>Round {round}</p>
                    <p className='point lose'>{usersScores.ai}</p>
                </div>
                <div className='game-board-arena-infos'>
                    {gameStarted ?
                        <p>{timer}</p>
                        :
                        <p className={getWinnerColor()}>{`${winner}`}</p>}
                </div>
                <div className={`hand user ${!gameStarted ? "slide-from-left" : ""}`}>
                    <Weapon height={150} width={150} type={weapon.user} player="left" />
                </div>
                <div className={`hand ai ${!gameStarted ? "slide-from-right" : ""}`}>
                    <Weapon height={150} width={150} type={weapon.ai} player="right" />
                </div>
            </div>
            <button type='button' className='game-board-start-game-button' onClick={startStopGame} disabled={gameStarted}>start round</button>
            <div className='game-board-weapon-selection'>
                <button className={weapon.user === "rock" ? "weapon-selected" : ""} type='button' onClick={() => userPlay("rock")} disabled={!gameStarted}>
                    <Weapon height={40} width={40} type="rock" player="left" />
                </button>
                <button className={weapon.user === "paper" ? "weapon-selected" : ""} type='button' onClick={() => userPlay("paper")} disabled={!gameStarted}>
                    <Weapon height={40} width={40} type="paper" player="left" />
                </button>
                <button className={weapon.user === "scissors" ? "weapon-selected" : ""} type='button' onClick={() => userPlay("scissors")} disabled={!gameStarted}>
                    <Weapon height={40} width={40} type="scissors" player="left" />
                </button>
            </div>
        </div>
    )
}

export default GameBoard;