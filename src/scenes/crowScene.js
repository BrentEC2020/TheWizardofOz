class CrowScene extends Phaser.Scene {
    constructor() {
        super("crowScene");
        this.VEL = 100;
        this.birdCount = 0;
    }

    create() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.background = this.add.tileSprite(0, 0, 650, 425, 'crowbg').setOrigin(0, 0);
      
        this.player = this.physics.add.sprite(100, game.config.height/2 + 30, "player", 0).setScale(2);
        this.stillcrow = this.physics.add.sprite(320, game.config.height/4 + 270, "stillcrow", 0).setScale(2);
        this.scarecrow = this.physics.add.sprite(-10, game.config.height - 20, "scarecrow", 0).setScale(2);
        this.bird = this.physics.add.sprite(670, game.config.height - 20, "bird", 0).setScale(4);

        this.physics.world.setBounds(0,0,game.config.width, game.config.height, true, true, true, true)
        this.player.setCollideWorldBounds(true);

        this.stillcrow.setImmovable();
        this.physics.add.collider(this.player, this.stillcrow);

        this.crows = this.add.group();

        this.birdsmoving = this.time.addEvent({
            delay: 3000,
            callback: this.birdMove,
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

        this.crows.getChildren().forEach((bird) => {
            this.physics.moveToObject(bird,this.stillcrow,100);
        });

        this.physics.collide(this.player,this.crows,this.birdDestroy,null,this);

    }   

    birdMove() {
        if(this.player.x > 320 && this.birdCount != 10) {
            this.birdCount += 1;
            let birdFly = this.physics.add.sprite(
                game.config.width +  Phaser.Math.Between(50, 300),
                Phaser.Math.Between(0, game.config.height + 50),
                "bird",
                0
            );
            this.crows.add(birdFly);
            }
      }

    birdDestroy() {
        this.crows.destroy();
    }
}

