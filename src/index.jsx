import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {
    const [roughness, setRoughness] = useState(0);

    const handleWheel = (event) => {
        const maxRoughness = 100;
        let newRoughness = event.deltaY * 10 - roughness;
        newRoughness = Math.max(0, Math.min(newRoughness, maxRoughness));
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
