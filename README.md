# Cleanily — Laboratorium OQC WM (Android APK)

Gotowy projekt GitHub do automatycznego zbudowania instalacyjnego pliku APK aplikacji **Cleanily**. Aplikacja działa offline, zapisuje zdjęcia lokalnie i zapisuje końcowy raport JPG w układzie 2 × 3 bezpośrednio w albumie **Cleanily** w galerii telefonu. Projekt zawiera gotową ikonę Androida opartą na niebieskim znaku ze szczotką i miotełką.

## Najprostszy sposób zbudowania APK na GitHubie

1. Utwórz nowe, puste repozytorium na GitHubie, np. `cleanily`.
2. Rozpakuj pobraną paczkę ZIP.
3. Prześlij **zawartość folderu** `oqc-wm-audit-apk` do głównego katalogu repozytorium. W głównym katalogu muszą być widoczne pliki `package.json`, `capacitor.config.json` i folder `.github`.
4. Zatwierdź pliki na gałęzi `main`.
5. Otwórz zakładkę **Actions** w repozytorium.
6. Wybierz workflow **Zbuduj Cleanily APK**.
7. Jeśli build nie uruchomił się automatycznie, wybierz **Run workflow** → **Run workflow**.
8. Po zakończeniu otwórz wykonany workflow i w sekcji **Artifacts** pobierz `Cleanily-APK`.
9. Rozpakuj pobrany artefakt. W środku znajduje się `Cleanily.apk`.

Workflow korzysta z obrazu `ubuntu-24.04`, który ma już zainstalowane Android SDK 36 i Build Tools 36.0.0. Nie korzysta z dodatkowej akcji instalującej Android SDK.

## Instalacja na telefonie

1. Przenieś APK na telefon z Androidem.
2. Zezwól na instalowanie aplikacji z danego źródła, jeśli Android o to poprosi.
3. Otwórz `Cleanily.apk` i wybierz **Zainstaluj**.

To jest wersja debug APK, przeznaczona do wewnętrznego użycia i testów. Jest instalowalna bez konfigurowania własnego klucza podpisu. Do publikacji w Google Play należy przygotować podpisany plik AAB lub release APK.

## Struktura repozytorium

```text
.
├── .github/
│   └── workflows/
│       └── build-apk.yml
├── assets/
│   └── icon.png
├── src/
│   └── native-plugins.js
├── web/
│   ├── icon.png
│   ├── index.html
│   └── native-plugins.js
├── .gitignore
├── capacitor.config.json
├── package.json
└── README.md
```

## Konfiguracja aplikacji

Najważniejsze ustawienia znajdują się w `capacitor.config.json`:

- `appId`: `com.oqcwm.cleanily`
- `appName`: `Cleanily`
- `webDir`: `web`

Jeżeli chcesz zmienić identyfikator pakietu, zrób to przed pierwszym buildem. Powinien mieć format odwróconej domeny, np. `pl.twojafirma.cleanily`.

## Ikona aplikacji

Plik źródłowy ikony znajduje się w `assets/icon.png`. Workflow automatycznie generuje z niego komplet ikon launchera i ikon adaptacyjnych Androida za pomocą `@capacitor/assets`.

## Aktualizacja aplikacji

Edytuj `web/index.html`, zatwierdź zmianę na gałęzi `main`, a GitHub automatycznie zbuduje nowy APK. Projekt Android jest generowany od nowa w GitHub Actions, dlatego nie trzeba przechowywać dużego folderu `android` w repozytorium.

## Zapisywanie raportu w galerii

W aplikacji Android przycisk **Zapisz raport w galerii** tworzy album `Cleanily` i umieszcza w nim końcowy plik JPG. Funkcję zapewnia `@capacitor-community/media` w wersji zgodnej z Capacitor 8. W zwykłej przeglądarce aplikacja korzysta z awaryjnego pobierania pliku.

## Budowanie lokalne

Wymagane są Node.js 22+, Java 21, Android SDK 36 i Android Studio.

```bash
npm install
npm run build:native-bridge
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

Wynik lokalnego builda:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```
