import React, { useContext, useEffect } from "react";
import { GameContext } from "../context/GameContext";
import { quizQuestions } from "../data/quizQuestions.js";
import resolveDifficulty from "../hooks/useQuizDifficulty";
import useQuizLogic from "../hooks/useQuizLogic";
import QuestionCard from "../components/quiz/QuestionCard";
import quizConfig from "../config/quizConfig";
import NavigationBar from "../components/NavigationBar.jsx";
import { ScreenContext } from "../context/ScreenContext.jsx";
import { SCREENS } from "../config/screens.js";

export default function Quiz() {
    const { gameState, setGameState } = useContext(GameContext);
    const { setScreen } = useContext(ScreenContext);
    const difficulty = quizConfig.staticDifficulty;
    const questions = quizQuestions[difficulty];
    const { currentQuestion, currentIndex, score, remaininglifelines,
        total,
        submitAnswer,
        isFinished
    } = useQuizLogic(questions);

    useEffect(() => {
        if (isFinished) {
            const percentage = (score / total) * 100;
            if (percentage >= quizConfig.passingPercentage) {
                setScreen(SCREENS.RESULT_SUCCESS);
                // console.log("cong");
            } else {
                setScreen(SCREENS.RESULT_FAIL);
                // console.log("sorry");
            }
        }
        // console.log(gameState);
    }, [isFinished, score, total, setScreen, gameState.lifelines]);

    return (

        <>
            {/* {console.log(gameState.lifelines)} */}
            <NavigationBar />
            <div className="quiz-page-wrapper">
                <div className="quiz-card">
                    <h4 className="quiz-title">Quiz {difficulty.toUpperCase()}</h4>
                    {currentQuestion && (
                        <QuestionCard
                            question={currentQuestion.question}
                            options={currentQuestion.options}
                            onSubmit={submitAnswer}
                        />
                    )}
                    <div className="quiz-footer">
                        Question {currentIndex + 1} / {total}
                    </div>
                </div>
            </div>
        </>
    );
}