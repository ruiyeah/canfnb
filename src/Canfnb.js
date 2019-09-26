


export default class Canfnb {
    constructor(conf) {
        if (!conf) conf = {};
        this.conf = {
            retina: conf.retina || false,
            width: conf.width || 1200,
            height: conf.height || 720
        };
        this.imgArr = conf.imgArr;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.imgData = [];
        this.underCanvas = {};
    }

    loadImg(src) {
        let _this = this;
        return new Promise((resolve, reject) => {
            if(_this.underCanvas[src]){
                _this.conf.width = _this.underCanvas[src].width;
                _this.conf.height = _this.underCanvas[src].height;
                _this.imgData = _this.underCanvas[src].getContext("2d").getImageData(0, 0, _this.conf.width, _this.conf.height);
                resolve();
            }else{
                let underCanvas = document.createElement("canvas");
                //underCanvas.setAttribute("style", "opacity:0;position:absolute;z-index:-1000;");
                let at = new Date();
                let context = underCanvas.getContext("2d");
                let img = new Image();
                img.src = src;
                img.onload = function () {
                    let width = img.width;
                    let height = img.height;
                    if(_this.conf.retina){
                        width*=2;
                        height*=2;
                    }
                    underCanvas.width  = width;
                    underCanvas.height  = height;
                    context.drawImage(img, 0, 0, width, height);
                    console.log('image draw');
                    console.log(new Date().getTime() - at.getTime());
                    _this.imgData = context.getImageData(0, 0, underCanvas.width, underCanvas.height);
                    _this.underCanvas[src]=underCanvas;
                    resolve('success');
                };
            }
        });
    }

    edgeDetect() {

        let i, j, x, y, _this = this, imgData = _this.imgData;
        _this.imgDataArr = [];
        for (x = 0; x < imgData.width; x += 1) {
            for (y = 0; y < imgData.height; y += 1) {
                j = (y * imgData.width + x) * 4;
                if (imgData.data[j + 3] < 64) continue;
                let point = {
                    x: x,
                    y: y,
                    color: 'rgba(255,255,255,' + (imgData.data[j + 3] / 255) + ')'
                };
                _this.imgDataArr.push(point);

            }
        }
        imgData = null;
    }





}