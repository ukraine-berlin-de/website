---
layout: tutorial

lecture: "1"
lecture_title: "JavaScript und ECMAScript"

sublecture: "2"
sublecture_title: "Variablen und Konstanten"

date: 2020-05-22
categories: tutorial update

author: Pawel Sawicki
---

![JavaScript programmieren](/assets/variable.jpg)

## Eine kleine Einführung

Nun, vermutlich ist Dir die Idee von **Variablen** und **Konstanten** bekannt. Falls das nicht der Fall ist, kommt hier eine kleine Einführung.

Fangen wir mit einem kleinen Beispiel an:
<p class="example">
Der <em>Student</em> hat das <em>Studienfach</em> bestanden, wenn seine <em>Klausurnote</em> besser oder gleich einer <em>Schwelle = 4</em> ist.
</p>

Offensichtlich handelt es sich bei dem obigen Satz um eine Aussage. Die Aussage ist allgemein gehalten.

Wir wissen zwar nicht genau wer mit **Student** gemeint ist, können uns allerdings vorstellen, dass damit jeder immatrikulierte Student im **Studienfach** ist. 

Gültige Werte für *Student* sind somit *Max*, *Lisa*, *Maike*, ...

Gültige Werte für *Studienfach* sind *Mathematik*, *Informatik*, *Englisch*, ...

Intuitiv können wir sagen, dass die **Klausurnote** ein Zahl ist.
In Deutschland sind die Zahlen **1**, **2**, **3**, **4**, **5** oder **6** gültige Werte für eine Note.

Man könnte sagen, dass **Student**, **Studienfach** und **Klausurnote** als Platzhalter, also sogenannte **Variablen**, zu verstehen sind. 

<p class="definition">
Der <em>Datentyp</em> einer <em>Variable</em> sagt aus, welche Werte für diese Variable möglich sind.
</p>

In unserem Beispiel ist die Note **4** eine **Konstante**, unabhängig der Werte für die Variablen *Student*, *Studienfach* und *Klausurnote*. Damit wir auch wissen, was mit dem Wert *4* eigentlich gemeint ist, vergeben wir dieser Konstante einen Bezeichner, der beliebig, allerdings aussagekräftig ist: **Schwelle**.

<p class="definition">
Eine <em>Konstante</em> ist ein <em>Wert</em> identifiziert durch seinen <em>Bezeichner</em> Der Bezeichner behält seinen Wert stets bei.
</p>

## Variablen und Konstanten in JavaScript

Schauen wir uns das Beispiel in JavaScript an:
```javascript
let student = 'Max';            // (1) Eine Variable vom Typ string
let klausurnote = 4;            // (2) Eine Variable vom Typ number
let studienfach = 'Mathematik'; // (3) Eine Variable vom Typ string

const schwelle = 4;             // (4) Eine Konstante vom Typ number

let bestanden;                  // (5) Eine Variable vom Typ boolean
if (klausurnote <= schwelle) {
    bestanden = true;           // (6) Die Variable nimmt den Wert true an
} else {
    bestanden = false;          // (7) Die Variable nimmt den Wert false an
}

if (bestanden) {                // (8) Die Variable wird ausgewertet.
    console.log(`Herzlichen Glückwunsch ${student}. Du hast bestanden.`);
} else {
    console.log('Leider nicht bestanden.');
}
```

<p class="definition">
Sofern wir zum ersten mal eine Variable oder Konstante kenntlich machen, sprechen wir von einer <em>Deklaration</em>. Sobald wir der Variable oder der Konstante einen Wert zuweisen, sprechen wir von einer <em>Definition</em>.
</p>

1. Hier **deklarieren** und **definieren** wir eine Variable *student* vom Typ **string**. Ein *string* kann belibige Zeichenketten aufnehmen.
2. An dieser Stelle wird die Variable **klausurnote** vom Typ **number** deklariert und definiert. Eine *number* nimmt beliebiege Zahlen auf. JavaScript unterscheidet hierbei nicht zwischen ganzen Zahlen (natürlichen Zahlen) und Gleitkommazahlen (reelle Zahl)
3. So ähnlich wie im Fall (1) wird hier eine Variable **studienfach** als *string* deklariert und mit dem Wert *Mathematik* definiert.
4. An dieser Stelle wird eine **Konstante** **deklariert** und mit dem Wert **4** **definiert**. Bei Konstanten ist eine **Deklaration** und zeitgleiche **Definition** notwendig, bei Variablem ist dies nicht erforderlich, wie wir in (5) sehen.
5. Hier wird eine Variable **bestanden** deklariert, jedoch **nicht definiert**. Eine Variable die nicht definiert ist, hat den speziellen Wert **undefined**, der nicht explizit angegeben werden muss. Der angedachte Typ für die Variable *bestanden* ist **boolean**.
6. Variablen können über die Zeit neu definiert werden. Hier nimmt die zuvor deklarierte Variable *bestanden* (5) einen neuen Wert an: **true** (zuvor: **undefined**).
7. Der andere mögliche Wert für Variablen vom Typ *boolean* ist **false**.
8. Variablen können **ausgelesen** und **ausgewertet** werden um bspw. (wie hier) den Programmablauf zu beinflußen.

<p class="info">
Es ist Okay wenn Du hier nicht alles verstehst. Versuche Dich hier auf das Wesentliche zu konzentrieren: Die Deklaration und Definition von Variablen und Konstanten.
</p>

## Wir wollen mehr...
Nun, wir haben bereits Einiges über Variablen gesehen. Es ist klar: nicht genug! 

Lass uns in den Folgenden Lektionen auf **Datentypen** und deren Anwendung eingehen.

