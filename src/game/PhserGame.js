import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import createBootScene from "./scenes/BootScene";
import createPreloadScene from "./scenes/PreloadScene";

export default function PhaserGame(parentId, onGameComplete) {
    return new Phaser.Game({
        type: Phaser.AUTO,

        // Logical game resolution

        width: 800,

        height: 600,

        parent: parentId,

        backgroundColor: "#000000",

        physics: {

            default: "arcade",

            arcade: { debug: false },

        },

        scale: {

            mode: Phaser.Scale.FIT, //Scale up/down to fit screen

            autoCenter: Phaser.Scale.CENTER_BOTH,

            // IMPORTANT: allow scaling down!

            min: {

                width: 320, // or 0

                height: 240,
            },

            max: {
                width: 1920, // safe upper bound
                height: 1080,

            },

        },
        scene: [createBootScene(), createPreloadScene(), PlayScene(onGameComplete)],
    });
}