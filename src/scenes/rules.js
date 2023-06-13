class Rules extends Phaser.Scene {
    constructor() {
        super("rulesScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 650, 425, 'rules').setOrigin(0, 0);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(keySPACE.isDown) {
            this.scene.start('titleScene');
        }
    }
}