import { useRef,useEffect,useState,forwardRef} from 'react';
import * as THREE from 'three';
import { usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import TEWWN from '@tweenjs/tween.js'

export {THREE};

const blocks=[
    "clay.png",
    "cobblestone.png",
    "stonebrick.png"
]
export const BasePlane=({x=10,y=10})=>{
    const [ref]=usePlane(()=>({
        rotation:[-Math.PI/2,0,0]
    }))
    return(<mesh ref={ref}>
        <planeGeometry args={[x,y]}/>
        <meshLambertMaterial color={'#ff4'} clipShadows= {true} shadowSide={THREE.DoubleSide} side={THREE.DoubleSide }/>
        
    </mesh>)
}

export const Static_Box=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img="null.png"
})=>{
    const ref=useRef(null)
    const tuxture=new THREE.TextureLoader().load('blocks/'+blocks[Math.floor(Math.random()*2.99)])
    useEffect(()=>{
        if(position[1]<ref.current.scale.y/2){
            ref.current.position.y=ref.current.scale.y/2;
        }
    },[])
    return(<mesh scale={scale} rotation={rotation} ref={ref}>
        <boxGeometry />
        <meshStandardMaterial attach={'material'} map={tuxture}  />
       
    </mesh>)
}

export const BoxComponent=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img=null,
    color=null,
    metalness=.5,
    roughness=.5
})=>{
    const ref=useRef(null);
    const imgRef=useRef(img);
    const textureRef=useRef(new THREE.TextureLoader().load('blocks/'+img))
 
    useEffect(()=>{
        setObject();
    },[])

    const setObject=async()=>{
        ref.current.position.y= position[1]+scale[1]/2;
        ref.current.material=new THREE.MeshPhysicalMaterial({
            map:imgRef.current?textureRef.current:null,
            color:color,
            metalness:metalness,
            roughness:roughness,
            clipShadows: true,
            shadowSide:THREE.DoubleSide
        })
    }
    return(<mesh scale={scale} position={position} rotation={rotation} ref={ref}>
        <boxGeometry/>
    </mesh>)
}

export const _BoxComponent=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img=null,
    color=null,
    metalness=.5,
    roughness=.5
})=>{
    var imgRef=img;
    const textureRef=new THREE.TextureLoader().load('blocks/'+img);
    const geometry=new THREE.BoxGeometry();
    const material=new THREE.MeshPhysicalMaterial({
        map:imgRef?textureRef:null,
        color:color,
        metalness:metalness,
        roughness:roughness,
        clipShadows: true,
        shadowSide:THREE.DoubleSide
    })

    const mesh=new THREE.Mesh(geometry,material);

    mesh.scale.x=scale[0]
    mesh.scale.y=scale[1]
    mesh.scale.z=scale[2]

    mesh.rotation.x=rotation[0]
    mesh.rotation.y=rotation[1]
    mesh.rotation.z=rotation[2]

    mesh.position.x=position[0]
    mesh.position.y=position[1]+scale[1]/2;
    mesh.position.z=position[2]


    return(mesh)
}


export const TextPlane=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img=null,
    color=null,
    metalness=.5,
    roughness=.5,
    text=null,
    contentScale=[1,1,1]
})=>{
    const ref=useRef(null);
    const imgRef=useRef(img);
    const textureRef=useRef(new THREE.TextureLoader().load('blocks/'+img))
 
    useEffect(()=>{
        setObject();
    },[])

    const setObject=async()=>{
        if(text!==null){
            console.log(text)
            textureRef.current= await getCanvasTexture(text,contentScale);
            imgRef.current=true;
        }
        ref.current.position.y= position[1]+scale[1]/2;
        ref.current.material=new THREE.MeshPhysicalMaterial({
            map:imgRef.current?textureRef.current:null,
            color:color,
            metalness:metalness,
            roughness:roughness
        })
    }
    return(<mesh scale={scale} position={position} rotation={rotation} ref={ref}>
        <planeGeometry scale={scale}/>
    </mesh>)
}

export const _TextPlane=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    img=null,
    color=null,
    metalness=.5,
    roughness=.5,
    text=null,
    contentScale=[1,1,1]
})=>{
    var textureRef=new THREE.TextureLoader().load('blocks/'+img);
    var imgRef=img;

    if(text!==null){
        console.log(text)
        textureRef= getCanvasTexture(text,contentScale);
        imgRef=true;
    }
    const mesh=new THREE.Mesh();
    mesh.geometry=new THREE.PlaneGeometry(scale[0],scale[1]);
    mesh.material=new THREE.MeshPhysicalMaterial({
        map:imgRef?textureRef:null,
        color:color,
        metalness:metalness,
        roughness:roughness
    })
    mesh.rotation.x=rotation[0]
    mesh.rotation.y=rotation[1]
    mesh.rotation.z=rotation[2]

    mesh.position.x=position[0]
    mesh.position.y=position[1]+scale[1]/2;
    mesh.position.z=position[2]
    return mesh;
}




const getCanvasTexture=(txt='',contentScale)=>{
    const canvas=document.createElement('canvas');
    
    let context = canvas.getContext("2d");
    console.log()
    canvas.width=1000*contentScale[0];
    canvas.height=1000*contentScale[1];
    context.fillStyle='#fff'
    context.fillRect(0,0,canvas.width,canvas.height)
    context.fill();
    const p=txt.split('\n');
    context.fillStyle = '#00f'
    context.font = '600 90px Arial'
   
    p.forEach((item,i)=>{
        context.fillText(item, 100,(i+1)*100)
    })
    const texture=new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true
    return texture;
}

