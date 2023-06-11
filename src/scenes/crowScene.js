class CrowScene extends Phaser.Scene {
    constructor() {
      super("crowScene");
    }
}

createImageBitmap() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  
    this.player = this.physics.add.sprite(100, game.config.height/2 + 30, "player", 0).setScale(2)
}

