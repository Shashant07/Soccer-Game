const gameConfig = {
    matchTime: 120,
    maxGoals: 20,
    playerSpeed: 250,
    ballSpeed: 200,
    ENABLE_MOUSE_CONTROL: true,

    ai: {
        difficulty: "medium", //hard

        medium: {
            followLerp: 0.03,
            predictionTime: 0.2,
            maxSpeed: 220,
        },

        hard: {
            followLerp: 1,
            predictionTime: 0.6,
            maxSpeed: 250,
        },

    }
}

export default gameConfig;
