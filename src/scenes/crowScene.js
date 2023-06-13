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
        
        this.bird = this.physics.add.sprite(670, game.config.height - 20, "bird", 0).setScale(4);

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

        this.crowStuck = false;
        this.sceneOver = false;
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

        this.physics.collide(this.stillcrow, this.crows, this.scarecrowDamage, null, this);
        this.physics.collide(this.player,this.crows,this.birdDestroy,null,this);

        if (this.birdCount == 15 && this.sceneOver == false) {
            this.sceneOver = true;
            this.sound.play("followroad", {volume: 0.01, loop: true, delay: 2});
            this.stillcrow.destroy();
            this.scarecrow = this.physics.add.sprite(320, game.config.height/4 + 270, "scarecrow", 0).setScale(2);
            this.doneText = this.add.text(game.config.width/2, game.config.height/2, "Good Gracious! I would never have been able to do that\n since I don't have a brain.").setOrigin(0.5);
            this.time.delayedCall(3000,() => {
                this.doneText.setText("You don't have a brain? Why, you should come\n to the Wizard with me and ask for one!");
                this.time.delayedCall(5000,() => {
                    this.doneText.setText("Well if you insist!");
                    console.log("textchange");
                    this.physics.world.setBounds(0,0,game.config.width, game.config.height, true, true, true, false);
                });
            });
        }

        if (this.sceneOver == true) {
            this.scarecrowMove(this.player.body.velocity.x,this.player.body.velocity.y);
            this.physics.collide(this.scarecrow, this.crows, this.scarecrowDamage, null, this);
        }

        if (this.player.y > 430) {
            this.game.sound.stopAll();
            this.scene.start("tinScene")
        }
    }   

    birdMove() {
        if(this.player.x > 320 && this.birdCount != 15) {
            this.scareCrowStuck();
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

    birdDestroy(player, bird) {
        bird.destroy();
    }

    scarecrowDamage() {
        this.scene.restart();
    }

    scareCrowStuck() {
        if (this.crowStuck == false) {
            this.crowStuck = true;
            this.birdtext = this.add.text(game.config.width/2, game.config.height/2, "PLEASE KEEP THE CROWS AWAY FROM ME, \nSCARE THEM, BLOCK THEM, ANYTHING!").setOrigin(0.5);           
            this.time.delayedCall(3000,() => {
                this.birdtext.setText(" ");
                console.log("textchange");
            });

        }
    }

    scarecrowMove(speedx, speedy) {
        if (speedx != 0 || speedy != 0) {
          this.physics.moveToObject(this.scarecrow, this.player, 50);
        }
        else {
          this.scarecrow.body.velocity.x = 0;
          this.scarecrow.body.velocity.y = 0;
        }
    }
}

