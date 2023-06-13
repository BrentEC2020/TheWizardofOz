class OzScene extends Phaser.Scene {
    constructor() {
      super("ozScene");
      this.VEL = 100;
      this.linedUp = false;
      this.curtainOpen = false;
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

        this.anims.create({
            key: 'dogWalk',
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('dogmove', { start: 0, end: 3 }),
            repeat: -1,
        });

        this.anims.create({
            key: 'curtainDraw',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers('curtainanim', { start: 0, end: 19 }),
            repeat: -1,
        });

        this.anims.create({
            key: 'wWalk',
            frameRate: 20,
            frames: this.anims.generateFrameNumbers('wmove', { start: 0, end: 19 }),
            repeat: -1,
        });
    }

    create() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      
        this.background = this.add.tileSprite(0, 0, 650, 425, "ozbg").setOrigin(0, 0);
        this.player = this.physics.add.sprite(100, game.config.height/2 - 30, "player", 0)
        this.tinman = this.physics.add.sprite(100, game.config.height/2 + 30, "tinman", 0);
        this.scarecrow = this.physics.add.sprite(100, game.config.height/2 - 100, "scarecrow", 0);
        this.lion = this.physics.add.sprite(100, game.config.height/2 + 100, "lion", 0);
        this.toto = this.physics.add.sprite(-400, game.config.height/2 - 400, "toto", 0);
        this.wizard = this.physics.add.sprite(-400, game.config.height/2 - 400, "wizard", 0);

        this.player.setCollideWorldBounds(true);

        this.curtain = this.physics.add.sprite(300, game.config.height - 390, "curtain", 0).setImmovable();
        this.physics.add.collider(this.toto, this.player);
        this.physics.add.collider(this.toto, this.scarecrow);
        this.physics.add.collider(this.toto, this.tinman);
        this.physics.add.collider(this.toto, this.lion);
        this.physics.add.collider(this.toto, this.wizard);

        this.physics.add.collider(this.wizard, this.player);
        this.physics.add.collider(this.wizard, this.scarecrow);
        this.physics.add.collider(this.wizard, this.tinman);
        this.physics.add.collider(this.wizard, this.lion);

    }
    
    update() {
        // player movement from vector
        this.direction = new Phaser.Math.Vector2(0);
        this.toto.direction = new Phaser.Math.Vector2(0);
        this.wizard.direction = new Phaser.Math.Vector2(0);

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

        if (this.player.x > 100 && this.sceneStart == false) {
            this.sceneStart = true;
            this.ozText = this.add.text(game.config.width/2 - 30, game.config.height/2 + 50, "COME FORTH!").setOrigin(0.5);
            this.time.delayedCall(3000, () => {
                this.ozText.setText("We would like you to grant our wishes O' Great Wizard.");
                this.time.delayedCall(5000, () => {
                    this.ozText.setText("I can certainly do that, just wait there.");
                    this.time.delayedCall(7000, () => {
                        this.ozText.setText("No Toto! The Wizard told us to stay put!\n(You, the PLAYER, now have control of Toto.)");
                        this.time.delayedCall(9000, () => {
                            this.ozText.setText(" ");                     
                        });
                    });
                });
            });
        }

        this.physics.collide(this.toto, this.curtain, this.curtainCollide, null, this);

        if (this.player.x > 300) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.setPosition(400, game.config.height/2);
            this.player.anims.pause();
            this.player.setImmovable();
            
            this.scarecrow.setPosition(300, game.config.height/2);
            this.scarecrow.anims.pause();
            this.scarecrow.setImmovable();

            this.tinman.setPosition(200, game.config.height/2);
            this.tinman.anims.pause();
            this.tinman.setImmovable();

            this.lion.setPosition(100, game.config.height/2);
            this.lion.anims.pause();
            this.lion.setImmovable();

            if (this.linedUp == false) {
                this.linedUp = true;
                this.toto.setPosition(400, game.config.height/2 - 60);
                this.toto.setCollideWorldBounds(true);
            }
        }

        if (keyA.isDown) {
            this.toto.direction.x = -1;
            this.toto.anims.play('dogWalk', true);
        } else if (keyD.isDown) {
            this.toto.direction.x = 1;
            this.toto.anims.play('dogWalk', true);
        }
        if (keyW.isDown) {
            this.toto.direction.y = -1;
            this.toto.anims.play('dogWalk', true);
        } else if (keyS.isDown) {
            this.toto.direction.y = 1;
            this.toto.anims.play('dogWalk', true);
        }
        this.toto.direction.normalize();
        this.toto.setVelocity(
            this.VEL * this.toto.direction.x,
            this.VEL * this.toto.direction.y
        );
    
        if (this.toto.body.velocity.x == 0 && this.toto.body.velocity.y == 0) {
            this.toto.anims.pause();
        }

        this.friendsfollow();

        

        if (this.curtainOpen == true) {
            this.wizard.setCollideWorldBounds(true);   
            this.toto.body.velocity.x = 0;
            this.toto.body.velocity.y = 0;
            this.toto.setPosition(370, game.config.height/2 - 180);
            this.toto.anims.pause();

            if (keyA.isDown) {
                this.wizard.direction.x = -1;
                this.wizard.anims.play('wWalk', true);
            } else if (keyD.isDown) {
                this.wizard.direction.x = 1;
                this.wizard.anims.play('wWalk', true);
            }
            if (keyW.isDown) {
                this.wizard.direction.y = -1;
                this.wizard.anims.play('wWalk', true);
            } else if (keyS.isDown) {
                this.wizard.direction.y = 1;
                this.wizard.anims.play('wWalk', true);
            }
            this.wizard.direction.normalize();
            this.wizard.setVelocity(
                this.VEL * this.wizard.direction.x,
                this.VEL * this.wizard.direction.y
            );

            if (this.wizard.body.velocity.x == 0 && this.wizard.body.velocity.y == 0) {
                this.wizard.anims.pause();
            }
        }
    }   

    friendsfollow() {
        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
          this.physics.moveToObject(this.scarecrow, this.player, 70);
          this.physics.moveToObject(this.tinman, this.scarecrow, 60);
          this.physics.moveToObject(this.lion, this.player, 20);
          this.scarecrow.anims.play('crowWalk', true);
          this.tinman.anims.play('tinWalk', true);
          this.lion.anims.play('lWalk', true);
        }
        else {
            this.scarecrow.body.velocity.x = 0;
            this.scarecrow.body.velocity.y = 0;
            this.tinman.body.velocity.x = 0;
            this.tinman.body.velocity.y = 0;
            this.lion.body.velocity.x = 0;
            this.lion.body.velocity.y = 0;
            this.scarecrow.anims.pause();
            this.tinman.anims.pause();
            this.lion.anims.pause();
        }
    }

    curtainCollide() {
        if (this.curtainOpen == false) {
            this.curtainOpen = true;
            this.curtain.anims.play('curtainDraw', true);
            this.curtain.destroy();
            this.wizard.setPosition(300, game.config.height - 390);
        }
    }
}