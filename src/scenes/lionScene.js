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
        this.background = this.add.tileSprite(0, 0, 650, 425, 'lionbg').setOrigin(0, 0);
        this.player = this.physics.add.sprite(65, 20, "player", 0).setScale(2);
        this.player.setCollideWorldBounds(true);
        this.lion = this.physics.add.sprite(600,350, "lion",0).setScale(2);
        this.lion.flipX = true;
       
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
      }
}