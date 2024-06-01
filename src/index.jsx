import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';

const root = ReactDOM.createRoot(document.querySelector('#root'));

const App = () => {
    return (
        <>
            <Canvas>
                <Experience />
            </Canvas>
        </>
    );
};

root.render(<App />);
