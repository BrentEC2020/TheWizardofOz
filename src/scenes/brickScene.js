class BrickScene extends Phaser.Scene {
    constructor() {
      super("brickScene");
      this.VEL = 100;
    }
  
    create() {
      this.ybroad = this.add.tileSprite(0,0, 650, 425, 'ybroad').setOrigin(0,0);
      this.justroad = this.physics.add.sprite(0,game.config.height/3 - 8, "justroad").setOrigin(0,0);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  
      this.player = this.physics.add.sprite(100, game.config.height/2 + 30, "player", 0).setScale(2)
      this.house = this.physics.add.sprite(100, game.config.height/2, "brokenhouse", 0).setScale(2)
      this.physics.world.setBounds(0,0,game.config.width, game.config.height, true, false, true, true)
      this.player.setCollideWorldBounds(true);
      this.cameras.main.setBounds(5,5,game.config.width * 2, game.config.height - 5, true, false, true, true);
      this.cameras.main.startFollow(this.player, true, 1, 1);
      this.cameras.main.setZoom(1.2);

      this.music = this.sound.add('song');
      this.music.setVolume(0.001);
      this.music.play();
  
    }
    update()
    {
  
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
    }
  }
  