import { useEffect, useRef, useState } from "react";
import { THREE } from "./utils";

export const Tree01=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0]
})=>{
    const ref=useRef(null);
    useEffect(()=>{
        ref.current.add(_Branches({position:[0,2.5,0],scale:[1.5,1.5,1.5]}))
        ref.current.add(_Stump({scale:[0.2,0.4,0.2], img:"treeStump01"}))
    })
    return(<group ref={ref} name="tree01" position={position} scale={scale} rotation={rotation}>
        {/* <Stump scale={[0.2,0.4,0.2]} img="treeStump01"/> */}
        {/* <Branches position={[0,2,0]} scale={[1.5,1.5,1.5]}/> */}
    </group>);
}


export const _Tree01=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0]
})=>{
    const group=new THREE.Group();

    group.add(_Branches({position:[0,2.5,0],scale:[1.5,1.5,1.5]}))
    group.add(_Stump({scale:[0.2,0.4,0.2], img:"treeStump01"}));
    group.scale.x=scale[0]
    group.scale.y=scale[1]
    group.scale.z=scale[2]

    group.rotation.x=rotation[0]
    group.rotation.y=rotation[1]
    group.rotation.z=rotation[2]

    group.position.x=position[0]
    group.position.y=position[1]
    group.position.z=position[2]

    return  group;
}

const _Branches=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img="TreeBranches.jpg"
})=>{
    const group=new THREE.Group();
    const texture=new THREE.TextureLoader().load('blocks/'+img);
    const BranchesPeci=({
        position=[0,0,0],
        scale=[1,1,1]
    })=>{
        const mesh=new THREE.Mesh();
        
        mesh.geometry=new THREE.SphereGeometry(0.3,10,10)
        mesh.material=new THREE.MeshPhysicalMaterial({
            side:THREE.DoubleSide,
            map:texture 
        })

        mesh.scale.x=scale[0]
        mesh.scale.y=scale[1]
        mesh.scale.z=scale[2]
    
        mesh.position.x=position[0]
        mesh.position.y=position[1]
        mesh.position.z=position[2]
        return mesh;
    }
    const rand=Math.random;
    for(let i=0;i<15;i++){
        const a=rand()+1;
        const b=rand()+1;
        const c=rand()+1;
        const a1=rand()/2-0.25;
        const b1=rand()/2-0.25;
        const c1=rand()/2-0.25;
        group.add(BranchesPeci({
            scale:[b,a,c],  
            position:[a1,b1,c1]
        }))
    }
    group.scale.x=scale[0]
    group.scale.y=scale[1]
    group.scale.z=scale[2]

    group.rotation.x=rotation[0]
    group.rotation.y=rotation[1]
    group.rotation.z=rotation[2]

    group.position.x=position[0]
    group.position.y=position[1]
    group.position.z=position[2]
    return group;
}


const Stump=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img="treeStump01"
})=>{
    const ref=useRef(null);

    useEffect(()=>{
        ref.current.position.y= position[1]+scale[1]/2;
    },[])
    return(<mesh ref={ref} scale={scale} position={position} rotation={rotation} >
        <mesh>
            <cylinderGeometry args={[.8,1.5,1,32]} />
            <meshLambertMaterial 
                map={new THREE.TextureLoader().load('blocks/'+img+'/basecolor.jpg')}
                normalMap={new THREE.TextureLoader().load('blocks/'+img+'/normal.jpg')}
                roughnessMap={new THREE.TextureLoader().load('blocks/'+img+'/roughness.jpg')}
                aoMap={new THREE.TextureLoader().load('blocks/'+img+'/ambientOcclusion.jpg')}
                displacementMap={new THREE.TextureLoader().load('blocks/'+img+'/height.jpg')}

            />
        </mesh> 
        <mesh position={[0,2.5,0]}>
            <cylinderGeometry args={[.6,.8,4,32]} />
            <meshLambertMaterial 
                map={new THREE.TextureLoader().load('blocks/treeStump01/basecolor.jpg')}
                normalMap={new THREE.TextureLoader().load('blocks/treeStump01/normal.jpg')}
                roughnessMap={new THREE.TextureLoader().load('blocks/treeStump01/roughness.jpg')}
                aoMap={new THREE.TextureLoader().load('blocks/treeStump01/ambientOcclusion.jpg')}
                lightMap={new THREE.TextureLoader().load('blocks/treeStump01/height.jpg')}
                
            />
        </mesh>
        
    </mesh>)
}



const _Stump=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img="wood01.jpg"
})=>{
    const group=new THREE.Group();
    const material=new THREE.MeshLambertMaterial({
        map:new THREE.TextureLoader().load('blocks/'+img+'/basecolor.jpg'),
        normalMap:new THREE.TextureLoader().load('blocks/'+img+'/normal.jpg'),
        roughnessMap:new THREE.TextureLoader().load('blocks/'+img+'/roughness.jpg'),
        aoMap:new THREE.TextureLoader().load('blocks/'+img+'/ambientOcclusion.jpg'),
        displacementMap:new THREE.TextureLoader().load('blocks/'+img+'/height.jpg'),
    })
    var cylender=new THREE.Mesh();
    var cylender1=new THREE.Mesh();

    cylender.geometry=new THREE.CylinderGeometry(.8,1.5,1,32);
    cylender.material=material;

    cylender1.geometry=new THREE.CylinderGeometry(.6,.8,4,32);
    cylender1.material=material
    cylender1.position.y=2.5
    group.add(cylender);
    group.add(cylender1);

    group.scale.x=scale[0]
    group.scale.y=scale[1]
    group.scale.z=scale[2]

    group.rotation.x=rotation[0]
    group.rotation.y=rotation[1]
    group.rotation.z=rotation[2]

    group.position.x=position[0]
    group.position.y=position[1]+scale[1]/2
    group.position.z=position[2]
    return group;
}