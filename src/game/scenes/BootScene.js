export default function createBootScene() {
    return {
        key: "BootScene",

        create() {
            this.scene.start("PreloadScene");
        },
    };
}