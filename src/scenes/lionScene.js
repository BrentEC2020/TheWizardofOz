class LionScene extends Phaser.Scene {
  constructor() {
    super("lionScene");
    this.VEL = 100;
  }

  create() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.background = this.add
      .tileSprite(0, 0, 650, 425, "lionbg")
      .setOrigin(0, 0);
    this.player = this.physics.add.sprite(65, 40, "player", 0).setScale(2);
    this.tinman = this.physics.add.sprite(35, 20, "tinman", 0).setScale(2);
    this.scarecrow = this.physics.add
      .sprite(95, 20, "scarecrow", 0)
      .setScale(2);
    this.player.setCollideWorldBounds(true);
    this.lion = this.physics.add.sprite(600, 350, "lion", 0).setScale(2);
    this.lion.flipX = true;
    // this.physics.add.collider(this.player, this.scarecrow);
  }

  update() {
    // player movement from vector
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
    // follow script for player
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
      this.physics.moveToObject(this.scarecrow, this.player, 70);
      this.physics.moveToObject(this.tinman, this.scarecrow, 60);
    }
    else {
      this.scarecrow.body.velocity.x = 0;
      this.scarecrow.body.velocity.y = 0;
      this.tinman.body.velocity.x = 0;
      this.tinman.body.velocity.y = 0;
    }

  }
  lionmove() {

  }
}
