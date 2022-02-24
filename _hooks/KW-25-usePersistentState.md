---
layout: hook

week: "25"
title: "KW 25 - usePersistentState"

date: 2020-06-19
categories: hooks update

author: Pawel Sawicki

image: /assets/og/article_2020_06_19.jpg

seo:
  name: React Hook der Woche - usePersistentState
  publisher: Pawel Sawicki

---
## Ein Hook wie useState für den persistenten Zustand

In React haben wir den ***useState*** Hook um auf den *Zustand* einer Komponente zuzugreifen. Der Zustand ist jedoch **flüchtig, nicht persistent**. Sofern wir die Anwendung neu laden (*Browser Refresh*), geht der Zustand verloren.

Wäre es nicht schön, eine API ähnlich dem *useState* Hook zu haben, wobei der Zustand **persistent** im ***localStorage*** verwaltet wird?

## Der zu entwickelnde Hook - usePersistentState

Lass uns zusammen einige Überlegungen bzgl. des neuen, zu entwickelnden Hooks, sammeln.

Wir nennen unseren Hook ***usePersistentState***. Der Bezeichner weist auf eine Verwandschaft mit dem *useState* hin, ergänzt diesen jedoch um das Schlüsselwort ***Persistent***.

### Verwendung (API)

Die altbekannte Verwendung des *useState* Hooks...
```ts
const [counter, setCounter] = useState<number>(0);
```
...soll werden zu:
```ts
const [counter, setCounter] = usePersistentState<number>('counter', 0);
```
Wie man sieht, besteht der einzige Unterschied im zusätzlichen Parameter (allerdings an erster Stelle), hier mit dem Wert ```'counter'```. Hierbei handelt es sich um den **key**, der für die Ablage im *localStorage* genutzt wird. Dieser *key* hat für die gesamte Anwendung eindeutig zu sein.

### Signatur

```ts
export type UsePersistentStateResult<T> = [T, { (valueToStore: T): void }];

const usePersistentState = <T>(key: string, initialValue: T): 
    UsePersistentStateResult<T> => { /** */ };
```

Wie Du siehst, arbeitet unserer Hook auf dem generischen Datentyp ***T***. Hierbei kann *T* alles beliebiege sein: ein *primitiver Datentyp*, oder ein *komplexes Objekt*.

Der Hook gibt ein Resultat vom Typ ```UsePersistentStateResult<T>``` zurück, was ein Alias auf das Paar ```[T, { (valueToStore: T): void }];``` ist. Das erste Element des Paares ist der eigentliche Wert vom Typ *T*. Das zweite Element ist eine Funktion, die ein Parameter *valueToStore* vom Typ *T* entgegennimmt.

Dies entspricht der API, wie oben beschrieben.

### Serialisierung

Wie bereits angesprochen, kann es sich bei dem generischen Datentyp ***T*** (für den Wert) um ein ***Primitiv*** oder ein ***komplexes Objekt*** handeln.

Dies ist insofern ein Problem, da der *localStorage* Schlüssel-Wert Paare vom Typ ***string*** : ***string*** entgegennimmt.

Der Wert muss im komplexen Fall ggf. zum *string* serialisiert und deserialisiert werden. Bei primitiven Datentypen ist das nicht notwendig, da diese direkt als *string* repräsentiert werden können.

Um die meisten Anwendungsfälle abzudecken, gibt es die nützlichen Funktionen ```JSON.stringify(object)``` zum serialisieren, bzw. ```JSON.parse(stringValue)``` zum deserialisieren.

Sofern der Anwender unseres Hooks häufig mit primitiven Datentypen arbeitet und hohen Wert auf die schnelle Abarbeitung legt, sind die o.g. Operationen möglicherweise zu schwergewichtig. In diesem Fall mag sich der Benutzer für eine eigene Strategie zur Serialisierung und Deserialisierung entscheiden.

Wir erweitern die Signatur unseres Hooks um zwei weitere Parameter, ```stringEncode``` und ```stringDecode```, wie folgt:

```ts
export interface StringEncode<T> {
    (value: T): string;
}

export interface StringDecode<T> {
    (stringValue: string): T;
}

export type UsePersistentStateResult<T> = [T, { (valueToStore: T): void }];

const usePersistentState = <T>(key: string, initialValue: T,
    stringEncode: StringEncode<T>, stringDecode: StringDecode<T>): 
        UsePersistentStateResult<T> => { /** */ };
```

Wie bereits beschrieben, deckt die Serialisierung und Deserialisierung nach ***JSON*** die meisten Anwendungsfälle ab. Es ist somit eine gute Idee, diese Strategie als ***Default*** für die Parameter *stringEncode* und *stringDecode* zu wählen.

Die finale Signatur unseres *usePersistentState* Hooks sieht somit wie folgt aus:

