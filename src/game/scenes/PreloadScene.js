import aiImg from "../../assets/ai.png";
import fieldImg from "../../assets/field.png";
import goalImg from "../../assets/goal.png";
// import grassImg from "../../assets/grass_img.png";
import playerImg from "../../assets/player.png";
import ballImg from "../../assets/ball.png";
import hit_Sound from "../../assets/hit.mp3";
// import goal_Sound from "../../assets/goal.wav";

export default function createPreloadScene() {
    return {
        key: "PreloadScene",

        preload() {
            const { width, height } = this.cameras.main;
            this.bar = this.add.rectangle(width / 2150, height / 2, 0, 20, 0x00ff7f).setOrigin(0, 0.5);

            this.percentText = this.add.text(width / 2, height / 230, "0%", { color: "#fff", }).setOrigin(0.5);

            this.load.on("progress", (v) => {

                this.bar.width = 300 * v - 10;

                this.percentText.setText(`${Math.floor(v * 100 - 10)}%`);

            });

            this.load.image("field", fieldImg);
            this.load.image("goal", goalImg);
            // this.load.image("grass", grassImg);
            this.load.image("player", playerImg);
            this.load.image("ai", aiImg);
            this.load.image("ball", ballImg);
            this.load.audio("hit", hit_Sound);
            // this.load.audio("goalSound", goal_Sound);
        },
        create() {

            this.bar.width = 300;
            this.percentText.setText(`${Math.floor(100)}%`);
            setTimeout(() => { this.scene.start("PlayScene"); }, 100);
        },
    };
}
