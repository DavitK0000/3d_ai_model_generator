// pages/ThreeScene.js
'use client'

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, GizmoHelper, GizmoViewport } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three'; // 'a' stands for animated
import { useEffect, useState } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'; // Import the FBX loader
import { TextureLoader } from 'three'; // Import the Texture loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function AnimatedGrid() {
    // State to trigger the animation only once after the component mounts
    const [startAnimation, setStartAnimation] = useState(false);

    // Use React Spring for animating the grid's position and scale
    const { position, scale } = useSpring({
        position: startAnimation ? [0, 0, 0] : [0, -5, 0], // From below the screen (y = -5) to its normal position
        scale: startAnimation ? [1, 1, 1] : [10, 10, 10],  // From large scale (10x) to normal scale (1x)
        config: { mass: 1, tension: 200, friction: 50 },  // Tweak animation speed and behavior
    });

    // Start the animation when the component mounts (on first load)
    useEffect(() => {
        setStartAnimation(true);
    }, []);

    return (
        <a.group position={position} scale={scale}> {/* 'a.group' is an animated group */}
            <gridHelper args={[10, 10, 'white', 'gray']} />
            {/* <axesHelper args={[5]} /> */}
        </a.group>
    );
}

// FBX Model Loader component
function FBXModel({ path, texturePath, position }) {
    const fbx = useLoader(FBXLoader, path); // Load the FBX model
    const texture = useLoader(TextureLoader, texturePath); // Load the texture

    // Traverse the FBX model and apply the texture to all mesh materials
    useEffect(() => {
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });
    }, [fbx, texture]);

    // Adjust the position of the model
    return <primitive object={fbx} scale={[0.01, 0.01, 0.01]} position={position} />;
}

const GLBModel = ({ path, texturePath, position }) => {
    // Load the GLB model
    if(path == null)
        return;
    const gltf = useLoader(GLTFLoader, path);
    // Conditionally load the texture if texturePath is provided
    const texture = texturePath ? useLoader(TextureLoader, texturePath) : null;

    // Traverse the GLB model and apply the texture to all mesh materials if available
    useEffect(() => {
        gltf.scene.traverse((child) => {
            if (child.isMesh && texture) {
                // child.material.map = texture;
                child.material.needsUpdate = true;
            }
        });
    }, [gltf, texture]);

    // Adjust the position of the model
    return <primitive object={gltf.scene} scale={[2, 2, 2]} position={position} />;
}

interface ThreeSceneProps {
    modelUrl: string | null; // Accept modelUrl prop
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ modelUrl }) => {
    return (
        <div style={{ height: '100%', width: '100%' }} className='three-scene'>
            <Canvas camera={{ position: [10, 10, 10], fov: 50, near: 0.1, far: 1000 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />

                {/* FBX Model 
                <FBXModel path="/models/chibi_knight_0921172038.fbx"
                    texturePath="/models/chibi_knight_0921172038.png"  // Replace with your actual texture path
                    position={[0, 1, 0]} /> {/* Adjust the path as per your project structure */}

                {/* GLB Model */}
                <GLBModel path={modelUrl}
                    position={[0, 1, 0]} /> {/* Adjust the path as per your project structure */}

                {/* Animated Grid */}
                <AnimatedGrid />

                {/* Controls and Gizmo */}
                <OrbitControls />
                {/* <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport />
                </GizmoHelper> */}
            </Canvas>
        </div>
    );
}

export default ThreeScene;