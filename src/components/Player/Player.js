import Phaser from "phaser";
import bear from "../../assets/atlases/bear_atlas.json";

import female from "../../assets/atlases/female_atlas.json";
export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    //circular collision
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var playerCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "playerCollider",
    });
    var playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    //makes sure body statys upright
    this.setFixedRotation();
  }

  //creating static method for the files
  static preload(scene) {
    //loading our images
    scene.load.atlas("bear", "../../assets/atlases/bear.png", bear);
    scene.load.animation("bear_anim", "../../assets/atlases/bear_anim.json");
  }

  //grab our player velocity
  get velocity() {
    return this.body.velocity;
  }
  //called 60 fps
  update() {
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

    //check to see if there is any velocity in x or y direction, if so, perofrm walk anim, else idle
    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play("bear_walk", true);
    } else {
      this.anims.play("bear_idle", true);
    }
  }
}
