import { OrbitControls, Environment } from "@react-three/drei";
import { useThree, extend } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from "three";
import TransmissiveObject from "./TransmissiveObject";
import Lifeforms from "./Lifeforms";
import ALText from "./ALText";

extend({ OrbitControls });

export default function Experience()
{
    const SetBackgroundColor = ({ color }) => {
        const { scene } = useThree();
    
        useEffect(() => {
            scene.background = new THREE.Color(color);
        }, [color, scene]);
    
        return null;
    };

    const SetCameraPosition = () => {
        const { camera } = useThree();

        useEffect(() => {
            camera.position.set(0, 0, 0.1); // Set camera position to (0, 0, 0)
            camera.lookAt(0, 0, 0); // Make sure the camera is looking at the center
        }, [camera]);

        return null;
    };

    return <>
        <OrbitControls />
        <SetCameraPosition />
        <Environment
            background 
            files={ './environmentMaps/1/hdri.hdr'}
        />
        <group>
            <Lifeforms />
            <TransmissiveObject />
            <ALText />
        </group>
    </>
}