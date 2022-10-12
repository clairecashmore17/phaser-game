import "./App.css";
import Phaser, { Game } from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import { useCallback, useEffect, useRef } from "react";
import MainScene from "./scenes/MainScene";
import { DialogModalPlugin } from "./utils/helpers";

function usePhaserGame(config) {
  const phaserGameRef = useRef(null);
  useEffect(
    () => {
      if (phaserGameRef.current) {
        return;
      }
      phaserGameRef.current = new Game(config);
      return () => {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      };
    },
    [] /* only run once; config ref elided on purpose */
  );
  return phaserGameRef.current;
}

const config = {
  width: 512,
  height: 512,
  backgroundColor: "#333333",
  type: Phaser.AUTO,
  parent: "survival-game",
  scene: [MainScene],
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
};

function App() {
  const game = usePhaserGame(config);
}

export default App;
