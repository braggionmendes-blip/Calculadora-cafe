# App nativo (Capacitor)

O app de Android e de iOS é o mesmo `index.html` da raiz do repositório, empacotado pelo Capacitor.
Toda mudança no app web entra no app nativo na próxima compilação.

- `copia-web.js` copia o app web para `www/`.
- `capacitor.config.json` define o nome e o identificador do app.
- A compilação do Android roda sozinha no GitHub (aba **Actions** > *App Android*) a cada mudança no
  `index.html` ou nesta pasta. O APK fica em **Artifacts** no fim da execução.
- No app nativo a balança usa o plugin `@capacitor-community/bluetooth-le` em vez do Web Bluetooth.

As pastas `android/` e `ios/` são geradas na compilação e não ficam no repositório.

## iPhone (TestFlight)

A compilação do iOS roda no GitHub (aba **Actions** > *App iOS*), numa máquina macOS, sem precisar de Mac.
A cada mudança ela confere se o app compila para o simulador. Para mandar ao TestFlight:

1. Crie a conta Apple Developer (developer.apple.com/programs, US$ 99 por ano).
2. Em App Store Connect > Apps, crie o app com o identificador `io.github.braggionmendesblip.calculadoracafe`.
3. Em App Store Connect > Usuários e acesso > Integrações > App Store Connect API, gere uma chave com acesso
   **App Manager** e baixe o arquivo `.p8` (só dá para baixar uma vez).
4. No GitHub, em Settings > Secrets and variables > Actions, crie os segredos:
   - `ASC_KEY_ID`: o ID da chave;
   - `ASC_ISSUER_ID`: o Issuer ID mostrado na mesma página;
   - `ASC_KEY_P8`: o conteúdo inteiro do arquivo `.p8`;
   - `APPLE_TEAM_ID`: o Team ID (developer.apple.com > Account > Membership).
5. Em Actions > App iOS > Run workflow, marque **Enviar para o TestFlight** e rode.
6. No iPhone, instale o app TestFlight e aceite o convite que chega no seu e-mail da conta Apple.
