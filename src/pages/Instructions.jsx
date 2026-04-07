import React, { useContext } from "react";
import NavigationBar from "../components/NavigationBar.jsx";
import { ScreenContext } from "../context/ScreenContext.jsx";
import { SCREENS } from "../config/screens.js";

export default function Instructions() {
    const { setScreen } = useContext(ScreenContext);
    return (
        <>
            <NavigationBar />
            {/* =====Main Content ===== */}
            <div className="container mt-5">
                <div className="card shadow-1g p-4">
                    <h2 className="text-center fw-bold mb-4">
                        Game Instructions</h2>

                    {/*===== Two Column Layout ===== */}

                    <div className="row">
                        {/* LEFT COLUMN */}
                        <div className="col-md-6 mb-4">
                            <h5 className="fw-semibold"> Objective</h5>
                            <p>
                                Score goals to earn lifelines and use them to answer quiz questions correctly. Learning and performance go hand in hand.
                            </p>
                            <h5 className="fw-semibold mt-4">Controls</h5>
                            <ul>
                                <li>
                                    <strong>Move Player:</strong>
                                    <p>
                                        -W/A/S/D <br />
                                        - Arrow Keys <br />
                                        - Mouse: Left Click + Drag
                                    </p>
                                </li>
                                <li>
                                    <strong>Hit Ball:</strong> Hold the Spacebar button
                                </li>
                            </ul>
                        </div>
                        {/* RIGHT COLUMN */}
                        <div className="col-md-6 mb-4">
                            <h5 className="fw-semibold"> Lifelines & Quiz</h5>
                            <ul>
                                <li>
                                    Each goal earns <strong>1 lifeline</strong>
                                </li>
                                <li>Lifelines allow quiz retries</li>
                                <li>Use them strategically</li>
                            </ul>
                            <h5 className="fw-semibold mt-4"> Winning Criteria</h5>
                            <p>
                                You must achieve a minimum score of <strong> 80%</strong> in the quiz to successfully complete the assessment.
                            </p>
                        </div>
                    </div>

                    {/* ===== Bottom Message =====*/}

                    <div className="alert alert-success text-center mt-3">
                        <strong> All the Best!</strong>
                        <br />
                        Focus, learn, and enjoy the game-based assessment experience.
                    </div>

                    {/*===== СТА Button ===== */}

                    <div className="text-center mt-4">
                        <button
                            className="btn btn-success btn-lg px-5"
                            onClick={() => setScreen(SCREENS.GAME)}
                        >
                            Start Game

                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}