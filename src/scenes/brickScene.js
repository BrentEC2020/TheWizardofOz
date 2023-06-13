class BrickScene extends Phaser.Scene {
    constructor() {
      super("brickScene");
      this.VEL = 100;
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
      this.ybroad = this.add.tileSprite(0,0, game.config.width * 3, game.config.height, 'ybroad').setOrigin(0,0);
      this.justroad = this.physics.add.sprite(0,game.config.height/3 - 8, "justroad").setOrigin(0,0);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  
      this.player = this.physics.add.sprite(220, game.config.height/2 + 30, "player", 0)
      this.house = this.physics.add.sprite(100, game.config.height/2, "brokenhouse", 0)
      this.physics.world.setBounds(0,0,game.config.width/3-8, game.config.height, true, false, true, true)
      this.player.setCollideWorldBounds(true);
      this.cameras.main.setBounds(5,5,game.config.width * 1.5, game.config.height - 5, true, false, true, true);
      this.cameras.main.startFollow(this.player, true, 1, 1);
      this.cameras.main.setZoom(1.2);

      this.sound.play("song", {volume: 0.01, loop: true})
      this.sound.play("followroad", {volume: 0.01, loop: true, delay: 2})
  
    }

    update()
    {
      if (this.player.x > game.config.width * 1.5 + 20) {
        this.game.sound.stopAll();
        this.scene.start("crowScene");
      }
  
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
    }


  }
  
  