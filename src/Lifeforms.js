import React, { useState } from "react";
import * as THREE from "three";
import url from "/002-r.mp4";

export default function Lifeforms() 
{
    const [video] = useState(() => {
        const vid = document.createElement("video");
        vid.src = url;
        vid.crossOrigin = "Anonymous";
        vid.width = 3540; // Set desired video width
        vid.height = 1920; // Set desired video height
        vid.loop = true;
        vid.muted = true;
        vid.playbackRate = 1.0; // Slow down the video to half speed
        vid.play();
        return vid;
    });
    
    return <>
        <mesh 
            rotation={[0, 0, 0]} 
            position={[0, 0, -5]}
            scale={[5, 5, 5]}
        >
            <sphereGeometry />
            <meshStandardMaterial emissive={"green"} side={THREE.BackSide}>
                <videoTexture attach="map" args={[video]} />
                <videoTexture attach="emissiveMap" args={[video]} />
            </meshStandardMaterial>
        </mesh>
    </>
}