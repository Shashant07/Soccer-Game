import React, { useContext } from "react";
import { SCREENS } from "../config/constants.js";
import { ScreenContext } from "../context/ScreenContext.jsx";

export default function Landing() {
    const { setScreen } = useContext(ScreenContext);
    const fullScreen = (elem) => {
        elem = elem || document.documentElement;
        if (
            !document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement
        ) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
            }
            elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }

    return (
        <div className="container text-center mt-5">
            <h1> Soccer Lifeline Game</h1>
            <p>Score goals. Earn lifelines. Pass the quiz.</p>
            <button
                className="btn btn-primary btn-sm px-5"
                onClick={() => {
                    setScreen(SCREENS.INSTRUCTIONS);
                    fullScreen();
                }}>
                Start Game
            </button>
        </div>
    );
}