export const ExtrudeGeometry=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    bevelSegments=2,
    color=null,
    img=null
})=>{
    const ref=useRef(null)
    useEffect(()=>{
       setObject();
    },[]);

    const setObject=async()=>{
        const texture=new THREE.TextureLoader().load('/blocks/'+img);
        const shape=new THREE.Shape();
        shape.moveTo(0-0.5,0);
        shape.lineTo(1-0.5,0);
        shape.lineTo(1-0.5,1);
        shape.lineTo(0-0.5,1);
        shape.lineTo(0-0.5,0);
        ref.current.geometry=new THREE.ExtrudeGeometry(shape,{
            steps:10,
            depth:1,
            bevelEnabled:true,
            bevelThickness:0.05,
            bevelSize:0.05,
            bevelOffset:0,
            bevelSegments:bevelSegments
        });
        // ref.current.position.z-=0.5
        ref.current.material=new THREE.MeshLambertMaterial({map:texture,color:color})
    }


    return(<mesh ref={ref} position={position} rotation={rotation} scale={scale}> 
    
    </mesh>);

}

export const _ExtrudeGeometry=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    bevelSegments=2,
    color=null,
    img=null
})=>{

    const mesh=new THREE.Mesh();
    const texture=new THREE.TextureLoader().load('/blocks/'+img);
    const shape=new THREE.Shape();
    shape.moveTo(0-0.5,0);
    shape.lineTo(1-0.5,0);
    shape.lineTo(1-0.5,1);
    shape.lineTo(0-0.5,1);
    shape.lineTo(0-0.5,0);
    mesh.geometry=new THREE.ExtrudeGeometry(shape,{
        steps:10,
        depth:1,
        bevelEnabled:true,
        bevelThickness:0.05,
        bevelSize:0.05,
        bevelOffset:0,
        bevelSegments:bevelSegments
    });
    // ref.current.position.z-=0.5
    mesh.material=new THREE.MeshLambertMaterial({map:texture,color:color})
    
    mesh.scale.x=scale[0]
    mesh.scale.y=scale[1]
    mesh.scale.z=scale[2]

    mesh.rotation.x=rotation[0]
    mesh.rotation.y=rotation[1]
    mesh.rotation.z=rotation[2]

    mesh.position.x=position[0]
    mesh.position.y=position[1]
    mesh.position.z=position[2]
    
    return mesh;
}


export const CrystalColorRGB=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    rotat=false
})=>{
    const ref=useRef();
    useFrame(()=>{
        if(rotat){
            ref.current.rotation.y+=0.01
            ref.current.rotation.x+=0.01
        }
    })
    useEffect(()=>{
        if(position[1]<ref.current.scale.y/2){
            ref.current.position.y=ref.current.scale.y/2;
        }
        ref.current.geometry=new THREE.BoxGeometry();
        ref.current.material=getMaterials(['#f00','#f00','#00f','#00f','#0f0','#0f0'])
        console.log(ref.current.material)

    },[])

    return(<mesh ref={ref} rotation={rotation} position={position} scale={scale}></mesh>);
}

const getMaterials=(materials=['#fff'])=>{
    const setMaterial=[];
    materials.forEach(m=>setMaterial.push(
        new THREE.MeshPhysicalMaterial({
            transparent:true,
            color:'#fff',
            opacity:0.6,
            emissive:m,
            emissiveIntensity:1,
            side:THREE.DoubleSide,
            transmission:.6,
            metalness:0.99,
            roughness:0.2,
            shadowSide:THREE.DoubleSide
            // fog:true
        })
    ));
    return setMaterial;
}





// export const _3DOptionRef=forwardRef(({
//     scale=[1,1,1],
//     rotation=[0,0,0],
//     position=[0,0.5,0],
//     color='#fff',
//     text='option',
//     textColor='#000',
//     textScale=0.5
// },ref)=>(
//     <mesh
//         ref={ref}
//         position={position}
//         rotation={ rotation}
//         scale={ scale}
//     >
//         <planeGeometry args={[2,1]}/>
//         <meshPhysicalMaterial
//             color={color}
//             transparent={true}
//             opacity={.7}
//             emissiveIntensity={1}
//             emissive={'#000'}
//             side={2}
//         />

//         <Text 
//             scale={ textScale}
//             color={ textColor}
//             position={[0,0,0.01]}
//         >
//             { text}
//         </Text>

//     </mesh>
// ));


export const Sphere=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    rotat=false
})=>{
    useFrame(()=>{
        TEWWN.update();  
    })


    useEffect(()=>{
        setPosition()
    })

    const setPosition=()=>{
        setInterval(()=>{
            new TEWWN.Tween(ref.current.position)
            .to({
                y:0.5
            },2500)
            .easing(TEWWN.Easing.Linear.None)
            .start()
            .onComplete(()=>{
                new TEWWN.Tween(ref.current.position)
                .to({
                    y:1
                },2500)
                .easing(TEWWN.Easing.Linear.None)
                .start()
            })
        },5000)
        
    }

    const ref=useRef(null);
    useEffect(()=>{
        ref.current.geometry=new THREE.SphereGeometry(0.2);
        ref.current.material=new THREE.MeshPhysicalMaterial({
            color:'#00f',
            transparent:true,
            emissiveIntensity:1,
            emissive:'#00f',
            opacity:0.8
        })

    },[])
    return(<mesh ref={ref} scale={scale} rotation={rotation} position={position}></mesh>)
}
