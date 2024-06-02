import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useSpring, a } from '@react-spring/three';
import { useControls } from 'leva';
import { useEffect, useState, useCallback } from 'react';

export default function ALText( {roughness} ) {
    const { viewport } = useThree()

    // Define the spring-animated properties
    const { position } = useSpring({
        position: [0, roughness * 10 - 4, 0], // Moves the text upwards as roughness increases
        config: { mass: 1, tension: 280, friction: 60 }
    });

    const getTextProperties = (roughness) => {
        if (roughness < 25) {
            return {
                text: "'In the beginning, it was already a machine. It lay there, at the edge of the water, under the light of the sun…'",
                fontSize: 0.15,  // Smaller font size for longer text
                maxWidth: viewport.width / 4,  // Larger width to accommodate longer text
                lineHeight: 1.0,  // More line height for better readability
                letterSpacing: -0.05,  // Adjusted letter spacing
                textAlign: 'justify',  // Justified text for a cleaner look
                hyperlink: null // Replace with your URL
            };
        } else if (roughness < 50) {
            return {
                text: "Artificial Lifeforms",
                fontSize: 0.2,
                maxWidth: viewport.width / 2,
                lineHeight: 0.75,
                letterSpacing: -0.08,
                textAlign: 'left',
                hyperlink: null
            };
        } else if (roughness < 75) {
            return {
                text: "launch 2024",
                fontSize: 0.2,
                maxWidth: viewport.width / 2,
                lineHeight: 0.75,
                letterSpacing: -0.08,
                textAlign: 'left',
                hyperlink: null
            };
        } else {
            return {
                text: "learn more ->",
                fontSize: 0.2,
                maxWidth: viewport.width / 2,
                lineHeight: 0.75,
                letterSpacing: -0.08,
                textAlign: 'left',
                hyperlink: "https://docs.google.com/document/d/1GhOAdsSYsRVKgEUpJInzwBnYeahr4Wq2NGxZbqlok5Q/edit?usp=sharing" // Replace with your URL
            };
        }
    };

    const textProps = getTextProperties(roughness);
    const onTextClick = useCallback(() => {
        if (textProps.hyperlink) {
            window.open(textProps.hyperlink, '_blank');
        }
    }, [textProps.hyperlink]);

    return (
        <a.group>
            <Text
                color={'#EC2D2D'}
                fontSize={textProps.fontSize}
                maxWidth={textProps.maxWidth}
                lineHeight={textProps.lineHeight}
                letterSpacing={textProps.letterSpacing}
                textAlign={'left'}
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                anchorX="center"
                anchorY="center"
                position={[0, 0, -1.25]}
                onClick={onTextClick}
                cursor={textProps.hyperlink ? "pointer" : "auto"}
                >
                {textProps.text}
            </Text>
        </a.group>
    )
}
