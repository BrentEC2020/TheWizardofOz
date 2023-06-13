class CrowScene extends Phaser.Scene {
    constructor() {
        super("crowScene");
        this.VEL = 100;
    }

    create() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.background = this.add.tileSprite(0, 0, 650, 425, 'crowbg').setOrigin(0, 0);
      
        this.player = this.physics.add.sprite(100, game.config.height/2 + 30, "player", 0).setScale(2);
        this.stillcrow = this.physics.add.sprite(100, game.config.height/4 + 300, "stillcrow", 0).setScale(2);
        this.physics.world.setBounds(0,0,game.config.width, game.config.height, true, true, true, true)
        this.player.setCollideWorldBounds(true);
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

