class Credits extends Phaser.Scene{
    constructor() {
        super("creditScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 650, 425, 'credits').setOrigin(0, 0);
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if(keySPACE.isDown) {
            this.scene.start('titleScene');
        }
    }
}