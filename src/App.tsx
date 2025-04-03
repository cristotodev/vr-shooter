import { Environment, Gltf, PerspectiveCamera } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

import { Canvas, useFrame } from "@react-three/fiber";
import { Gun } from "./gun";
import { Bulllets } from "./bullet";
import { Target } from "./targets";
import { Score } from "./score";
import gsap from "gsap";

const GsapTicker = () => {
  useFrame(() => {
    gsap.ticker.tick();
  });
  return null;
};


const xrStore = createXRStore({
  emulate: {
    controller: {
      left: {
        position: [-0.15649, 1.43474, -0.38368],
        quaternion: [
          0.14766305685043335, -0.02471366710960865, -0.0037767395842820406,
          0.9887216687202454,
        ],
      },
      right: {
        position: [0.15649, 1.43474, -0.38368],
        quaternion: [
          0.14766305685043335, 0.02471366710960865, -0.0037767395842820406,
          0.9887216687202454,
        ],
      },
    },
  },
  controller: {
    right: Gun,
    left: Gun
  }
});

const App = () => {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <color args={[0x808080]} attach={"background"}></color>
        <PerspectiveCamera makeDefault position={[0, 1.6, 2]} fov={75} />
        <Environment preset="warehouse" />
        <Bulllets />
        <Gltf src="spacestation.glb" />
        <Target targetIdx={0} />
        <Target targetIdx={1} />
        <Target targetIdx={2} />
        <Score />
        <GsapTicker />
        <XR store={xrStore}></XR>
      </Canvas>
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <button
          onClick={() => xrStore.enterVR()}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "20px",
          }}
        >
          Enter VR
        </button>
      </div>
    </>
  );
};

export default App
