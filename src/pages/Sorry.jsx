import React, { useContext } from "react";
import { useGameExit } from "../game/utils/useGameExit.js";
import { GameContext } from "../context/GameContext.jsx";
import NavigationBar from "../components/NavigationBar.jsx";

export default function Sorry() {
    const { gameState, setGameState, setQuizScore } = useContext(GameContext);
    const exitGame = useGameExit();
    return (
        <>
            <NavigationBar />
            <div className="result-page">
                <h1 className="result-title text-danger"> Try Again</h1>
                <p className="result-subtitle">
                    You didn't reach the required score this time.
                </p>
                <div className="result-stats">
                    <span> User Goals: {gameState.scores.userGoals}</span>
                    <span> AI Goals: {gameState.scores.aiGoals}</span>
                    <span>❤ Lifelines remaining: {gameState.lifelines}</span>
                    <span> Correct Answers: {gameState.quizScore}</span>
                </div>
                <button className="result-btn warning" onClick={exitGame}>
                    Exit
                </button>
            </div>
        </>
    )
}