import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {
    const [roughness, setRoughness] = useState(0);

    const handleWheel = (event) => {
        // Define constants for sensitivity and maximum roughness
        const sensitivity = 0.1; // Adjust this to control how sensitive the scrolling is
        const maxRoughness = 100; // Maximum value for roughness

        // Calculate change based on wheel event
        let change = event.deltaY * sensitivity;

        // Update roughness based on the change, ensuring it does not automatically revert
        let newRoughness = roughness + change;

        // Clamp the new roughness value within the allowed range
        newRoughness = Math.max(0, Math.min(newRoughness, maxRoughness));

        // Update the roughness state
        setRoughness(newRoughness);
    };

    return (
        <>
            <Canvas onWheel={handleWheel}>
                <Experience roughness={roughness}/>
            </Canvas>
        </>
    );
};

root.render(<App />);
