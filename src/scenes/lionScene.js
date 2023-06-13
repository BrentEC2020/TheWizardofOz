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
    this.claws = this.add.group();
    this.hands = this.add.group();

    this.playerSlap();

    this.lionattacking = this.time.addEvent({
      delay: 1000, 
      callback: this.lionattack,
      callbackScope: this,
      loop: true
    });


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
    this.friendsfollow();
    this.lionmove(this.player.body.velocity.x,this.player.body.velocity.y);
  }

  friendsfollow() {
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

  playerSlap() {
    this.input.on("pointerdown", (pointer) => {
      this.sound.play("throw", {volume: 0.1})
      let bspeed = 100;
      let hand = this.add
        .sprite(
          this.player.x,
          this.player.y,
          "bird",
          0
        )
        .setDepth(9).setScale(2);

      this.physics.add.existing(hand);

      let vector = new Phaser.Math.Vector2(
        pointer.worldX - this.player.x,
        pointer.worldY - this.player.y
      );
      vector.setLength(bspeed);
      this.hands.add(hand);
      hand.body.setVelocity(vector.x, vector.y);
      this.time.delayedCall(100, () => {
        hand.destroy();
      });
    });   
  }

  lionmove(speedx, speedy) {
    if (speedx != 0 || speedy != 0) {
      this.physics.moveToObject(this.lion, this.player, 20);
    }
    else {
      this.lion.body.velocity.x = 0;
      this.lion.body.velocity.y = 0;
    }
  }

  lionattack() {
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
    let vector = new Phaser.Math.Vector2(this.player.x-this.lion.x,this.player.y-this.lion.y);
    this.slash = this.physics.add.sprite(this.lion.x, this.lion.y, "claw", 0).setDepth(9);
    
    vector.setLength(100);
    this.claws.add(this.slash);
    this.slash.setVelocity(vector.x,vector.y);
    }
  }

}

