class HouseScene extends Phaser.Scene {
  constructor() {
    super("houseScene");
    this.VEL = 100;
  }

  create() {
    //     this.background = this.add.tileSprite(0,0, 875, 875, 'titleBackground').setOrigin(0,0);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.tornado = this.physics.add.sprite(game.config.width + 300, game.config.height/2, "tornado", 0).setScale(10)
    this.player = this.physics.add.sprite(200, game.config.height/2 + 30, "player", 0).setScale(2)
    this.house = this.physics.add.sprite(100, game.config.height/2, "house", 0).setScale(2)

  }
  update()
  {
    this.tornado.x -= 1;

    this.direction = new Phaser.Math.Vector2(0);

    if (keyA.isDown) {
      this.direction.x = -1;
    } else if (keyD.isDown) {
      this.direction.x = 1;
    }
    if (keyW.isDown) {
      this.direction.y = -1;
    } else if (keyS.isDown) {
      this.direction.y = 1;
    }
    this.direction.normalize();
    this.player.setVelocity(
      this.VEL * this.direction.x,
      this.VEL * this.direction.y
    );
    this.physics.collide(this.house,this.tornado, this.houseElevate, null, this);
  }

  houseElevate(house,tornado) {
    this.house.y -= 2;
    this.player.y -= 2;
    this.house.setTexture("brokenhouse")
    this.VEL = 0;
    this.time.delayedCall(5000, () => {
        this.scene.start("brickScene");
      });
  }

}
