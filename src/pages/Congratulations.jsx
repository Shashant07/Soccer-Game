import React, { useContext } from "react";
import { GameContext } from "../context/GameContext";
import { useGameExit } from "../game/utils/useGameExit.js";
import NavigationBar from "../components/NavigationBar.jsx";

export default function CongratulationsPage() {

    const { gameState, setGameState, setQuizScore } = useContext(GameContext)
    const exitGame = useGameExit();
    return (
        <>
            <NavigationBar />
            <div className="result-page">
                <h1 className="result-title text-success"> Great Job!</h1>
                <p className="result-subtitle">
                    You passed the challenge successfully.
                </p>
                <div className="result-stats">
                    <span> User Goals: {gameState.scores.userGoals}</span>
                    <span>
                        AI Goals: {gameState.scores.aiGoals}</span>
                    <span>
                        Lifelines remaining: {gameState.lifelines}</span>
                    <span>
                        Correct Answers: {gameState.quizScore}</span>
                </div>
                <button className="result-btn primary" onClick={exitGame}>
                    Exit
                </button>
            </div>
        </>

    );
}