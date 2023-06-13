class LionScene extends Phaser.Scene {
  constructor() {
    super("lionScene");
    this.VEL = 100;
    this.flipNow = false;
    this.sceneStart = false;
  }

  preload() {
    this.anims.create({
      key: 'dWalk',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      repeat: -1,
    });

    this.anims.create({
      key: 'crowWalk',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('scmove', { start: 0, end: 3 }),
      repeat: -1,
    });

    this.anims.create({
      key: 'tinWalk',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('tmmove', { start: 0, end: 3 }),
      repeat: -1,
    });

    this.anims.create({
      key: 'lWalk',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('lmove', { start: 0, end: 3 }),
      repeat: -1,
    });
  } 

  create() {
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.background = this.add.tileSprite(0, 0, 650, 425, "lionbg").setOrigin(0, 0);
    // define sprites
    this.player = this.physics.add.sprite(65, 40, "player", 0);
    this.tinman = this.physics.add.sprite(35, 20, "tinman", 0);
    this.scarecrow = this.physics.add.sprite(95, 20, "scarecrow", 0);
    this.lion = this.physics.add.sprite(600, 350, "lion", 0);
    this.lion.flipX = true;

    this.player.setCollideWorldBounds(true);

    this.claws = this.add.group();
    this.hands = this.add.group();

    this.lionattacking = this.time.addEvent({
      delay: 2000, 
      callback: this.lionattack,
      callbackScope: this,
      loop: true
    });

    this.playerSlap();
    this.slapped = false;

  }

  update() {
    // player movement from vector

    this.direction = new Phaser.Math.Vector2(0);
    if (keyA.isDown) {
      this.direction.x = -1;
      this.player.anims.play('dWalk', true);
    } else if (keyD.isDown) {
      this.direction.x = 1;
      this.player.anims.play('dWalk', true);
    }
    if (keyW.isDown) {
      this.direction.y = -1;
      this.player.anims.play('dWalk', true);
    } else if (keyS.isDown) {
      this.direction.y = 1;
      this.player.anims.play('dWalk', true);
    }
    this.direction.normalize();
    this.player.setVelocity(
      this.VEL * this.direction.x,
      this.VEL * this.direction.y
    );

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
      this.player.anims.pause();
    }

    if (this.player.y > 40 && this.sceneStart == false) {
      this.sceneStart = true;
      this.startText = this.add.text(game.config.width/2, game.config.height/2, "OH NO, A BIG SCARY LION, DOROTHY STOP HIM!").setOrigin(0.5)
      this.time.delayedCall(3000, () => {
        this.startText.setText(" ");
      });
    }
    // follow script for player
    this.friendsfollow();
    this.lionmove(this.player.body.velocity.x,this.player.body.velocity.y);
    this.physics.collide(this.player,this.claws,this.playerdamage,null,this);
    this.physics.collide(this.lion,this.hands,this.lionslap,null,this);

    if (this.player.x > 660) {
      this.game.sound.stopAll();
      this.scene.start("ozScene")
    }
  }

  friendsfollow() {
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
      this.physics.moveToObject(this.scarecrow, this.player, 70);
      this.physics.moveToObject(this.tinman, this.scarecrow, 60);
      this.scarecrow.anims.play('crowWalk', true);
      this.tinman.anims.play('tinWalk', true);
    }
    else {
      this.scarecrow.body.velocity.x = 0;
      this.scarecrow.body.velocity.y = 0;
      this.tinman.body.velocity.x = 0;
      this.tinman.body.velocity.y = 0;
      this.scarecrow.anims.pause();
      this.tinman.anims.pause();
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
    if (this.flipNow == true) {
      this.lion.flipX = false;
    }
    if (speedx != 0 || speedy != 0) {
      this.physics.moveToObject(this.lion, this.player, 20);
      this.lion.anims.play('lWalk', true);
    }
    else {
      this.lion.body.velocity.x = 0;
      this.lion.body.velocity.y = 0;
      this.lion.anims.pause();
    }
  }

  lionattack() {
    if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
    let vector = new Phaser.Math.Vector2(this.player.x-this.lion.x,this.player.y-this.lion.y);
    this.lion.anims.play('lWalk', true);
    this.slash = this.physics.add.sprite(this.lion.x, this.lion.y, "claw", 0).setDepth(9);
    
    vector.setLength(100);
    this.claws.add(this.slash);
    this.slash.setVelocity(vector.x,vector.y);
    }
  }

  playerdamage() {
    this.scene.restart();
  }

  lionslap() {
    if (this.slapped == false) {
    this.flipNow = true;
    this.slapped = true;
    this.lionattacking.destroy();
    this.crytext = this.add.text(game.config.width/2, game.config.height/2, "WAHHH WAHHH I'm a coward, I haven't any courage at all.").setOrigin(0.5);
    this.time.delayedCall(3000, () => {
      this.crytext.setText("Well I'm sure the wizard could give you some courage.");
      this.time.delayedCall(5000, () => {
        this.sound.play("followroad", {volume: 0.01, loop: true, delay: 2})
        this.crytext.setText("We're off to see the wizard! The wonderful Wizard of Oz.")
        this.physics.world.setBounds(0,0,game.config.width/3-8, game.config.height, true, false, true, true)
      })
    })
  };   
  }
}

