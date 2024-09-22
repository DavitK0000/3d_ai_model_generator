'use client'
/* eslint-disable */

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface GLBModelLoaderProps {
    path : string | null;
    position : Array<number>;
}

const GLBModelLoader : React.FC<GLBModelLoaderProps>  = ({ path, position }) => {
    // Load the GLB model
    if(path == null)
        return;
    const gltf = useLoader(GLTFLoader, path);
    // Conditionally load the texture if texturePath is provided

    // Adjust the position of the model
    return <primitive object={gltf.scene} scale={[2, 2, 2]} position={position} />;
}

export default GLBModelLoader;