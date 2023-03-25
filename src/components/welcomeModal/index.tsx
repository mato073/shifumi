import React from 'react';
import Rock from '../../assets/rock';
import Paper from '../../assets/paper';
import Scissors from '../../assets/scissors';

type welcomeModal = { calback: () => void }

const WelcomeModal = ({calback}: welcomeModal) => {
    return (
        <>
            <h1 className='modal-content-title'>Rules</h1>
            <div className="modal-content-rules">
                <p><span><Rock width={30} height={30} direction="left" /></span> beats <span><Scissors width={30} height={30} direction="left" /></span> </p>
                <p><span><Scissors width={30} height={30} direction="left" /></span> beats <span><Paper width={30} height={30} direction="left" /></span> </p>
                <p><span><Paper width={30} height={30} direction="left" /></span> beats <span><Rock width={30} height={30} direction="left" /></span> </p>
                <p><span><Rock width={30} height={30} direction="left" /></span> draw <span><Rock width={30} height={30} direction="left" /></span> </p>
                <p>To start a round click on the <span className="modal-content-rules-start-round-button" >start round</span> button</p>
                <p>The winner is the first player to win 3 rounds &#129395;</p>
            </div>
            <button className='modal-content-button' type='button' onClick={calback}>Got it</button>
        </>
    )
}

export default WelcomeModal;