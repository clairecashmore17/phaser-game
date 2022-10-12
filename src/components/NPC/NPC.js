import { click } from "@testing-library/user-event/dist/click";
import Phaser from "phaser";
import bear from "../../assets/atlases/bear_atlas.json";
import { createSpeechBubble } from "../../utils/helpers";
export default class NPC extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, texture, frame } = data;
    super(scene.matter.world, x, y, texture, frame);
    this.scene.add.existing(this);

    //circular collision
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    var npcCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      label: "npcCollider",
    });
    // npcCollider.body.setImmovable(true);
    var npcSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "npcSensor",
    });
    const compoundBody = Body.create({
      parts: [npcCollider, npcSensor],
      frictionAir: 2,
    });

    this.setExistingBody(compoundBody);
    //makes sure body statys upright
    this.setFixedRotation();
    //make sprite interactive
    this.setInteractive();
    let clicked = 0;
    this.on("pointerdown", function (pointer) {
      clicked++;
      const text = new Phaser.GameObjects.Text(this.scene, 300, 200, "hello", {
        font: '"Press Start 2P"',
      });
      if (clicked == 1) {
        alert("Hey there!");
      } else {
        alert("stop clicking me...");
      }

      // this.add.text
    });
  }

  //creating static method for the files
  static preload(scene) {
    //loading our images
    scene.load.atlas("bear", "../../assets/atlases/bear.png", bear);
    scene.load.animation("bear_anim", "../../assets/atlases/bear_anim.json");
  }

  //called 60 fps
  update() {
    this.anims.play("bear_idle", true);
  }
}
