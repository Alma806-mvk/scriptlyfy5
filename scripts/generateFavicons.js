const favicons = require('favicons');
const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, '..', 'public', 'logo-scriptlyfy.png');
const outputDir = path.resolve(__dirname, '..', 'public', 'favicons');
const config = {
  path: '/favicons/',
  appName: 'Scriptlyfy',
  appShortName: 'Scriptlyfy',
  appDescription: 'Scriptlyfy app icons',
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  background: '#fff',
  theme_color: '#0ea5e9',
  appleStatusBarStyle: 'black-translucent',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  start_url: '/?homescreen=1',
  version: '1.0',
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
};

(async function(){
  const image = fs.readFileSync(source);
  const response = await favicons(image, config);
  // ensure output dir
  if(!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  // write images
  response.images.forEach(img => {
    fs.writeFileSync(path.join(outputDir, img.name), img.contents);
  });
  // Ensure /public/favicon.ico exists (Google often fetches /favicon.ico)
  try {
    const generatedIco = response.images.find(i => i.name === 'favicon.ico');
    if (generatedIco) {
      const rootIco = path.resolve(__dirname, '..', 'public', 'favicon.ico');
      fs.writeFileSync(rootIco, generatedIco.contents);
    }
  } catch (e) {
    console.warn('Could not write root favicon.ico:', e);
  }
  // write files
  response.files.forEach(f => {
    fs.writeFileSync(path.join(outputDir, f.name), f.contents);
  });
  // save HTML
  fs.writeFileSync(path.join(outputDir, 'favicons.html'), response.html.join('\n'));
  console.log('Favicons generated in', outputDir);
})();
