let config = {
    type: Phaser.CANVAS,
    width: 875,
    height: 875,
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
    scene: [Load, Title, Play, Rules, GameOver]
}
let game = new Phaser.Game(config);