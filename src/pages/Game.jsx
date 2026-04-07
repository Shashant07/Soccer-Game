import React, { useEffect, useRef, useContext } from "react";
import PhaserGame from "../game/PhserGame.js";
import { GameContext } from "../context/GameContext";
// import lifelineConfig from "../config/lifelineConfig.js";
import { SCREENS } from "../config/constants.js";
import NavigationBar from "../components/NavigationBar.jsx";
import { ScreenContext } from "../context/ScreenContext.jsx";

export default function Game() {
    const { gameState, setGameState } = useContext(GameContext);
    const { setScreen } = useContext(ScreenContext);
    const phaserRef = useRef(null);
    useEffect(() => {
        phaserRef.current = PhaserGame(
            "phaser-container",
            ({ userGoals, aiGoals }) => {
                setGameState((prev) => {
                    const lifelines = userGoals;
                    // userGoals > aiGoals? Math.min(userGoals aiGoals, 5): 0;
                    return {
                        ...prev,
                        scores: {
                            userGoals,
                            aiGoals,
                        },
                        lifelines,
                    };
                });

                // console.log(gameState);

                // props.onNext();

                setScreen(SCREENS.QUIZ);
            }
        );
        return () => {
            phaserRef.current?.destroy(true);
        };

    }, [setScreen, setGameState]);

    return (
        <div className="game-root">
            <NavigationBar />
            <div id="phaser-wrapper">
                <div id="phaser-container" />
            </div>
        </div>
    )
}