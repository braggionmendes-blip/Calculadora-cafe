# App nativo (Capacitor)

O app de Android e de iOS é o mesmo `index.html` da raiz do repositório, empacotado pelo Capacitor.
Toda mudança no app web entra no app nativo na próxima compilação.

- `copia-web.js` copia o app web para `www/`.
- `capacitor.config.json` define o nome e o identificador do app.
- A compilação do Android roda sozinha no GitHub (aba **Actions** > *App Android*) a cada mudança no
  `index.html` ou nesta pasta. O APK fica em **Artifacts** no fim da execução.
- No app nativo a balança usa o plugin `@capacitor-community/bluetooth-le` em vez do Web Bluetooth.

As pastas `android/` e `ios/` são geradas na compilação e não ficam no repositório.
