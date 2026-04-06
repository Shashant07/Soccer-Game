import React, { Children, createContext, useState } from "react";

const initialState = {
    isPaused: false,
    timer: 0,
    scores: { userGoals: 0, aiGoals: 0 },
    lifelines: 0,
    quizScore: 0
};

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameState, setGameState] = useState(initialState);

    const setQuizScore = () => {
        setGameState((prev) => ({
            ...prev,
            quizScore: prev.quizScore + 1,
        }));
    }

    return (
        <GameContext.Provider value={{ gameState, setGameState, setQuizScore }}>
            {children}
        </GameContext.Provider>
    );
}