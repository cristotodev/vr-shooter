import { Environment, Gltf, PerspectiveCamera, Stars } from "@react-three/drei";
import { XR, createXRStore } from "@react-three/xr";

import { Canvas, useFrame } from "@react-three/fiber";
import { Gun } from "./components/Gun";
import { Bulllets } from "./components/Bullets";
import { Target } from "./components/Target";
import gsap from "gsap";
import { Score } from "./components/score";
import { AsteroidField } from "./components/AteroidField";

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
    left: Gun,
    teleportPointer: true
  },

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

        <XR store={xrStore}>
          <color args={[0x000000]} attach={"background"}></color>
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          

          <PerspectiveCamera makeDefault position={[0, 1.6, 2]} fov={75} />
          <Environment preset="warehouse" />
          <Gltf src="spacestation.glb" />

          <Bulllets />
          <Target targetIdx={0} />
          <Target targetIdx={1} />
          <Target targetIdx={2} />
          <Score />
          <AsteroidField />

          <GsapTicker />
        </XR>
      </Canvas>
      
    </>
  );
};

export default App
