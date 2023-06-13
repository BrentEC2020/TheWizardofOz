class TinScene extends Phaser.Scene {
    constructor() {
      super("tinScene");
      this.VEL = 100;
      this.treefound = false;
      this.gotOil = false;
      this.derusted = false;
      this.sceneOver = false;
    }

    create() {
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
      
        this.background = this.add.tileSprite(0, 0, 650, 425, 'tinbg').setOrigin(0, 0);

        this.player = this.physics.add.sprite(70, game.config.height/2 - 120, "player", 0).setScale(2);
        this.scarecrow = this.physics.add.sprite(50, game.config.height/2 - 135, "scarecrow", 0).setScale(2);
        this.stilltin = this.physics.add.sprite(360, game.config.height/2 - 120, "stilltin").setScale(2).setImmovable();

        this.player.setCollideWorldBounds(true);

        this.tree1 = this.physics.add.sprite(190, game.config.height/2 - 140, "tree", 0).setImmovable();
        this.tree2 = this.physics.add.sprite(310, game.config.height/2 - 160, "tree", 0).setImmovable();
        this.tree3 = this.physics.add.sprite(430, game.config.height/2 - 130, "tree", 0).setImmovable();
        this.tree4 = this.physics.add.sprite(540, game.config.height/2 - 140, "tree", 0).setImmovable();

        this.tree5 = this.physics.add.sprite(70, game.config.height/2 + 140, "tree", 0).setImmovable();
        this.tree6 = this.physics.add.sprite(180, game.config.height/2 + 160, "tree", 0).setImmovable();
        this.tree7 = this.physics.add.sprite(290, game.config.height/2 + 130, "tree", 0).setImmovable();
        this.tree8 = this.physics.add.sprite(400, game.config.height/2 + 140, "tree", 0).setImmovable();

        this.oilcans = this.add.group();
    }
    
    update() {
        // player movement from vector

        this.friendsfollow();

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

        this.collideTree(this.player, this.tree1);
        this.collideTree(this.player, this.tree2);
        this.collideTree(this.player, this.tree3);
        this.collideTree(this.player, this.tree4);
        this.collideTree(this.player, this.tree5);
        this.collideTree(this.player, this.tree6);
        this.collideTree(this.player, this.tree7);
        this.collideTree(this.player, this.tree8);

        this.physics.collide(this.player, this.can, this.collideCan, null, this);
        this.physics.collide(this.stilltin,this.oilcans,this.cleanTinman,null,this);

        this.holdingOil();

        if (this.sceneOver == true) {
            this.tinmanMove(this.player.body.velocity.x,this.player.body.velocity.y);
        }

        if (this.player.y > 430) {
            this.game.sound.stopAll();
            this.scene.start("lionScene")
        }
        /*if (this.treefound == true) {

        }*/
    }   

    friendsfollow() {
        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
          this.physics.moveToObject(this.scarecrow, this.player, 70);
        }
        else {
          this.scarecrow.body.velocity.x = 0;
          this.scarecrow.body.velocity.y = 0;
        }
    }

    discoverTree(player, tree) {
        tree.destroy();
        if (this.treefound == false) {
            this.treefound = true;
            this.treeText = this.add.text(game.config.width/2, game.config.height/2, "This tree does not have the Oil Can!").setOrigin(0.5);
            this.time.delayedCall(1000,() => {
                this.treeText.setText(" ");
                console.log("textchange");
            });
        }
        this.treefound = false;
    }

    collideTree(player, tree) {
        if (tree == this.tree5) {
            this.physics.collide(player, tree, this.foundOilCan, null, this);
        } else {
            this.physics.collide(player, tree, this.discoverTree, null, this);
        }
    }

    foundOilCan(player, tree) {
        tree.destroy();
        if (this.treefound == false) {
            this.treefound = true;
            this.can = this.physics.add.sprite(70, game.config.height/2 + 140, "oil", 0).setImmovable().setScale(4);
            this.canText = this.add.text(game.config.width/2, game.config.height/2, "You found the Oil Can!").setOrigin(0.5);
            this.time.delayedCall(1000,() => {
                this.canText.setText("Bring it here and de-rust me please!");
                console.log("textchange");
                this.time.delayedCall(2000, () => {
                    this.canText.setText(" ");
                });
            });
        }
        this.treefound = false;
    }

    collideCan(player, can) {
        can.destroy();
        this.gotOil = true;
    }

    holdingOil() {
        if (this.gotOil == true) {
            this.input.on("pointerdown", (pointer) => {
                this.sound.play("throw", {volume: 0.1})
                let bspeed = 100;
                let hand = this.add
                    .sprite(
                        this.player.x,
                        this.player.y,
                        "oil",
                         0
                    )
                    .setDepth(9).setScale(2);
      
                this.physics.add.existing(hand);
      
                let vector = new Phaser.Math.Vector2(
                    pointer.worldX - this.player.x,
                    pointer.worldY - this.player.y
                );
                vector.setLength(bspeed);
                this.oilcans.add(hand);
                hand.body.setVelocity(vector.x, vector.y);
                this.time.delayedCall(100, () => {
                    hand.destroy();
                });
            });
        }
    }

    cleanTinman() {
        if (this.derusted == false) {
            this.derusted = true;
            this.sceneOver = true;
            this.stilltin.destroy();
            this.tinman = this.physics.add.sprite(360, game.config.height/2 - 120, "tinman", 0).setScale(2);
            this.tinText = this.add.text(game.config.width/2, game.config.height/2, "Thank you! You have such\na big heart!").setOrigin(0.5);
            this.time.delayedCall(3000,() => {
                this.tinText.setText("I wish I had a heart like that...");
                console.log("textchange");
                this.time.delayedCall(5000, () => {
                    this.tinText.setText("You have no heart? Then you\nmust accompany us to visit the Wizard!");
                    this.time.delayedCall(7000, () => {
                        this.tinText.setText("I'd be honored!");
                        this.time.delayedCall(9000, () => {
                            this.tinText.setText(" ");
                            this.physics.world.setBounds(0,0,game.config.width, game.config.height, true, true, true, false);
                        });
                    });
                });
            });
        }
    }

    tinmanMove(speedx, speedy) {
        if (speedx != 0 || speedy != 0) {
          this.physics.moveToObject(this.tinman, this.player, 50);
        }
        else {
          this.tinman.body.velocity.x = 0;
          this.tinman.body.velocity.y = 0;
        }
    }

}