const GIFEncoder = require('gifencoder');
const { createCanvas } = require('canvas');
const fs = require('fs');
const nodeHtmlToImage = require('node-html-to-image');

const encoder = new GIFEncoder(320, 240); 
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));

encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(500);  // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.

const canvas = createCanvas(320, 240);
const ctx = canvas.getContext('2d');

const createImg = async ()=>{
  const image = await nodeHtmlToImage({
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
    encoding: "base64"
  });
  console.log(image)
}

createImg()