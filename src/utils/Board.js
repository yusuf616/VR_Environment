import { BoxComponent,_BoxComponent,TextPlane,_TextPlane } from "./utils";
import { THREE } from "./utils";

const txt='Hello world!\nmy name is Board'

export const Board=({
    scale=[1,1,1],
    position=[0,0,0],
    rotation=[0,0,0]
})=>{

    return(<group position={position} rotation={rotation} scale={scale} name="board">
        <BoxComponent position={[0,1,0]} scale={[1,0.05/scale[1],0.05]} img="boardwood01.jpg"/>
        <BoxComponent position={[0,0,0]} scale={[1,0.05/scale[1],0.05]} img="boardwood01.jpg"/>
        <BoxComponent position={[-0.5+0.05/(scale[0]*2),0,0]} scale={[0.05/scale[0],1,0.05]} img="boardwood01.jpg"/>
        <BoxComponent position={[0.5-0.05/(scale[0]*2),0,0]} scale={[0.05/scale[0],1,0.05]} img="boardwood01.jpg"/>
        <TextPlane scale={[.99,1,0.02]} contentScale={scale}  text={txt}/>
        <TextPlane scale={[.99,1,0.02]} contentScale={scale}  rotation={[0,Math.PI,0]}/>
        {/* <BoxComponent scale={[.99,1,0.02]} color={'#fff'} contentScale={scale} text={txt} roughness={0} metalness={0.4} /> */}
    </group>);
}


export const _Board=({
    scale=[1,1,1],
    position=[0,0,0],
    rotation=[0,0,0],
    lookAt=null
})=>{
    const _scale=[1,1,1];
    const group=new THREE.Group();
    group.add(_BoxComponent({
        position:[0,1,0],
        scale:[1,0.05/(_scale[1]+0.01),0.05],
        img:"boardwood01.jpg"
    }))

    group.add(_BoxComponent({
        position:[0,0,0],
        scale:[1,0.05/(_scale[1]+0.01),0.05],
        img:"boardwood01.jpg"
    }))

    group.add(_BoxComponent({
        position:[-0.5+0.05/((_scale[1]+0.01)*2),0,0],
        scale:[0.05/(_scale[1]+0.01),1,0.05],
        img:"boardwood01.jpg"
    }))
    group.add(_BoxComponent({
        position:[0.5-0.05/((_scale[1]+0.01)*2),0,0],
        scale:[0.05/(_scale[1]+0.01),1,0.05],
        img:"boardwood01.jpg"
    }))

    group.add(_TextPlane({
     
        contentScale:_scale,
        text:txt
    }))

    group.add(_TextPlane({
        contentScale:_scale,
        rotation:[0,Math.PI,0]
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

    return group;
}
