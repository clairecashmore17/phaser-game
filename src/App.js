import logo from "./logo.svg";
import "./App.css";
import Phaser, { Game } from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [game, setGame] = useState(null);
  // Creating game inside a useEffect in order to ensure 1 instance is created
  useEffect(() => {
    console.log("Going into useEffect");
    console.log(game);
    if (game) {
      console.log("game detected. stop creation");
      return;
    }
    const phaserGame = new Phaser.Game({
      width: 512,
      height: 412,
      backgroundColor: "#333333",
      type: Phaser.AUTO,
      parent: "survival-game",
      scene: [],
      scale: {
        zoom: 2,
      },
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: 0 },
        },
      },
      plugins: {
        scene: [
          {
            plugin: PhaserMatterCollisionPlugin,
            key: "matterCollision",
            mapping: "matterCollision",
          },
        ],
      },
    });

    setGame(phaserGame);
  }, [game]);
}

export default App;
