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
        
        this.load.image("title", "title.png");

        this.load.image("broom", "broom.png");
        this.load.image("chair", "chair.png");
        
        this.load.image("plate", "plate.png");
        this.load.image("tornado", "tornado.png");
        this.load.image("bignado", "bigNado.png");
        this.load.image("house", "house.png");
        this.load.image("brokenhouse", "brokenhouse.png");
        this.load.image("farm", "farm.png");
        this.load.image("ybroad", "yellowbrickroad.png");
        this.load.image("justroad", "justroad.png");
        this.load.image("crowbg", "scarecrowBackground.png");
        this.load.image("stillcrow", "scarecrowObj.png");
        this.load.image("scarecrow", "scarecrow.png");
        this.load.image("tinbg", "tinmanBackground.png");
        this.load.image("stilltin", "tinmanObj.png");
        this.load.image("tinman", "tinman.png");
        this.load.image("oil", "oilCan.png");
        this.load.image("lionbg", "lionbackground.png");
        this.load.image("lion", "lion.png");
        this.load.image("claw", "clawScratch.png");
        this.load.image("bird", "crow.png");
        this.load.image("tree", "tree.png");
        this.load.image("ozbg", "ozbackground.png");
        this.load.image("toto", "toto.png");
        this.load.image("wizard", "Wizard.png");
        this.load.image("curtain", "curtain.png");

        this.load.audio("followroad", "followroad.mp3")
        this.load.audio('throw', "throw.mp3");
        this.load.audio('storm', "storm.mp3");
        this.load.audio('tornadocrash', "tornadocrash.mp3");
        this.load.audio('switch', "lightswitch.mp3");
        this.load.audio('song', "song.mp3");

        // this.load () assets here

        // spritesheets
        this.load.spritesheet("player", "dorothyspritesheet.png", {frameWidth: 24, frameHeight: 51});
        this.load.spritesheet("scmove", "scarecrowspritesheet.png", {frameWidth: 30, frameHeight: 60});
        this.load.spritesheet("tmmove", "tinmanspritesheet.png", {frameWidth: 24, frameHeight: 60});
        this.load.spritesheet("lmove", "lionspritesheet.png", {frameWidth: 30, frameHeight: 60});
        this.load.spritesheet("dogmove", "totospritesheet.png", {frameWidth: 32, frameHeight: 30});
        this.load.spritesheet("wmove", "wizardspritesheet.png", {frameWidth: 24, frameHeight: 60});
        this.load.spritesheet("curtainanim", "curtainspritesheet.png", {frameWidth: 260, frameHeight: 60});
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
