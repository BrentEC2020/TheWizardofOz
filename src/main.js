let config = {
    type: Phaser.CANVAS,
    width: 650,
    height: 425,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    
    scene: [Load, Title, HouseScene, BrickScene, CrowScene, TinScene, LionScene]
}
let game = new Phaser.Game(config);
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keyW;
let keyS;
let keyD;
let keyA;
let keySpace;