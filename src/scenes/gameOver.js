class GameOver extends Phaser.Scene {
    constructor() {
        super("overScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 650, 425, 'gameover').setOrigin(0, 0);
        
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        if (keySPACE.isDown) {
            this.game.sound.stopAll();
            this.scene.start("titleScene"); 
        }
        if (keyR.isDown) {
            this.game.sound.stopAll();
          this.scene.start("houseScene");
        }
      }
}