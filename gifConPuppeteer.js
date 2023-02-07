const { loadImage } = require('canvas')
const puppeteer = require('puppeteer');
const PNG = require('png-js');
const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const fs = require('fs');

const nodeHtmlToImage = require('node-html-to-image');
function decode(png) {
    return new Promise(r => {png.decode(pixels => r(pixels))});
  }
const encodeGifWithPNG = async () => {
    
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 80,
        height: 60,
        deviceScaleFactor: 1,
    });      
    
    const encoder = new GIFEncoder(80, 60);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream('testAnim.gif'));

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(1000);  // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    // use node-canvas
    const canvas = createCanvas(80, 60);
    const ctx = canvas.getContext('2d');

    // red rectangle
    // ctx.fillStyle = '#0f265c';
    // ctx.fillRect(0, 0, 80, 60);

    // ctx.beginPath();
    // ctx.lineWidth = "6";
    // ctx.strokeStyle = "blue";
    // ctx.rect(5, 5, 290, 140);
    // ctx.stroke();

    // encoder.addFrame(ctx);

    // // green rectangle
    // ctx.fillStyle = '#00ff00';
    // ctx.fillRect(0, 0, 80, 60);

    // ctx.beginPath();
    // ctx.lineWidth = "6";
    // ctx.strokeStyle = "red";
    // ctx.rect(5, 5, 290, 140);
    // ctx.stroke();

    // encoder.addFrame(ctx);

    // // blue rectangle
    // ctx.fillStyle = '#0000ff';
    // ctx.fillRect(0, 0, 80, 60);

    // ctx.beginPath();
    // ctx.lineWidth = "6";
    // ctx.strokeStyle = "green";
    // ctx.rect(5, 5, 290, 140);
    // ctx.stroke();

    // encoder.addFrame(ctx);

    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0, 0, 80, 60);

    // ctx.beginPath();
    // ctx.lineWidth = "6";
    // ctx.strokeStyle = "green";
    // ctx.rect(5, 5, 290, 140);
    // ctx.stroke();
    // encoder.addFrame(ctx);

    

    // await loadImage('Lightning.png').then((image) => {
    //     ctx.drawImage(image, 50, 0, 70, 70)

    //     console.log('<img src="' + canvas.toDataURL() + '" />')
    // })

    //const imageFromPng = await loadImage('Lightning.png');
    
    
    await page.setContent(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        body {
          width: 80px;
          height: 60px;
        }
      </style>
    </head>
    <body>
        <div style="margin: auto;">
            <div style="margin:auto; width: auto;">
                <div style="padding: 10px; background: #f5da55">
                    <div id="capture" style="display: flex; flex-direction: column; width: fit-content;">
                        <span id="secondsCounter" style="font-family: 'Arial';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 64px;
                        margin: auto;
                        width: fit-content;
                        color: #0f265c;">02</span>
                        <span style="font-family: 'Arial';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 20px;
                        margin: auto;
                        width: fit-content;
                        color: #0f265c;">
                            Segundos
                        </span>
                    </div>
                </div>
            </div>
        </div>
    
        
    
    </body>
    </html>`);
    var screenP=await page.screenshot({ clip: { width: 80, height: 60, x: 0, y: 0 } });
    
    var pngObj = new PNG(screenP);
    await decode(pngObj).then(pixels => encoder.addFrame(pixels));

    var i;
    for(i=59;i>=0;i--)
    {
        const start = Date.now();
        //console.log("Frame "+i.toString())
        await page.setContent(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <style>
        body {
          width: 80px;
          height: 60px;
        }
      </style>
    </head>
    <body>
        <div style="margin: auto;">
            <div style="margin:auto; width: auto;">
                <div style="padding: 10px; background: #f5da55">
                    <div id="capture" style="display: flex; flex-direction: column; width: fit-content;">
                        <span id="secondsCounter" style="font-family: 'Arial';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 64px;
                        margin: auto;
                        width: fit-content;
                        color: #0f265c;">`+i.toString()+`</span>
                        <span style="font-family: 'Arial';
                        font-style: normal;
                        font-weight: 600;
                        font-size: 20px;
                        margin: auto;
                        width: fit-content;
                        color: #0f265c;">
                            Segundos
                        </span>
                    </div>
                </div>
            </div>
        </div>
    
        
    
    </body>
    </html>`);
    
    screenP=await page.screenshot({omitBackground :true});
    
    await decode(pngObj).then(pixels => encoder.addFrame(pixels));
    const end = Date.now();
    pngObj = new PNG(screenP);
    console.log(`Execution time: ${end - start} ms`);
    }


    

    
    

    
    // const imageFromPng = await loadImage(pngBuffer);
    //console.log(imageFromPng)

    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0, 0, 80, 60);

    // //ctx.drawImage(imageFromPng, 0, 0, 80, 60);

    // //console.log('<img src="' + canvas.toDataURL() + '" />')
    // console.log("here3")
    // encoder.addFrame(ctx);

    encoder.finish();
    
}


encodeGifWithPNG();