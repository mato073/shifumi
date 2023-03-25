import React from "react";

type weaponType = "rock" | "paper" | "scissors";

type scores = {
    user: number,
    ai: number
}

const scores: scores = {
    user: 0,
    ai: 0
}

type weaponState = {
    user: weaponType,
    ai: weaponType
}

const weaponState: weaponState = {
    user: 'rock',
    ai: 'rock'
}

type playerWin = {
    user: boolean,
    ai: boolean
}

const playerWin: playerWin = {
    user: false,
    ai: false
}

type defaultState = {
    gameStarted: boolean,
    weapon: weaponState,
    scores: scores,
    userScore: number,
    aiScore: number,
    timer: number,
    winner: string,
    round: number,
    playerWin: playerWin
}

const defaultState: defaultState = {
    gameStarted: false,
    weapon: { user: 'rock', ai: 'rock' },
    scores: { user: 0, ai: 0 },
    userScore: 0,
    aiScore: 0,
    timer: 3,
    winner: "",
    round: 1,
    playerWin: { user: false, ai: false }
};

const WEAPONS = {
    PAPER: 'paper',
    ROCK: 'rock',
    SCISSORS: 'scissors'
};

const winningCombinations = {
    [WEAPONS.PAPER]: WEAPONS.ROCK,
    [WEAPONS.ROCK]: WEAPONS.SCISSORS,
    [WEAPONS.SCISSORS]: WEAPONS.PAPER
};

const useGameLoop = () => {
    const [gameStarted, setGameStarted] = React.useState(defaultState.gameStarted);
    const [weapon, setWeapon] = React.useState<weaponState>(weaponState);
    const [usersScores, setUsersScores] = React.useState<scores>(defaultState.scores);
    const [timer, setTimer] = React.useState<number>(defaultState.timer)
    const [winner, setWinner] = React.useState<string>(defaultState.winner);
    const [round, setRound] = React.useState<number>(defaultState.round);
    const [playerWin, setPlayerWin] = React.useState<playerWin>(defaultState.playerWin);

    const init = () => {
        setGameStarted(defaultState.gameStarted);
        setUsersScores(defaultState.scores);
        setTimer(defaultState.timer);
        setWinner(defaultState.winner);
        setRound(defaultState.round);
        setWeapon(defaultState.weapon)
        setPlayerWin(defaultState.playerWin)
    }

    React.useEffect(() => {
        init();
    }, [])

    const startStopGame = () => {
        setGameStarted(!gameStarted);
    }

    const userPlay = (play: weaponType) => {
        setWeapon((weapon) => ({ ...weapon, user: play }));
    }

    const aiPlay = (): weaponType => {
        const weaponList: weaponType[] = ['rock', 'paper', 'scissors'];
        const played: number = Math.floor(Math.random() * 3);
        const iaWeapon = weaponList[played]
        setWeapon((weapon) => ({ ...weapon, ai: iaWeapon }));
        return iaWeapon;
    }



    const determineWinner = (weapon: weaponState, aiWeapon: weaponType) => {
        if (winningCombinations[weapon.user] === aiWeapon) {
            setUsersScores(usersScores => ({ ...usersScores, user: usersScores.user + 1 }));
            return 'User won';
        } else if (weapon.user === aiWeapon) {
            return 'Draw';
        } else {
            setUsersScores(usersScores => ({ ...usersScores, ai: usersScores.ai + 1 }));
            return 'Ai won';
        }
    }

    React.useEffect(() => {
        if (gameStarted && timer > 0) {
            const interval = setInterval(() => {
                setTimer((timer) => timer - 1);
                if (timer - 1 === 0) {
                    const value = aiPlay();
                    startStopGame();
                    const playerWin = determineWinner(weapon, value);
                    setWinner(playerWin);
                    setRound((round) => round + 1);
                    setTimer(3);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [gameStarted, timer, weapon, usersScores, round]);

    React.useEffect(() => {
        if (usersScores.user === 3 || usersScores.ai === 3)
            setPlayerWin({
                user: usersScores.user === 3,
                ai: usersScores.ai === 3
            })
    }, [usersScores])

    return { userPlay, startStopGame, weapon, timer, gameStarted, winner, round, usersScores, playerWin, init };

}

export default useGameLoop