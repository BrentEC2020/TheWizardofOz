class Load extends Phaser.Scene{
    constructor(){
        super('loadscene');
    }

    preload(){
        
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //

        this.load.path = './assets/';
        
        this.load.image("broom", "broom.png");
        this.load.image("chair", "chair.png");
        this.load.image("player", "dorothy.png");
        this.load.image("plate", "plate.png");
        this.load.image("tornado", "tornado.png");
        this.load.image("house", "house.png");
        this.load.image("brokenhouse", "brokenhouse.png");
        this.load.image("farm", "farm.png");
        this.load.image("ybroad", "yellowbrickroad.png");
        this.load.image("justroad", "justroad.png");
        this.load.image("crowbg", "scarecrowBackground.png");
        this.load.image("stillcrow", "scarecrowObj.png");
        this.load.image("tinbg", "tinmanBackground.png");
        this.load.image("stilltin", "tinmanObj.png");
        this.load.image("lionbg", "lionbackground.png");
        this.load.image("lion", "lion.png");

        this.load.audio("followroad", "followroad.mp3")
        this.load.audio('throw', "throw.mp3");
        this.load.audio('storm', "storm.mp3");
        this.load.audio('tornadocrash', "tornadocrash.mp3");
        this.load.audio('switch', "lightswitch.mp3");
        this.load.audio('song', "song.mp3");

        // this.load () assets here
    }

    create() {
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        // go to Title scene
        this.scene.start('titleScene');
    }
}
