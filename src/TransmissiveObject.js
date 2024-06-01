import { MeshTransmissionMaterial, useFBO, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react';
import { useControls } from 'leva'
import * as THREE from 'three'

export default function TransmissiveObject()
{
    const seeThroughObject = useRef();
    const buffer = useFBO();
    
    const rotationSpeed = 0.05; // Rotations per second

    useFrame((state, delta) => 
        {
            if (seeThroughObject.current) {
                // This line will continuously rotate the object around the Z axis
                seeThroughObject.current.rotation.z += rotationSpeed * delta;
                seeThroughObject.current.rotation.y += rotationSpeed * delta;
            }

            seeThroughObject.current.visible = false;
            state.gl.setRenderTarget(buffer);
            state.gl.render(state.scene, state.camera);
            state.gl.setRenderTarget(null);
            seeThroughObject.current.visible = true;
        }
    );

    const { envMapIntensity } = useControls('environment map', { 
        envMapIntensity: { value: 1, min: 0, max: 12} 
    });

    const { transmission } = useControls('transmission', { 
        transmission: { value: 3, min: 0, max: 4} 
    });

    const { roughness } = useControls('roughness', { 
        roughness: { value: 0, min: 0, max: 1} 
    });

    return <>
        <group
        >
            <mesh
                ref={ seeThroughObject }
                scale={[1, 1, 6]}
                position-y={ 0 }
                position-z={ -0.25 }
                rotation={[0, Math.PI / 2, 0]} // Rotate 90 degrees around Y-axis
                >
                <torusGeometry
                    rotateZ={Math.PI / 4}
                    //args={ [1, 1, 1] }
                />
                <MeshTransmissionMaterial 
                    transmission={transmission}
                    roughness={roughness}
                    thickness={0.01}
                    normalScale={[0.4, 0.4]}
                    color={"white"} 
                    envMapIntensity={envMapIntensity}
                    buffer={buffer.texture}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    </>
}