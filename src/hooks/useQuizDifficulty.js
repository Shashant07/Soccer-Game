import quizConfig from "../config/quizConfig";

export default function resolveDifficulty(goals) {
    if (quizConfig.mode === "static") {
        return quizConfig.staticDifficulty;
    }

    if (quizConfig.mode === 'scpre-based') {
        if (goals >= 5) return "hard";
        if (goals >= 3) return "medium";
        return "easy";
    }

    if (goals >= 5) return "hard";
    if (goals >= 3) return quizConfig.staticDifficulty;
    return "easy";
}