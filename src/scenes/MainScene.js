import Phaser from "phaser";

import Player from "../components/Player/Player.js";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  //methods to be called

  //this is where we load all our images
  preload() {
    Player.preload(this);
    this.load.image("tiles", "../../assets/maps/IceTileset.png");
    this.load.tilemapTiledJSON("map", "assets/maps/snow_map.json");
  }
  //create our game objects
  create() {
    //map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("IceTileset", "tiles", 32, 32);
    const layer1 = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const layer2 = map.createLayer("Tile Layer 2", tileset, 0, 0);

    //creating new physics sprite
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "bear",
      frame: "bear_idle_1",
    });

    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  update() {
    this.player.update();
  }
}
