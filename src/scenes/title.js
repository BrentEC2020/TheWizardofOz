class Title extends Phaser.Scene {
  constructor() {
    super("titleScene");
  }

  create() {
    //     this.background = this.add.tileSprite(0,0, 875, 875, 'titleBackground').setOrigin(0,0);

    let menuScreen = {
      fontFamily: "Ariel",
      fontSize: "24px",
      align: "right",
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0,
    };

    this.background = this.add.tileSprite(0, 0, 650, 425, 'title').setOrigin(0, 0);

    keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  }
  update() {
    if (keySPACE.isDown) {
        //this.scene.start("houseScene");
        this.scene.start("ozScene"); // CURRENT WORKING SCENE: LION
    }
    if (keyC.isDown) {
      this.scene.start("creditScene");
    }
    if (keyR.isDown) {
      this.scene.start("rulesScene");
    }
  }
}
