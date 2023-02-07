const express = require('express');
const app = express()
const port = 3000
const router = express.Router();
const nodeHtmlToImage = require('node-html-to-image');

app.get(`/api/tweet/render`, async function(req, res) {
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
    encoding:"base64"
  });
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(image, 'base64');
});

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
  console.log("fin")