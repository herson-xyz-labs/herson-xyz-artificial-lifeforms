import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useSpring, a } from '@react-spring/three';
import { useControls } from 'leva';
import { useEffect, useState } from 'react';

export default function ALText( {roughness} ) {
    const { viewport } = useThree()
    const { color, maxWidth, lineHeight, letterSpacing, textAlign } = useControls({
        color: { value: '#EC2D2D', label: 'Color' },
        maxWidth: { value: 90, min: 1, max: 100, label: 'Max Width' },
        lineHeight: { value: 0.75, min: 0.1, max: 10, step: 0.1, label: 'Line Height' },
        letterSpacing: { value: -0.08, min: -0.5, max: 1, step: 0.01, label: 'Letter Spacing' },
        textAlign: { value: 'left', options: ['left', 'right', 'center', 'justify'], label: 'Text Align' }
    })

    // Define the spring-animated properties
    const { position } = useSpring({
        position: [0, roughness * 10 - 4, 0], // Moves the text upwards as roughness increases
        config: { mass: 1, tension: 280, friction: 60 }
    });

    // Function to determine which text to display
    const getText = (roughness) => {
        if (roughness < 25) return "Artificial Lifeforms";
        else if (roughness < 50) return "coming soon";
        else if (roughness < 75) return "launch in 2024";
        else return "stay tuned";
    };

    return (
        <a.group>
            <Text
                color={color}
                fontSize={1.0}
                maxWidth={(viewport.width / 2)}
                lineHeight={lineHeight}
                letterSpacing={letterSpacing}
                textAlign={'left'}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                anchorX="center"
                anchorY="center"
                position={[0, 0, -4]}
                >
                {getText(roughness)}
            </Text>
        </a.group>
    )
}
