import { useRef,useEffect} from 'react';
import { BoxComponent,ExtrudeGeometry,_BoxComponent,_ExtrudeGeometry } from './utils';
import { THREE } from './utils';
import { useFrame } from '@react-three/fiber';

export const Chair=({
    scale=[1,1,1],
    position=[0,0,0],
    rotation=[0,0,0],
    lookAt=null
})=>{
    const groupRef=useRef(null);
    const legScale=[0.04,0.5,0.04]
    const seatScale=[0.44,0.02,0.44]
    useEffect(()=>{
        if(lookAt!==null){
            console.log(Math.atan((groupRef.current.position.z-lookAt[2])/(groupRef.current.position.x-lookAt[0])))
            groupRef.current.rotation.y=Math.atan((groupRef.current.position.x-lookAt[0])/(groupRef.current.position.z-lookAt[2]))
        }
    },[])


    return (<group ref={groupRef} name='chire' scale={scale} position={position} rotation={rotation}>
        <BoxComponent scale={legScale} position={[-0.2,0,0.2]}color={'#706'} img='wood01.jpg'/>
        <BoxComponent scale={legScale} position={[0.2,0,0.2]}color={'#706'} img='wood01.jpg'/>
        <BoxComponent scale={legScale} position={[-0.2,0,-0.2]}color={'#706'} img='wood01.jpg'/>
        <BoxComponent scale={legScale} position={[0.2,0,-0.2]}color={'#706'} img='wood01.jpg'/>
        {/* <BoxComponent scale={seatScale} position={[0,.5,0]} img='wood01.jpg'/>
        <BoxComponent scale={seatScale} position={[0,.72,0.21]} rotation={[-Math.PI/2,0,0]} img='wood01.jpg'/> */}
        <ExtrudeGeometry scale={seatScale} position={[0,.5,-0.22]} bevelSegments={6} color={'#755'} img='wood01.jpg'/>
        <ExtrudeGeometry scale={seatScale} position={[0,.52,0.23]} bevelSegments={6} color={'#955'} rotation={[-Math.PI/2,0,0]} img='wood01.jpg'/>
    
    </group>)
}

export const _Chair=({
    scale=[1,1,1],
    position=[0,0,0],
    rotation=[0,0,0],
    lookAt=null
})=>{
    
    const legScale=[0.04,0.5,0.04]
    const seatScale=[0.44,0.02,0.44]
    const group=new THREE.Group();
    group.add(_BoxComponent({
        scale:legScale,
        position:[-0.2,0,0.2],
        color:'#706',
        img:'wood01.jpg'
    }));

    group.add(_BoxComponent({
        scale:legScale,
        position:[0.2,0,0.2],
        color:'#706',
        img:'wood01.jpg'
    }));

    group.add(_BoxComponent({
        scale:legScale,
        position:[0.2,0,-0.2],
        color:'#706',
        img:'wood01.jpg'
    }));

    group.add(_BoxComponent({
        scale:legScale,
        position:[-0.2,0,-0.2],
        color:'#706',
        img:'wood01.jpg'
    }));

    group.add(_ExtrudeGeometry({
        scale:seatScale,
        position:[0,.5,-0.22],
        bevelSegments:6,
        color:'#755',
        img:'wood01.jpg'
    }))

    group.add(_ExtrudeGeometry({
        scale:seatScale,
        position:[0,.52,0.23],
        bevelSegments:6,
        color:'#755',
        rotation:[-Math.PI/2,0,0],
        img:'wood01.jpg'
    }))

    group.scale.x=scale[0]
    group.scale.y=scale[1]
    group.scale.z=scale[2]

    group.rotation.x=rotation[0]
    group.rotation.y=rotation[1]
    group.rotation.z=rotation[2]

    group.position.x=position[0]
    group.position.y=position[1]
    group.position.z=position[2]


    return group

}


