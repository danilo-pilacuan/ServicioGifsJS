const { loadImage } = require('canvas')

const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const fs = require('fs');
const PNG = require('png-js');
const nodeHtmlToImage = require('node-html-to-image');
function decode(png) {
    return new Promise(r => {png.decode(pixels => r(pixels))});
  }
const encodeGifWithPNG = async () => {
  const start = Date.now();
    const encoder = new GIFEncoder(320, 240);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

    encoder.start();
    encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
    encoder.setDelay(1000);  // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    // use node-canvas
    const canvas = createCanvas(320, 240);
    const ctx = canvas.getContext('2d');

    // red rectangle
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0, 0, 320, 240);

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "blue";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();

    encoder.addFrame(ctx);

    // green rectangle
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 0, 320, 240);

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();

    encoder.addFrame(ctx);

    // blue rectangle
    ctx.fillStyle = '#0000ff';
    ctx.fillRect(0, 0, 320, 240);

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "green";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();

    encoder.addFrame(ctx);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 320, 240);

    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "green";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();
    encoder.addFrame(ctx);

    // await loadImage('Lightning.png').then((image) => {
    //     ctx.drawImage(image, 50, 0, 70, 70)

    //     console.log('<img src="' + canvas.toDataURL() + '" />')
    // })

    //const imageFromPng = await loadImage('Lightning.png');
    const pngBuffer = await nodeHtmlToImage({
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <style>
            body {
              width: 320px;
              height: 240px;
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
                            color: #0f265c;">00</span>
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
        </html>`,
        encoding: "binary"
      });
    const pngObj = new PNG(pngBuffer);

    
    await decode(pngObj).then(pixels => encoder.addFrame(pixels));

    // const imageFromPng = await loadImage(pngObj);
    // console.log(imageFromPng)

    // ctx.fillStyle = '#ffffff';
    // ctx.fillRect(0, 0, 320, 240);

    // ctx.drawImage(imageFromPng, 0, 0, 320, 240);

    // console.log('<img src="' + canvas.toDataURL() + '" />')

    // encoder.addFrame(ctx);

    encoder.finish();
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
}


encodeGifWithPNG();