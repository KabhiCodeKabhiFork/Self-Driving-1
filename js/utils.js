function lerp(start, end, amt){
    return (1-amt)*start+amt*end;
}

function getTouch(a1,a2,b1,b2){
    const ua_t = (b2.x-b1.x)*(a1.y-b1.y)-(b2.y-b1.y)*(a1.x-b1.x);
    const ub_t = (a2.x-a1.x)*(a1.y-b1.y)-(a2.y-a1.y)*(a1.x-b1.x);
    const u_b = (b2.y-b1.y)*(a2.x-a1.x)-(b2.x-b1.x)*(a2.y-a1.y);

    if(u_b != 0){
        const ua = ua_t/u_b;
        const ub = ub_t/u_b;

        if(0 <= ua && ua <= 1 && 0 <= ub && ub <= 1){
            return {x:lerp(a1.x,a2.x,ua),y:lerp(a1.y,a2.y,ua),offset:ua};
        }
        // else{
        //     return null;
        // }
    }
    // else{
    //     return null;
    // }
}

function polygonTouch(polygon1,polygon2){
    for(let i=0;i<polygon1.length-1;i++){
        for(let j=0;j<polygon2.length-1;j++){
            const touch = getTouch(
                polygon1[i],
                polygon1[i+1],
                polygon2[j],
                polygon2[j+1]);
            if(touch){
                return true;
            }
        }
    }
    return false;
}

function getRGBA(value){
    const alpha = Math.abs(value);

    const R = value>0?0:250;
    const G = value>0?255:0;
    const B = 0;
    return "rgba("+R+","+G+","+B+","+alpha+")";
}