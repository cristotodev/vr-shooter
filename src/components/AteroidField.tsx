import { PointMaterial, Points } from "@react-three/drei";
import * as random from "maath/random";

export const AsteroidField = () => {
    const particles = Float32Array.from(random.inSphere(new Float32Array(1000), {radius: 50}));
    return (
        <Points positions={particles} rotation-x={Math.PI / 2}>
            <PointMaterial 
                transparent
                color={'#ffaacc'}
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </Points>
    );
}