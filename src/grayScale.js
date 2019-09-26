let grayScaleGenerate=function(mode){
    if(mode==="average"){
        return function(r,g,b){
            return (r+g+b)/3;
        }
    }else{
        return function (r,g,b) {
            return 0.299 * r + 0.587 * g + 0.114 * b
        }
    }
};


export default function(imgData,conf){
    let mode = conf["mode"];
    let grayScale=grayScaleGenerate(mode);
    let data=imgData["data"];
    let loc,x,y,grayValue;
    for(x=0;x<imgData.width;x++) {
        for (y = 0; y < imgData.height; y++) {
            loc=(y*imgData.width+x)*4;
            grayValue=grayScale(data[loc],data[loc+1],data[loc+2]);
            data[loc]=grayValue;
            data[loc+1]=grayValue;
            data[loc+2]=grayValue;
        }
    }
}