```ts
export interface StringEncode<T> {
    (value: T): string;
}

export interface StringDecode<T> {
    (stringValue: string): T;
}

export function jsonStringEncode<T>(value: T): string {
    return JSON.stringify(value);
}

export function jsonStringDecode<T>(stringValue: string): T {
    return JSON.parse(stringValue);
};

export type UsePersistentStateResult<T> = [T, { (valueToStore: T): void }];

const usePersistentState = <T>(key: string, initialValue: T,
    stringEncode: StringEncode<T> = jsonStringEncode,   // usefull defaults
    stringDecode: StringDecode<T> = jsonStringDecode): 
        UsePersistentStateResult<T> => { /** */ };
```

### Die Implementierung

Vorab eine Feststellung: Beim jeden setzen des Zustands unter Verwendung des *setters* (zweites Element aus ```UsePersistentStateResult<T>```) muss eine neue Renderphase angestoßen werden. Dies passiert nur, wenn wir tatsächlich auch den Zustand mit dem ***useState*** Hook setzen.

Folgende Schritte müssen also umgesetzt werden:

#### Initialisierung

1. Lese den ***storedValue*** aus dem *localStorage* unter Verwendung des *keys* aus.
2. Wenn der Wert ***defined*** ist, dann wurde er zuvor mit dem *setter* explizit gesetzt und liegt *encoded* (serialisiert) vor. Deserialisiere den Wert und nutze ihn als initialen Wert für den *useState* Hook.
3. Wenn der Wert ***undefined*** ist, dann war zuvor kein Wert gesetzt. Nutze den Hook-Parameter *initialValue* als initialen Wert für den *useState* Hook.

```ts
const storedValue = window.localStorage.getItem(key);
const [ value, setValue ] = useState(
                                    storedValue 
                                        ? stringDecode(storedValue) 
                                        : initialValue
                                    );
// storeValue muss noch entwickelt werden.
return [ value, storeValue ] as UsePersistentStateResult<T>;
```
<div class="info">
Wir gehen bei diesem Hook davon aus, dass der <i>localStorage</i> mit diesem Schlüssel <em>nicht</em> anderweitig (d.h. außerhalb des hier entwickelten Hooks) beschrieben wird. Mit anderen Worten: Das Schlüssel-Wert Paar wird exklusiv von dem hier entwickelten Hook verwaltet.
</div>
<br />
#### Das Setzen eines neuen Wertes (*setter*)
1. Der *setter* muss der Signatur des zweiten Elementes des ```UsePersistentStateResult<T>``` Datentypes entsprechen, d.h.: ```const storeValue = (valueToStore: T) => { /** */ }```.
2. Wenn der neu zu setzende Wert ***referenzgleich*** zum alten Wert ist, beendet sich der *setter*. Es wird nichts weiter getan.
3. Andernfalls: Der Wert wird *encoded* (serialisiert) im *localStorage* unter dem *Schlüssel* abgespeichert.
4. Anschließend, als letzter Schritt, wird der *setter des useState* Hooks aufgerufen. Dies löst ein Re-Rendering aus.

```ts
// ... (siehe oben) ...

const storeValue = (valueToStore: T) => {
    if (value === valueToStore) {
        return;
    }
    window.localStorage.setItem(key, stringEncode(valueToStore));
    setValue(valueToStore);
}

return [ value, storeValue ] as UsePersistentStateResult<T>;
```

### Der fertige *usePersistentState* Hook

Schauen wir uns das Resultat an:

```ts
import { useState } from 'react';

export interface StringEncode<T> {
    (value: T): string;
}

export interface StringDecode<T> {
    (stringValue: string): T;
}

export function jsonStringEncode<T>(value: T): string {
    return JSON.stringify(value);
}

export function jsonStringDecode<T>(stringValue: string): T {
    return JSON.parse(stringValue);
};

export type UsePersistentStateResult<T> = [T, { (valueToStore: T): void }]; 

const usePersistentState = <T>(key: string, initialValue: T, stringEncode: StringEncode<T> = jsonStringEncode, stringDecode: StringDecode<T> = jsonStringDecode) => {
    const storedValue = window.localStorage.getItem(key);
    const [ value, setValue ] = useState(storedValue ? stringDecode(storedValue) : initialValue);

    const storeValue = (valueToStore: T) => {
        if (value === valueToStore) {
            return;
        }
        window.localStorage.setItem(key, stringEncode(valueToStore));
        setValue(valueToStore);
    }

    return [ value, storeValue ] as UsePersistentStateResult<T>;
};

export default usePersistentState;
```

Der hier entwickelte ***usePersistentState*** **Hook auf GitHub**:

[https://github.com/reactlernen/react-hooks/blob/master/src/hooks/usePersistentState.ts](https://github.com/reactlernen/react-hooks/blob/master/src/hooks/usePersistentState.ts)