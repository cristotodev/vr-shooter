import { create } from "zustand";
import { PositionalAudio, Text } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { PositionalAudio as PAudio } from "three";

type ScoreStore = {
    score: number;
    setScore: () => void;
}

export const useScoreStore = create<ScoreStore>((set) => ({
    score: 0,
    setScore: () => set((state) => ({ score: state.score + 10 })),
}));

export const Score = () => {
    const score = useScoreStore((state) => state.score);
    const soundRef = useRef<PAudio>(null);

    useEffect(() => {
        if(score > 0) {
            const scoreSound = soundRef.current!;
            if(scoreSound.isPlaying) scoreSound.stop();
            scoreSound.play();
        }
    }, [score]);

    const formatScoreText = (score: number) => {
        const clampedScore = Math.max(0, Math.min(score, 9999));
        return clampedScore.toString().padStart(4, "0");
    }

    return (
        <Text
            color={0xffa276}
            font="SpaceMono-Bold.ttf"
            fontSize={0.52}
            anchorX="center"
            anchorY="middle"
            position={[0, 0.67, -1.44]}
            quaternion={[-0.4582265217274104, 0, 0, 0.8888354486549235]}
        >
            {formatScoreText(score)}
            <PositionalAudio ref={soundRef} url="score.ogg" loop={false}/>
        </Text>
    );
};
