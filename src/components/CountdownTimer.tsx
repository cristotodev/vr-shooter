import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { Mesh, Vector3 } from "three";

export const CountDownTime = ({ initialTime = 60 }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const textRef = useRef<Mesh>(null);

    const { camera } = useThree();
    useFrame(() => {
        if (textRef.current) {
            textRef.current.position.copy(camera.position).add(camera.getWorldDirection(new Vector3(0, 0, -1)).add(new Vector3(0, 0.6, 0)));
            textRef.current.quaternion.copy(camera.quaternion);
        }
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    // TODO Implementar el fin del juego
                    console.log("¡Tiempo agotado!");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Text
            ref={textRef}
            fontSize={timeLeft <= 10 ? 0.2 : 0.1}
            color={timeLeft <= 10 ? "red" : "white"}
            anchorX="center"
            anchorY="top"
        >
            {`⏱️${timeLeft}s`}
        </Text>
    );
}