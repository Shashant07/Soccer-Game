export function predictBallX(ball, predictionTime) {
    if (!ball.body) return ball.x;

    return ball.x + ball.body.velocity.x * predictionTime;
}