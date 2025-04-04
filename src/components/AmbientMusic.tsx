import { PositionalAudio } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { PositionalAudio as PAudio, } from "three";

export const AmbientMusic = () => {
    const soundRef = useRef<PAudio>(null);

    useEffect(() => {
        const sound = soundRef.current!;
        sound.setVolume(0.2);
        sound.play();
    }, []);

    return (
        <PositionalAudio ref={soundRef} url="sounds/ambient.ogg" loop autoplay />
    );
}