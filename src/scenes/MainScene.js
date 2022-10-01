import Phaser from "phaser";
import bear from "../assets/atlases/bear_atlas.json";
import female from "../assets/atlases/female_atlas.json";
export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  //methods to be called

  //this is where we load all our images
  preload() {
    console.log("preload");
    //loading our images
    this.load.atlas("bear", "../assets/atlases/bear.png", bear);
    this.load.animation("bear_anim", "../assets/atlases/bear_anim.json");
  }
  //create our game objects
  create() {
    console.log("created");
    //creating new physics sprite
    this.player = new Phaser.Physics.Matter.Sprite(
      this.matter.world,
      0,
      0,
      "bear",
      "bear_idle_1"
    );
    this.add.existing(this.player);
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }
  //called 60 fps
  update() {
    this.player.anims.play("bear_idle", true);
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
    //make sure magnitude is always 1 to avoid diagnol speed
    playerVelocity.normalize();
    //scale our vector(multiplying unit vector by speed)
    playerVelocity.scale(speed);
    //actually move player
    this.player.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
