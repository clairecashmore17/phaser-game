import Phaser from "phaser";
import bear from "../../assets/atlases/bear_atlas.json";
import female from "../../assets/atlases/female_atlas.json";
export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);
  }

  //creating static method for the files
  static preload(scene) {
    //loading our images
    scene.load.atlas("bear", "../assets/atlases/bear.png", bear);
    scene.load.animation("bear_anim", "../assets/atlases/bear_anim.json");
  }
  //called 60 fps
  update() {
    this.anims.play("bear_idle", true);
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
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
