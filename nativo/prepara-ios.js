// Ajusta o Info.plist do projeto iOS gerado pelo Capacitor (roda no macOS do GitHub, depois do "cap add ios"):
// - texto do pedido de permissão do Bluetooth (sem ele o iPhone fecha o app ao procurar a balança);
// - Bluetooth em segundo plano, para a balança continuar conectada com a tela bloqueada;
// - declara que o app não usa criptografia própria (o TestFlight não pergunta a cada envio).
const { execFileSync } = require("child_process"), path = require("path");
const plist = path.join(__dirname, "ios", "App", "App", "Info.plist");
const pb = cmd => { try { execFileSync("/usr/libexec/PlistBuddy", ["-c", cmd, plist]) } catch (e) {} };
const txt = "A Calculadora de Café usa o Bluetooth para ler o peso da sua balança durante o preparo.";
pb("Delete :NSBluetoothAlwaysUsageDescription"); pb(`Add :NSBluetoothAlwaysUsageDescription string \"${txt}\"`);
pb("Delete :NSBluetoothPeripheralUsageDescription"); pb(`Add :NSBluetoothPeripheralUsageDescription string \"${txt}\"`);
pb("Delete :UIBackgroundModes"); pb("Add :UIBackgroundModes array"); pb("Add :UIBackgroundModes:0 string bluetooth-central");
pb("Delete :ITSAppUsesNonExemptEncryption"); pb("Add :ITSAppUsesNonExemptEncryption bool false");
console.log("Info.plist ajustado:", plist);
