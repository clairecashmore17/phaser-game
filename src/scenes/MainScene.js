import Phaser from "phaser";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  //methods to be called

  //this is where we load all our images
  preload() {
    console.log("preload");
  }
  //create our game objects
  create() {
    console.log("created");
    //creating new physics sprite
    this.player = new Phaser.Physics.Matter.Sprite(this.matter.world);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  //called 60 fps
  update() {
    // console.log("update");
    const speed = 2.5;
    //create velocity vector for player
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    } else if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    //scale our vector(multiplying unit vector by speed)
    playerVelocity.scale(speed);
    //actually move playert
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
