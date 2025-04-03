import { PositionalAudio as PAudio, Quaternion, Vector3 } from "three";
import {
  useXRControllerButtonEvent,
  useXRInputSourceStateContext,
} from "@react-three/xr";
import { useBulletStore } from "./Bullets";
import { PositionalAudio, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";

export const Gun = () => {
  const state = useXRInputSourceStateContext("controller");
  const { scene } = useGLTF("blaster.glb");
  const soundRef = useRef<PAudio>(null);
  const gamepad = state.inputSource.gamepad!;

  // The scene is cloned to avoid modifying the original scene
  // when the gun is instantiated multiple times.
  const clonedScene = useMemo(() => {
    const newScene = scene.clone(true); 
    return newScene;
  }, [scene]);

  const bulletPrototype = clonedScene.getObjectByName("bullet")!;

  useXRControllerButtonEvent(state, "xr-standard-trigger", (state) => {
    if (state === "pressed") {
      useBulletStore
        .getState()
        .addBullet(
          bulletPrototype.getWorldPosition(new Vector3()),
          bulletPrototype.getWorldQuaternion(new Quaternion())
        );

        const laserSound = soundRef.current!;
        if(laserSound.isPlaying) laserSound.stop();
        laserSound.play();
        gamepad.hapticActuators[0]?.pulse(0.6, 100);
    }
  });

  return (
    <>
        <primitive object={clonedScene} />
        <PositionalAudio ref={soundRef} url="laser.ogg" loop={false}/>
    </>
  );
};

useGLTF.preload("blaster.glb");