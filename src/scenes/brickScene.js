class BrickScene extends Phaser.Scene {
    constructor() {
      super("brickScene");
      this.VEL = 100;
    }
  
    create() {
      this.ybroad = this.add.tileSprite(0,0, 650, 425, 'ybroad').setOrigin(0,0);
      keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  
      this.player = this.physics.add.sprite(100, game.config.height/2 + 30, "player", 0).setScale(2)
      this.house = this.physics.add.sprite(100, game.config.height/2, "brokenhouse", 0).setScale(2)

      this.music = this.sound.add('song');
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
  