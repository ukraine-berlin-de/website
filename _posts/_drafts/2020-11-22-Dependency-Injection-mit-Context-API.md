---
layout: post
title:  "Dependency Injection mit der Context API"
date:   2020-11-22 11:00:00 +0100
categories: Artikel update
author: Pawel Sawicki

image: /assets/og/article_2020_11_22.jpg

seo:
  name: Dependency Injection mit der Context API
  publisher: Pawel Sawicki

---
![](/assets/blocks.svg)

## Dependency Injection

Stell dir mal vor, du hättest die Möglichkeit in einer Component nach einer Ressource (bspw. einem Service) zu fragen und bekommst eine Instanz hiervon einfach gestellt, ohne sich dafür interessieren zu müssen wie.

Stell dir mal vor, die gestellte Instanz unterscheidet sich je nach Environment (bspw. Production, Dev und Test) in der Implementierung. Dir ist das egal, schließlich hast du ***irgendeine*** Instanz der Ressource über deren abstrakten Datentypen nachgegragt.

![Dependency Injection with the Context API](/assets/context_api.svg)

## Jede App ist einzigartig.
 
Deshalb sollte das *Look and Feel* einer App genauso einzigartig wie die App-Idee selbst sein - dazu gehört auch die Wahl einer möglichst passenden ***Font (z. Dt. Schrift)***.

In diesem kurzen Tutorial betrachten wir, wie man eine Font in einem [React Native CLI](https://github.com/react-native-community/cli) Projekt einbindet und nutzt.

## Lass uns eine Schrift auswählen.

Lass uns auf die Suche nach einer passenden Schrift gehen. Eine mögliche Quelle ist [Google Fonts](https://fonts.google.com/).

Für die zu entwickelnde App nutzen wir die weltbeste Schrift die es gibt, [Comic Neue](https://fonts.google.com/specimen/Comic+Neue?query=comic+neue) 😉 

### Custom Fonts im [React Native CLI](https://github.com/react-native-community/cli) Project.

Lass uns ein Demo Projekt aufsetzen:

```console
npx react-native init ComicFontDemoApp --template react-native-template-typescript
```

Wir wechseln nun in das Projektverzeichnis...

```console
cd ComicFontDemoApp
```

...und starten unsere Entwicklungsumgebung (bspw. *Visual Studio Code*)

```console
code .
```

Für unseren Test wollen wir eine einfache View, die uns zentriert einen Text anzeigt.

Hierzu ersetzen wir den Inhalt der Datei *App.tsx* durch folgenden Code:

```tsx
import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Comic Font Demo App</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#000000',
  },
});

export default App;
```

Vorausgesetzt wir haben ein funktionierendes Setup für die Entwicklung, installieren wir die notwenidgen *Pods* ...

```console
npx pod-install ios
```

... und starten das Projekt im Simulator.

```console
npm run ios
```

Wir kriegen Folgendes im Simulator zu Gesicht:
![](/assets/ComicFontDemoScreen1.jpg)

### Lass uns nun die Schrift einrichten.

Wir laden die Schrift entsprechend [hier](https://fonts.google.com/specimen/Comic+Neue?query=comic+neue) runter und entpacken das Archiv.

Wir erstellen den Ordner und Unterordner ***assets/fonts*** in unserem Projektverzeichnis und kopieren den Inhalt (die Schriftdateien) aus dem heruntergeladenen und entpackten Verzeichnis rein.

```console
mkdir -p assets/fonts && cp ~/Downloads/Comic_Neue/* assets/fonts
```

Unsere Entwicklungsumgebung (hier: Visual Studio Code) dürfte nun wie folgt aussehen:

![](/assets/ComicFontDemoVSCode1.jpg)

Als nächstes erstellen wir die Datei ***react-native.config.js*** ...

```console
touch react-native.config.js
```

... mit folgendem Inhalt:


```js
module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // let's bundle the fonts
};
```

<p class="info">
Mit der Datei <em>react-native.config.js</em> haben wir die Möglichkeit Plattformspezifisches und Linkinginformationen zu konfigurieren.
</p>

Damit wir jetzt gleich und in Zukunft vereinfacht linken können, ergänzen wir die ***package.json*** in ***scripts*** Bereich um Folgendes:

```js
"scripts": {
  // [...]
  "link": "react-native link"
}
```
Wir sind nun in der Lage Folgendes im Projektverzeichnis aufzurufen:

```console
npm run link
```


Sofern die Ausgabe wie hier ausschaut...
```console
> ComicFontDemoApp@0.0.1 link /Users/pawel/tmp/rn/ComicFontDemoApp
> react-native link

info Linking assets to ios project
warn Group 'Resources' does not exist in your Xcode project. We have created it automatically for you.
info Linking assets to android project
success Assets have been successfully linked to your project
```

... hat alles wunderbar funktioniert. 

**Das native iOS und Android Projekt wurde entsprechend um die Fonts aktualisiert.**

Lasst uns nun die Schrift ***Comic Neue*** auf unserem Text innerhalb der App anwenden.

Hierzu aktualisieren wir die *styles* Konstante wie folgt:

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Comic Neue',
  },
});
```

Um die Änderung im Simulator zu sehen, ist es notwendig die Anwendung neu zu starten. Hierzu stoppen/ schließen wir das Terminal mit dem laufendem *Metro Bundler* und starten die Anwendung neu, mittels...

```console
npm run ios
```

<p class="info">
Bei jeder Änderung des nativen Android bzw. iOS Moduls im Projekt (wie unter Verwendung von <em>react-native link</em>) muss die Anwendung im jeweiligen Simulator neu gestartet werden.
</p>

**Voilà!** Hier ist das erhoffte Resultat:

![](/assets/ComicFontDemoScreen2.jpg)

