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
  }
  //create our game objects
  create() {
    //creating new physics sprite
    this.player = new Player({
      scene: this,
      x: 0,
      y: 0,
      texture: "bear",
      frame: "bear_idle_1",
    });
    let textPlayer = new Player({
      scene: this,
      x: 100,
      y: 100,
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
