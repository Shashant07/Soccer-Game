import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

export default function useQuizLogic(questions) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const { gameState, setGameState, setQuizScore } = useContext(GameContext);

    const currentQuestion = questions[currentIndex];

    const submitAnswer = (selected) => {
        if (selected === currentQuestion.answer) {
            setQuizScore();
            setCurrentIndex((i) => i + 1);

        } else {
            if (gameState.lifelines > 0) {
                setGameState((s) => ({
                    ...s, lifelines: gameState.lifelines - 1
                }))
            } else {
                setCurrentIndex((i) => i + 1);
            }
        }
    }

    return {
        currentQuestion,
        currentIndex,
        score: gameState.quizScore,
        lifelines: gameState.lifelines,
        total: questions.length,
        submitAnswer,
        isFinished: currentIndex >= questions.length,
    };
}