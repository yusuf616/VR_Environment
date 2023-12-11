/* eslint-disable react/jsx-pascal-case */
import { useRef } from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {VRButton, XR,Controllers,Hands} from '@react-three/xr'
import {Physics} from '@react-three/cannon'
import {Scene} from './Scenes.js'





export const App=()=>{
   
    return(<div className="app">
        <Canvas >
            {/* <fog attach={'fog'} args={['#fff', 3, 12]} /> */}
            <ambientLight intensity={0.5}/>
            <spotLight   castShadow={true} position={[5,8,-2]} lookAt={[0,0,0]}/>
            <color attach={"background"} args={["#666"]}/>
            <OrbitControls/>
            <XR>
                <Controllers/>
                <Hands/>
                <Physics>
                    <Scene/>
                </Physics>
            </XR>
        </Canvas>
        <VRButton/>
    </div>);
}

