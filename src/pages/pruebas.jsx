import React, { useRef, useState, useEffect, Suspense } from "react";
//R3F
import { Canvas, useFrame } from "react-three-fiber";
// Deai - R3F
import { softShadows, MeshWobbleMaterial, OrbitControls } from "drei";
import { Html, useProgress, useGLTFLoader } from "drei";
// Styles
import "../App.scss";
// React Spring
import { useSpring, a } from "react-spring/three";

// soft Shadows
softShadows();

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return <primitive object={gltf.scene} dispose={null} />;
}

const Lights = () => {
  return (
    <>
      {/* Ambient Light illuminates lights for all objects */}
      <ambientLight intensity={0.3} />
      {/* Diretion light */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Spotlight Large overhead light */}
      <spotLight intensity={1} position={[1000, 0, 0]} castShadow />
    </>
  );
};

const SpinningMesh = ({ position, color, speed, args }) => {
  //ref to target the mesh
  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach='material'
        factor={0.6}
      />
    </a.mesh>
  );
};

const Pruebas = () => {
  return (
    <>
      {/* Our Scene & Camera is already built into our canvas */}
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}>
        {/* This light makes things look pretty */}
        <ambientLight intensity={0.3} />
        {/* Our main source of light, also casting our shadow */}
        <Lights/>
        <group>
          {/* This mesh is the plane (The floor) */}
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
            receiveShadow>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          <SpinningMesh
            position={[0, 1, 0]}
            color='lightblue'
            args={[3, 2, 1]}
            speed={2}
          />
          <Suspense fallback={null}>
            <mesh
              position={[-2, 1, -5]}
              receiveShadow>
              <Model url={'/models/Honda_B.gltf'} />
            </mesh>
            <mesh
              position={[5, -50, -2]}
              receiveShadow>
              <Model url={'/models/Honda_Negro.gltf'} />
            </mesh>
            <mesh
              position={[0, -100, 0]}
              receiveShadow>
              <Model url={'/models/Honda_Amarillo.gltf'} />
            </mesh>
          </Suspense>
        </group>
        {/* Allows us to move the canvas around for different prespectives */}
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Pruebas;
