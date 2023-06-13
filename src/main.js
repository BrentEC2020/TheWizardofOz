/*
* Created by Brent Chou and Arthur Lin
* We worked really hard to try to stay true to the film's metaphors and subliminal messaging.
* The art created was made simplistic as a stylistic choice.
* We successfully were able to recycle our code to keep well within our scope when transfering between scenes.
*/

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
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    
    scene: [Load, Title, Rules, Credits, GameOver, HouseScene, BrickScene, CrowScene, TinScene, LionScene, OzScene]
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
let keySPACE;
let keyC;
let keyR;