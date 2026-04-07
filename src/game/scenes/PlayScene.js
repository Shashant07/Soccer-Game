import Phaser from "phaser";
import gameConfig from "../../config/gameConfig.js";
import { predictBallX } from "../utils/predictBallX.js";

export default function createPlayScene(onGameComplete) {
    let player, ai, ball;
    let userGoals = 0;
    let aiGoals = 0;
    let timeLeft = gameConfig.matchTime;
    let scoreText, timerText;
    let cursors, keys;
    let hitSound;
    // goalSound;

    return {
        key: "PlayScene",
        create() {

            //BACKGROUND

            // this.add.tileSprite(300, 400, 600, 800, "grass").setDepth(-2);

            // this.add.tileSprite(400, 300, 800, 600, "grass")
            //     .setScrollFactor(8)
            //     .setDepth(-2);

            this.add.image(400, 325, "field")
                // .setDisplaySize(560, 760)
                .setScale(0.5)
                .setDepth(-1);

            hitSound = this.sound.add("hit");
            // goalSound = this.sound.add("goalSound");

            // PLAYERS
            player = this.physics.add.sprite(300, 700, "player")
                .setScale(0.15)
                .setCollideWorldBounds(true);

            ai = this.physics.add.sprite(300, 100, "ai")
                .setScale(0.15)
                .setCollideWorldBounds(true)
                .setDepth(1)

            // BALL

            ball = this.physics.add
                .sprite(300, 400, "ball")
                .setCollideWorldBounds(true)
                .setScale(0.03)
                .setBounce(1, 1);

            // player initial position

            this.initialPlayerPos = { x: player.x, y: player.y };
            this.initialAiPos = { x: ai.x, y: ai.y };
            this.initialBallPos = { x: ball.x, y: ball.y };
            this.groundBounds = {
                left: 190, right: 610, top: 0, bottom: 600,
            };

            // console.log(initialAiPos, initialBallpos, this, initialPlayerPos);

            ball.setVelocity(0, 50);

            const radiusUser = player.width * 0.5;
            const radiusBall = ball.width * 0.5;
            player.body.setCircle(radiusUser);
            ai.body.setCircle(radiusUser);
            ball.body.setCircle(radiusBall);
            player.body.setOffset((player.width - radiusUser * 2) / 2, (player.height - radiusUser * 2) / 2)
            ai.body.setOffset((ai.width - radiusUser * 2) / 2, (ai.height - radiusUser * 2) / 2)
            ball.body.setOffset((ball.width - radiusBall * 2) / 2, (ball.height - radiusBall * 2) / 2)

            // GOAL POSTS

            const aiGoal = this.physics.add
                .sprite(400, 30, "goal")
                .setCollideWorldBounds(true)
                .setScale(0.22)
                .setAngle(180);

            aiGoal.body.setSize(aiGoal.width, aiGoal.height / 3);
            aiGoal.body.setOffset(
                aiGoal.width / aiGoal.width,
                aiGoal.height / aiGoal.height
            );

            // aiGoal.body.setSize(400, 33);

            const userGoal = this.physics.add
                .sprite(400, 565, "goal")
                .setCollideWorldBounds(true)
                .setScale(0.22);

            userGoal.body.setSize(userGoal.width, userGoal.height / 3);
            userGoal.body.setOffset(userGoal.width / userGoal.width, userGoal.height / userGoal.height + 150);
            this.physics.add.overlap(ball, aiGoal, scoreUserGoal);
            this.physics.add.overlap(ball, userGoal, scoreAIGoal);

            // INPUT

            cursors = this.input.keyboard.createCursorKeys();
            keys = this.input.keyboard.addKeys("W,A,S,D,SPACE");
            this.physics.add.collider(player, ball, () => {
                if (keys.SPACE.isDown) {
                    hitBall(true);
                }
            });

            this.physics.add.collider(ai, ball, () => {
                hitBall(false);
            });

            // left and right wall collision ======

            const centerX = 400;
            const centerY = 300;
            const boxWidth = 420;
            const boxHeight = 620;
            const thickness = 20;

            // TOP wall

            const topWall = this.add.rectangle(
                centerX,
                centerY - boxHeight / 2 + thickness / 2,
                boxWidth,
                thickness
            );

            this.physics.add.existing(topWall, true);

            // BOTTOM wall

            const bottomWall = this.add.rectangle(
                centerX,
                centerY + boxHeight / 2 - thickness / 2,
                boxWidth,
                thickness
            );

            this.physics.add.existing(bottomWall, true);

            // LEFT wall

            const leftWall = this.add.rectangle(
                centerX - boxWidth / 2 + thickness / 2,
                centerY,
                thickness,
                boxHeight
            );

            this.physics.add.existing(leftWall, true);

            // RIGHT wall

            const rightWall = this.add.rectangle(centerX + boxWidth / 2 - thickness / 2, centerY,
                thickness,
                boxHeight
            );

            this.physics.add.existing(rightWall, true);

            // Make invisible
            topWall.visible = bottomWall.visible = false;
            leftWall.visible = rightWall.visible = false;

            // Colliders
            this.physics.add.collider(ball, topWall);
            this.physics.add.collider(ball, bottomWall);
            this.physics.add.collider(ball, leftWall);
            this.physics.add.collider(ball, rightWall);

            this.physics.add.collider(player, topWall);
            this.physics.add.collider(player, bottomWall);
            this.physics.add.collider(player, leftWall);
            this.physics.add.collider(player, rightWall);

            //========= Naviagtion bar game paus and resume scene

            window.addEventListener("GAME_TOGGLE_PAUSE", () => {
                if (this.scene.isPaused()) {
                    this.scene.resume();
                    // goalSound.play();
                    // goalSound.volume = 0.1;
                } else {
                    this.scene.pause();
                    // goalSound.pause();
                }
            });

            scoreText = this.add.text(600, 10, "AI: 0 - USER: 0", { color: "#ffffff", fontSize: "18px", });

            timerText = this.add.text(10, 10, "", { color: "#ffffff", });

            updateScoreText();

            this.time.addEvent({
                delay: 1000,
                loop: true,
                callback: () => {
                    timeLeft--;
                    timerText.setText(`Time: ${timeLeft}s`);
                    if (timeLeft <= 0) endGame(this);
                },
            });

            // goalSound.play();

            // goalSound.volume = 0.1;

            if (gameConfig.ENABLE_MOUSE_CONTROL) {
                this.input.mouse.disableContextMenu();
                this.isDragging = false;
                this.targetX = null;
                this.targetY = null;
                this.input.on("pointerdown", (pointer) => {
                    if (pointer.leftButtonDown()) {
                        this.isDragging = true;
                        this.targetX = pointer.worldX;
                        this.targetY = pointer.worldY;

                        // Cursor when holding player

                        this.input.setDefaultCursor("grabbing");
                    }
                    // if (pointer.rightButtonDown()) {

                    // this.kickBall (pointer);

                    // }

                    // console.log(player.x, player.y);

                });

                this.input.on("pointermove", (pointer) => {
                    if (this.isDragging) return;

                    // only store target, do NOT move player here

                    this.targetX = pointer.worldX;
                    this.targetY = pointer.worldY;

                });

                this.input.on("pointerup", () => {
                    this.isDragging = false;
                    this.targetX = null;
                    this.targetY = null;
                    player.setVelocity(0);
                    // Back to normal cursor
                    this.input.setDefaultCursor("default");
                });
            }
        },
        update() {
            // PLAYER
            player.setVelocity(0);
            if (keys.A.isDown || cursors.left.isDown)
                player.setVelocityX(-gameConfig.playerSpeed);
            if (keys.D.isDown || cursors.right.isDown)
                player.setVelocityX(gameConfig.playerSpeed);
            if (keys.W.isDown || cursors.up.isDown)
                player.setVelocityY(-gameConfig.playerSpeed);
            if (keys.S.isDown || cursors.down.isDown)
                player.setVelocityY(gameConfig.playerSpeed);

            //AI (MEDIUM / HARD)

            const aiCfg = gameConfig.ai[gameConfig.ai.difficulty];
            const predictedX = predictBallX(ball, aiCfg.predictionTime);
            const clampedX = Phaser.Math.Clamp(predictedX, 60, 540);

            ai.x = Phaser.Math.Linear(ai.x, clampedX, aiCfg.followLerp);

            //==========move player using mouse...

            if (this.isDragging) {

                const dist = Phaser.Math.Distance.Between(player.x, player.y, this.targetX, this.targetY);

                if (dist > 8) {

                    this.physics.moveTo(player, this.targetX, this.targetY, gameConfig.playerSpeed);

                } else {
                    player.setVelocity(0);
                }
            }
            // Reset player positions

            // console.log(this.groundBounds);

            if (
                ball.x < this.groundBounds.left ||
                ball.x > this.groundBounds.right ||
                ball.y < this.groundBounds.top ||
                ball.y > this.groundBounds.bottom
            ) {

                resetBall();
            }
            if (
                ai.x < this.groundBounds.left ||
                ai.x > this.groundBounds.right ||
                ai.y < this.groundBounds.top ||
                ai.y > this.groundBounds.bottom

            ) {

                resetAi();
            }


            if (
                player.x < this.groundBounds.left ||
                player.x > this.groundBounds.right ||
                player.y < this.groundBounds.top ||
                player.y > this.groundBounds.bottom
            ) {
                resetPlayer();
            }
        }
    };

    function hitBall(fromPlayer) {
        hitSound.play();
        ball.setVelocity(Phaser.Math.Between(-200, 200), fromPlayer ? -300 : 300);
    }


    function scoreUserGoal() {
        userGoals++;
        updateScoreText();
        resetBall(false);
    }

    // console.log("score");


    // if (this.scene.isPaused()) goalSound.play();



    function scoreAIGoal() {
        aiGoals++;
        updateScoreText();
        resetBall(true);
    }

    // console.log("score1");


    // if (this.scene.isPaused()) goalSound.play();
    function resetBall(toUser) {
        ball.setPosition(400, 300);
        ball.setVelocity(Phaser.Math.Between(-50, 50), toUser ? 50 : -50);

    }



    function resetAi() {
        ai.setPosition(400, 100);

        ai.setVelocity(0);

    }


    function resetPlayer() {
        player.setPosition(400, 500);

        player.setVelocity(0);

    }


    function updateScoreText() {
        scoreText.setText(`AI: ${aiGoals} - USER: ${userGoals}`);

    }
    function endGame(scene) {
        scene.scene.stop();
        onGameComplete({ userGoals, aiGoals });

    }

}