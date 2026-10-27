# Informacje techniczne

Nazwa aplikacji: **Cleanily**  
Identyfikator Android: `com.oqcwm.cleanily`

## Wersje narzędzi

- Capacitor: 8.0.0
- Capacitor Assets: 3.0.5
- Capacitor Community Media: 9.1.0
- Node.js: 22
- Java: 21
- Android SDK / target SDK: 36
- Runner GitHub: ubuntu-24.04 z preinstalowanym Android SDK
- Format wyniku: debug APK

## Dlaczego folder `android` nie znajduje się w repozytorium?

Workflow tworzy go automatycznie poleceniem `npx cap add android`. Dzięki temu repozytorium pozostaje niewielkie, a projekt natywny jest zawsze zgodny z wersją Capacitor zapisaną w `package.json`.

## Aparat

Aplikacja używa pól HTML:

```html
<input type="file" accept="image/*" capture="environment">
```

W aplikacji Android otwiera to tylny aparat poprzez systemową obsługę plików WebView. Zdjęcia są kompresowane lokalnie i nie są wysyłane na serwer.

## Prywatność i praca offline

- aplikacja nie łączy się z zewnętrznym API,
- wszystkie dane są przechowywane lokalnie w WebView,
- zdjęcia są kompresowane w Canvas,
- raport JPG jest tworzony na urządzeniu,
- końcowy raport jest zapisywany w albumie `Cleanily` w galerii Androida,
- reset audytu usuwa zapis roboczy z lokalnej pamięci aplikacji.
