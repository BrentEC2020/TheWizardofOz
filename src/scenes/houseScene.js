class HouseScene extends Phaser.Scene {
  constructor() {
    super("houseScene");
    this.VEL = 100;
    this.projectiles = ["broom", "chair", "plate"];
  }

  preload() {
    this.anims.create({
      key: 'dWalk',
      frameRate: 4,
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      repeat: -1,
    });
  }

  create() {
    // input key
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    // all audio

    this.sound.play("storm", {volume: 0.001})

    this.farm = this.add.tileSprite(0, 0, 650, 425, 'farm').setOrigin(0, 0);

    // sprite definitions 
    this.tornado = this.physics.add
      .sprite(game.config.width + 500, game.config.height / 2, "bignado", 0);
    this.player = this.physics.add
      .sprite(200, game.config.height / 2 + 75, "player", 0);
    this.house = this.physics.add
      .sprite(100, game.config.height / 2 + 15, "house", 0);
    // group definitions
    this.tornadoes = this.add.group();
    this.bullets = this.add.group();
    this.playerShoot();
    for (let i = 0; i < 5; ++i) {
            this.miniNado();   
    }
  }
  update() {
    this.tornado.x -= 1;
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
        /*this.direction.y = -1;
        this.player.anims.play('dWalk', true);*/
    } else if (keyS.isDown) {
        /*this.direction.y = 1;
        this.player.anims.play('dWalk', true);*/
    }
    this.direction.normalize();
    this.player.setVelocity(
        this.VEL * this.direction.x,
        this.VEL * this.direction.y
    );

    if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
        this.player.anims.pause();
    }
    this.tornadoes.getChildren().forEach((nado) => {
        this.physics.moveToObject(nado,this.house,100);
    });
    // collision callback on big tornado collision with house
    this.physics.collide(
      this.house,
      this.tornado,
      this.houseElevate,
      null,
      this
    );

    this.physics.world.collide(
        this.tornadoes,
        this.bullets,
        this.collide,
        null,
        this
      );
  }
// house levitation function
  houseElevate(house, tornado) {
    this.house.y -= 2;
    this.player.y -= 2;
    this.sound.play("tornadocrash", {volume: 0.1})
    this.house.setTexture("brokenhouse");
    this.VEL = 0;
    this.time.delayedCall(5500, () => {
      this.game.sound.stopAll();
      this.scene.start("brickScene");
    });
  }
// player shooting function
  playerShoot() { 
    this.input.on("pointerdown", (pointer) => {
      this.sound.play("throw", {volume: 0.1})
      let bspeed = 200;
      let bullet = this.add
        .sprite(
          this.player.x,
          this.player.y,
          this.projectiles[Math.floor(Math.random() * this.projectiles.length)],
          0
        )
        .setDepth(9);

      this.physics.add.existing(bullet);

      let vector = new Phaser.Math.Vector2(
        pointer.worldX - this.player.x,
        pointer.worldY - this.player.y
      );
      vector.setLength(bspeed);
      this.bullets.add(bullet);
      bullet.body.setVelocity(vector.x, vector.y);
      this.time.delayedCall(1000, () => {
        bullet.destroy();
      });
    });
  }

  miniNado() {
    let tornadosm = this.physics.add.sprite(
        game.config.width +  Phaser.Math.Between(50, 300),
        Phaser.Math.Between(0, game.config.height + 50),
        "tornado",
        0
      );
      this.tornadoes.add(tornadosm);
  }

  
  collide(group, bullet) {
    group.destroy();
    bullet.destroy();
  }
}
