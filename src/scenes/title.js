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

    this.add
      .text(game.config.width/2, game.config.height/2, "Press Any key to start.")
      .setOrigin(0.5);
  }
  update() {
    if (
      this.input.keyboard.on("keydown", () => {
        this.scene.start("houseScene");
      })
    );
  }
}
