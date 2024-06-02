import { OrbitControls, Environment } from "@react-three/drei";
import { useThree, extend } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from "three";
import TransmissiveObject from "./TransmissiveObject";
import Lifeforms from "./Lifeforms";
import ALText from "./ALText";

extend({ OrbitControls });

export default function Experience({ roughness })
{
    const { scene, camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 0, 0.1); // Set camera position
        camera.lookAt(0, 0, 0); // Camera looks at the center
        //scene.background = new THREE.Color('#D40000'); // Set background color
    }, [camera, scene]);

    return <>
        {/* <OrbitControls /> */}
        <group>
            <Environment
                background 
                files={ './environmentMaps/1/hdri.hdr'}
            />
            <Lifeforms />
            <TransmissiveObject roughness={roughness} />
            <ALText roughness={roughness} />
        </group>
    </>
}