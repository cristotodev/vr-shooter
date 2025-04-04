import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import { useXR } from "@react-three/xr";

export const CountDownTimer = ({ initialTime = 60 }) => {
    const { session } = useXR();
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const textRef = useRef<Mesh>(null);
    const { camera } = useThree();

    const vibrateControllers = useCallback(async (intensity: number, duration: number) => {
        if (!session) return

        try {
            await Promise.all(
                Array.from(session.inputSources).map(async (inputSource) => {
                    console.log(inputSource.gamepad?.hapticActuators)
                    if (inputSource.gamepad?.hapticActuators?.[0]) {
                        await inputSource.gamepad.hapticActuators[0].pulse(intensity, duration)
                    }
                }
                ));
        } catch (error) {
            console.warn('Error al vibrar mandos:', error)
        }
    }, [session])

    useEffect(() => {
        if (timeLeft <= 10 && timeLeft > 0) {
            const intensity = 0.3 + ((10 - timeLeft) * 0.07)
            const duration = 100 + ((10 - timeLeft) * 30)

            vibrateControllers(intensity, duration)
        }

        if (timeLeft === 0) {
            vibrateControllers(0.9, 800)
        }
    }, [timeLeft, vibrateControllers])

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