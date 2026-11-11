// Copia o app web (index.html, ícones e manifesto) da raiz do repositório para nativo/www,
// que é a pasta que o Capacitor empacota dentro dos apps de Android e iOS.
const fs = require("fs"), path = require("path");
const raiz = path.join(__dirname, ".."), www = path.join(__dirname, "www");
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });
for (const f of ["index.html", "manifest.webmanifest"]) fs.copyFileSync(path.join(raiz, f), path.join(www, f));
fs.cpSync(path.join(raiz, "icons"), path.join(www, "icons"), { recursive: true });
console.log("App web copiado para", www);
