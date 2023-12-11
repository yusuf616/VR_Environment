/* eslint-disable react/jsx-pascal-case */
import { useRef ,useEffect, useState,forwardRef} from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as utils from './utils/utils'
import {Sky} from '@react-three/drei'
import { Chair,_Chair } from './utils/Chair'
import { Board, _Board } from './utils/Board'
import { Tree01, _Tree01 } from './utils/Tree'
import { SetCrystla } from './utils/SetCrystla'
import { ObjectRenderer } from './utils/ObjectRenderer'
import { _3DOptions } from './utils/OptionGepmetry'
import TWEEN from '@tweenjs/tween.js'
// const blocks=[
//     "clay.png",
//     "cobblestone.png",
//     "stonebrick.png"
// ]



const Main_Scene=forwardRef(({
    scale=[1,1,1]
},ref)=>{
    return (<group scale={scale}>
        <_3DOptions
            position={[0,2,-4]}
            lookAt={[0,0,0]}
            ref={ref}
            scale={[.4,.4,.4]}
            title="Scenes"
            options={['Scene1','Scene2']}
        />
    </group>)
})


const Scene01=forwardRef(({
    scale=[1,1,1]
},ref)=>{
    const {gl}=useThree();
    const chiarsRef=useRef([]);
    const treesRef=useRef([]);
    
    const [update,setUpdate]=useState(true);
    useEffect(()=>{
        treesRef.current=[]
        chiarsRef.current=[]
        
        for(let i=0;i<2;i++)
            for(let j=0;j<5;j++)
                chiarsRef.current.push(<Chair key={i*5+j} scale={[.9,1,.9]} position={[j-2,0,i+2]}/>)
        
        for(let i=0;i<5;i++)
            treesRef.current.push(<Tree01 key={i} position={[-4+Math.random()/3,0,i*2-4+Math.random()/3]}/>)
        
        gl.shadowMap.enabled=true;
        
        setUpdate(!update);
    },[])
   
    return(<group scale={scale}>
    
        <_3DOptions
            position={[3,2,-4]}
            lookAt={[0,0,0]}
            ref={ref}
            scale={[.4,.4,.4]}
            title="Scenes"
            options={['Main_Scene','Scene2']}
        />
    
        <Board scale={[3,1.3,1]} position={[0,0.5,-2]}/>
        {chiarsRef.current.map(item=>item)}
        {treesRef.current.map(item=>item)}
        <SetCrystla
            position={[0,2.25,-2]}
            scaleItem={[0.25,0.25,0.25]}
            distanceItems={1.2}
            itemNumber={4}
            rotat={false}
        />
        <ObjectRenderer scale={[1.3,1.3,1.3]} position={[-1.8,0.67,-1.3]} rotation={[0,Math.PI/5,0]}/>
        
    </group>)
})

const objects={
    "Chair":_Chair,
    "Board":_Board,
    "Tree":_Tree01,
}

const Scene02=forwardRef(({
    scale=[1,1,1]
},ref)=>{
    const optionRef=useRef(null);
    const objectsGroupRef=useRef(null);
    const objectRef=useRef([]);
    const locRef=useRef(false);
    const intrevalLocRef=useRef(false);
    
    useFrame(()=>{
        TWEEN.update();
        if(!locRef.current){
            if(optionRef.current==='Clear')
                Clear()
            else if(objects[optionRef.current])
                Add()
            optionRef.current=null;
        }
        
    })

    const Clear=()=>{
        locRef.current=!locRef.current;
        objectRef.current.forEach(item=>{
            new TWEEN.Tween(item.scale)
            .to({
                x:0,
                y:0,
                z:0
            },2000)
            .easing(TWEEN.Easing.Exponential.Out)
            .start()
        })
        intrevalLocRef.current=setInterval(()=>{
            locRef.current=!locRef.current;
            objectsGroupRef.current.clear()
            objectRef.current=[]
            clearInterval(intrevalLocRef.current)
        },2000)
    }

    const Add=()=>{
        locRef.current=!locRef.current;
        objectRef.current.push(
            objects[optionRef.current]({
                scale:[0,0,0],
                position:[4,3,-4]
            })
        );
        objectsGroupRef.current.add(objectRef.current[objectRef.current.length-1]);
        optionRef.current=null;
        new TWEEN.Tween(objectRef.current[objectRef.current.length-1].scale)
            .to({
                x:1,
                y:1,
                z:1
            },4000)
            .easing(TWEEN.Easing.Exponential.Out)
            .start()

        new TWEEN.Tween(objectRef.current[objectRef.current.length-1].position)
            .to({
                x:(Math.random()-0.5)*10,
                y:0,
                z:(Math.random()-0.5)*10
            },4000)
            .easing(TWEEN.Easing.Exponential.Out)
            .start()
    

        intrevalLocRef.current=setInterval(()=>{
            locRef.current=!locRef.current
            clearInterval(intrevalLocRef.current)
        },4000)
    }

    return(<group name='scene02' scale={scale}>
        <_3DOptions
            position={[3,2,-4]}
            lookAt={[0,0,0]}
            ref={ref}
            scale={[.4,.4,.4]}
            title="Scenes"
            options={['Main_Scene','Scene2']}
        />
        <_3DOptions
            position={[4,3,-4]}
            lookAt={[0,0,0]}
            ref={optionRef}
            scale={[.4,.4,.4]}
            title='Objects'
            options={['Chair','Board','Tree','SetCrystla','Clear']}
        />
        <group ref={objectsGroupRef}></group>    
    </group>);
})





export const Scene=({
    scale=[1,1,1]
})=>{
    const optionRef=useRef("Main_Scene");
    const mySceneRef=useRef("Main_Scene");
    const groupRef=useRef(null);
    const [update,setUpdate]=useState(true);
    useFrame(()=>{
        if(mySceneRef.current!==optionRef.current){
            console.log(optionRef.current)
            new TWEEN.Tween(groupRef.current.children[3].scale)
                .to({
                    x:0,
                    y:0,
                    z:0
                },4000)
                .easing(TWEEN.Easing.Exponential.Out)
                .start()
            mySceneRef.current=optionRef.current
            // group.remove()
            
            setTimeout(()=>{
                groupRef.current.remove(groupRef.current.children[3])
                setUpdate(!update);
            },4000);
            console.log(groupRef.current)
            
        }
    })
    useEffect(()=>{
        new TWEEN.Tween(groupRef.current.children[3].scale)
        .to({
            x:1.5,
            y:1.5,
            z:1.5
        },4000)
        .easing(TWEEN.Easing.Exponential.In)
        .start()
    },[update]);
    const _scenes={
        "Main_Scene":<Main_Scene ref={optionRef} scale={[0,0,0]}/>,
        "Scene1":<Scene01 ref={optionRef} scale={[0,0,0]}/>,
        "Scene2":<Scene02 ref={optionRef} scale={[0,0,0]}/>
    }

    return(<group ref={groupRef} name='Main_Scene' scale={scale}>
        <Sky/>
        <mesh>
            <primitive object={new utils.THREE.GridHelper(20,20)}/>
        </mesh>
        <utils.BasePlane x={20} y={20} />
        {_scenes[mySceneRef.current]}
    </group>);
}

