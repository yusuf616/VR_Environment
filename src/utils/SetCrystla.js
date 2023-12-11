import {useEffect,useRef} from 'react';
import { CrystalColorRGB } from "./utils";


export const SetCrystla=({
    scale=[1,1,1],
    rotation=[0,0,0],
    position=[0,0,0],
    scaleItem=[1,1,1],
    distanceItems=1,
    itemNumber=2,
    rotat=true
})=>{
    const CrystalsRef=useRef([]);
    useEffect(()=>{
        CrystalsRef.current=[]
        for(let i=0;i<itemNumber;i++)
        {   
            CrystalsRef.current.push(
                <CrystalColorRGB 
                    rotat={rotat}
                    key={i}
                    position={[(i*distanceItems)-(distanceItems*(itemNumber-1)/2),0,0]}
                    scale={scaleItem} 
                    rotation={[Math.PI/4,Math.PI/4,0]} 
                />    
            )
        }
    },[])
    return(<group position={position} rotation={rotation} scale={scale} name="setCrystla">
        {CrystalsRef.current.map(item=>item)}
    </group>)
}