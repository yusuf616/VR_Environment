/* eslint-disable react/jsx-pascal-case */
import { Text } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import {forwardRef, useEffect, useRef} from 'react'
import TEWWN from '@tweenjs/tween.js';
import {Interactive}from '@react-three/xr'

export const _3DOptions=forwardRef(({
    position=[0,3,0],
    rotation=[0,0,0],
    scale=[1,1,1],
    options=['op1','op2','op3'],
    title='options',
    margin=0.2,
    lookAt=null
},ref)=>{
    const titleRef=useRef(false);
    const groupRef=useRef(null);
    useEffect(()=>{
        if(lookAt!==null){
            console.log(Math.atan((groupRef.current.position.z-lookAt[2])/(groupRef.current.position.x-lookAt[0])))
            groupRef.current.rotation.y=Math.atan((groupRef.current.position.x-lookAt[0])/(groupRef.current.position.z-lookAt[2]))
        }
    },[])
    return(<group
        ref={groupRef} 
        rotation={rotation}
        position={position}
        scale={scale}    
    >
        <_optionGeometry
            ref={titleRef} 
            text={title}
            position={[0,0,0]}
            type='title'
        />
        {options.map((item,i)=>{
            return(<_optionGeometry 
                ref={ref}
                key={i}
                position={[
                    0,
                    (i+1)+margin*(i+1),
                    0
                ]}
                text={item}
                titleRef={titleRef}
            />)
        })}
    </group>)
})


const _optionGeometry=forwardRef(({
    scale=[2,1,1],
    color='#fff',
    text='option',
    textScale=0.2,
    textColor='#000',
    position=[0,0,0],
    type='option',
    titleRef={current:false},
  
},ref)=>{
    const moveingRef=useRef(false)
    const moveingIntervalRef=useRef(null)
    const meshRef=useRef(null)
    const textRef=useRef(null)
    const ntervalRef=useRef(null)
    const moveRef=useRef('down');
 

    const handleClick=()=>{
        if(!moveingRef.current){
            if(type==='title'){
                ref.current=!ref.current;
            }else if(titleRef.current){
                ref.current=text
            }
        }
    }

    useFrame(()=>{
        TEWWN.update();
        if(titleRef.current&&moveRef.current==='down'){
            up();
            moveingIntervalRef.current=setInterval(()=>{
                moveingRef.current=false
                clearInterval(moveingIntervalRef.current)
            },5000);

        }
        if(!titleRef.current&&moveRef.current==='up'){
            down();
            moveingIntervalRef.current=setInterval(()=>{
                moveingRef.current=false
                clearInterval(moveingIntervalRef.current)
            },5000);
        }
    })

    const up=()=>{
        moveRef.current='up';
        new TEWWN.Tween(meshRef.current.position)
        .to({
            y:-position[1]
        },position[1]*500)
        .easing(TEWWN.Easing.Linear.None)
        .start()

        ntervalRef.current=setInterval(()=>{
            meshRef.current.scale.x=.9
            meshRef.current.scale.y=.9
            meshRef.current.scale.z=.9
            clearInterval(ntervalRef.current)
        },100)
    }
    const down=()=>{
        moveRef.current='down';
        new TEWWN.Tween(meshRef.current.position)
        .to({
            y:0
        },position[1]*500)
        .easing(TEWWN.Easing.Linear.None)
        .start()
        ntervalRef.current=setInterval(()=>{
            meshRef.current.scale.x=0
            meshRef.current.scale.y=0
            meshRef.current.scale.z=0
            clearInterval(ntervalRef.current)
        },position[1]*500)
    }
    useEffect(()=>{
        if(type==='title'){
            
        }
    })
    return(<Interactive
        onSelect={handleClick}
    >
        <mesh
            ref={meshRef}
            scale={type!=='title'?[0,0,0]:[1,1,1]}
            position={[position[0],0,position[2]]}
            onClick={handleClick}
        >
            <planeGeometry args={scale}/>
            <meshPhysicalMaterial
                transparent={true}
                opacity={0.7}
                emissiveIntensity={1}
                color={'#fff'}
                emissive={color}
                metalness={0.7}
                side={2}
            />
            <Text 
                ref={textRef}
                scale={textScale}
                color={textColor}
                position={[0,0,0.01]}
                fontSize={type==='title'?1.5:1.2}
            >{text}</Text>
        </mesh>
    </Interactive>)
})