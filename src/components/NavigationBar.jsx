import React from 'react'
import { SCREENS } from '../config/screens';
import { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useGameExit } from '../game/utils/useGameExit.js'
import { ScreenContext } from '../context/ScreenContext';

const screenOrder = [
    SCREENS.LANDING,
    SCREENS.INSTRUCTIONS,
    SCREENS.GAME,
    SCREENS.QUIZ
];

const NavigationBar = () => {
    const { screen, setScreen } = useContext(ScreenContext)
    const currentIndex = screenOrder.indexOf(screen)

    const handleBack = () => {
        if (currentIndex > 0) {
            setScreen(screenOrder[currentIndex - 1]);
        }
    }

    const handleNext = () => {
        if (currentIndex < screenOrder.length - 1) {
            setScreen(screenOrder[currentIndex + 1]);
        }
    }

    const { gameState, setGameState } = useContext(GameContext);

    const togglePause = () => {
        setGameState((s) => ({ ...s, isPaused: !s.isPaused }));
        window.dispatchEvent(new CustomEvent("GAME_TOGGLE_PAUSE"))
    }

    const exitGame = useGameExit();

    return (
        <nav className='navbar navbar-dark bg-dark px-4'>
            <span className='navbar-brand fw-boald'>Soccer Lifeline Game</span>

            <div className='ms-auto d-flex align-items-center gap-3'
                style={{ color: "white" }}

            >
                {screen !== SCREENS.Quiz && (
                    <>


                        {screen !== SCREENS.GAME && (
                            <button onClick={handleBack}
                                disabled={currentIndex <= 0}
                                className='btn btn-outline-light btn-sm'>
                                Back
                            </button>
                        )
                        }
                        <button onClick={handleNext}
                            disabled={currentIndex === -1}
                            className='btn btn-outline-light btn-sm'>
                            Next
                        </button>

                    </>
                )}


                <span className='text-light'>Player</span>
                {screen === SCREENS.QUIZ && (
                    <span>Lifelines: {gameState.lifelines}</span>
                )}

                {screen === SCREENS.GAME && (
                    <button onClick={togglePause}
                        className='btn btn-outline-light btn-sm'>
                        {gameState.isPaused ? "Play" : "Pause"}
                    </button>
                )}

                <button className='btn btn-outline-light btn-sm'
                    onClick={exitGame}>
                    Exit
                </button>
            </div>
        </nav>
    )
}

export default NavigationBar;