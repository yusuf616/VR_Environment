import { THREE,Sphere } from "./utils"
import { useEffect, useRef } from "react"
import TWEEN from '@tweenjs/tween.js'
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import { SetCrystla } from "./SetCrystla"
import{Interactive} from '@react-three/xr'
export const ObjectRenderer=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    color='#fff'
})=>{
    
    const ref=useRef(null);
    const clickMeshRef=useRef(null);
    const shawRef=useRef(false);
    useFrame(()=>{
        TWEEN.update();
    })
    
    const handleShaw=()=>{
        if(!shawRef.current){
            shawRef.current=!shawRef.current;
            new TWEEN.Tween(ref.current.scale)
                .to({
                    x:scale[0],
                    z:scale[2]
                },2000)
                .easing(TWEEN.Easing.Exponential.Out)
                .start()
            // console.log(ref.current)
            new TWEEN.Tween(clickMeshRef.current.material.emissive)
                .to({
                    r:1
                },2000)
                .easing(TWEEN.Easing.Exponential.Out)
                .start()
        }else{
            shawRef.current=!shawRef.current;
            new TWEEN.Tween(ref.current.scale)
                .to({
                    x:0.01,
                    z:0.01
                },2000)
                .easing(TWEEN.Easing.Exponential.In)
                .start()

            new TWEEN.Tween(clickMeshRef.current.material.emissive)
                .to({
                    r:0
                },2000)
                .easing(TWEEN.Easing.Exponential.In)
                .start()
        }
    }

    return(<group
        position={position}
        rotation={rotation}
    >
        <Interactive
            onSelect={handleShaw}
        >
            <mesh 
                ref={clickMeshRef}
                position={[0,scale[1]/2+0.1,0]}
                onClick={handleShaw}
            >
                <cylinderGeometry args={[.2,.2,.2,32]}/>
                <meshPhysicalMaterial
                    emissiveIntensity={true}
                />
                <Text 
                    color={'#f0f'}
                    scale={0.2} 
                    position={[
                        0,
                        0.2,
                        0
                    ]}
                > 
                    Click 
                </Text>
            </mesh>
        </Interactive>
        <group
            ref={ref}
            scale={[0.01,scale[1],0.01]}
        >
            <Render/>
        </group>
    </group>)
}


const Render=({
    scale=[1,1,1,12],
    rotation=[0,0,0],
    position=[0,0,0],
    color='#fff'
})=>{
    const ref=useRef(null);
    useEffect(()=>{
        ref.current.geometry=new THREE.CylinderGeometry(0.2,1.2,1,32);
        ref.current.material=new THREE.MeshPhysicalMaterial({
            color:'#fff',
            emissive:color,
            emissiveIntensity:1,
            transparent:true,
            opacity:0.3,
            metalness:.5,
            roughness:0.5
        })
    },[])
    return(<mesh ref={ref} position={position} scale={scale} rotation={rotation}>
        <SetCrystla position={[0,-0.3,0]} scaleItem={[0.2,0.2,0.2]} distanceItems={0.5}/>
        {/* <Sphere/> */}
    </mesh>);
}