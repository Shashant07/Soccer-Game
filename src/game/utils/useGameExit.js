import { useCallback, useContext } from "react";
import { GameContext } from "../../context/GameContext";

export function useGameExit() {
    const { gameState, resetGame } = useContext(GameContext);

    const exitGame = useCallback(() => {
        alert("exit game");
    }, [gameState, resetGame]);

    return exitGame;
}
