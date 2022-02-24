---
layout: tutorial

lecture: "1"
lecture_title: "JavaScript und ECMAScript"

sublecture: "3"
sublecture_title: "Primitive Datentypen"

date: 2020-05-22
categories: tutorial update

author: Pawel Sawicki
---

![Essen kann viele Werte annehmen](/assets/food.jpg)

## Ein leckeres Gericht zum Essen

Nun sitzt Du vor dem Computer und arbeitest Dich durch das JavaScript Tutorial durch. Du kriegst Hunger und rufst beim Bestellservice an:
> Hallo, ist da Leckerfood? Ich habe sehr großen Hunger. Bitte liefern Sie mir schnellstmöglich ein leckeres <em>Gericht</em> zum Essen.

Endlich klingelt der Liferant an der Tür. In der Hoffnung auf ein leckeres **Gericht**, machst Du auf.

Zu Deiner Überraschung überreicht Dir der Lieferant einen Korb voller **Steine**. Das ist sicherlich nicht, was Du erwartet hast.

Akzeptable ***Werte*** für ein *Gericht* sind unter anderem: ***Pizza***, ***Burger***, ***Pommes***, ***Fischbrötchen***, ***...***

<p class="definition">
Der <em>Datentyp</em> (kurz: <em>Typ</em>) einer <em>Variable</em> sagt aus, welche Werte für diese Variable möglich sind.
</p>

Mit diesem Beispiel hast Du mit ***Gericht*** einen ***Datentyp*** kennengelernt. Variablen vom Typ *Gericht* können die Werte ***Pizza***, ***Burger***, ***Pommes***, ***Fischbrötchen***, **u.ä.** annehmen. ***Steine*** ist ein ungültiger Wert, der zu Unmut führt.

## Primitive Datentypen in JavaScript

Auch in JavaScript könnten wir einen Datentypen wie *Gericht* definieren. Dies ist jedoch ein recht komplexes Unterfangen, wenn man bedenkt, aus wievielen Zutaten ein Gericht bestehen kann. In JavaScript gibt es einige elementare Datentypen, ***Primitive Datentypen*** genannt, die man direkt nutzen kann um Sachverhalte zu beschreiben.
<p class="info">
Aus den <em>Primitiven Datentypen</em> können auch komplexere Datentypen zusammengestellt werden, wie bspw. das hier genannte <em>Gericht</em>. Nur Geduld, im Laufe des Tutorials werden wir Beispiele dazu sehen.
</p>

<p class="definition">
In JavaScript bezeichnet man die <i>kleinsten</i> <i>vordefinierten</i> Datentypen, die <i>nicht weiter teilbar</i> sind, als <em>Primitiver Datentyp</em>. Dazu gehört: <em>number</em>, <em>string</em> und <em>boolean</em>.
</p>

Im Folgenden soll auf die am häufigst verwendeten *Primitive Datentypen* eingegangen werden.

### Zahlen und numerische Größen &#x2192; number

In JavaScript nutzt man den Datentyp ```number``` um Zahlen und numerische Größen zu beschreiben.

```javascript
// (1) Die Kreiszahl pi ist eine reelle Zahl und somit eine number
const pi = 3.141592;

// (2) Der radius ist ebenfalls eine reele Zahl und somit eine number
let radius = 5.0;

// (3) Die ganzzahlige Konstante 2 ist ebenfalls eine number
// (4) Mit numbern lässt es sich rechnen.
const flaeche = 2 * pi * radius; // (5) Die flaeche ist ebenfalls eine number
```
1. Hier deklarieren und definieren wir die Konstante *pi* (&#x3C0;). &#x3C0; ist eine reelle Zahl. JavaScript nutzt den Datentypen ```number``` um reelle Zahlen intern zu repräsentieren. Beachte, dass man in JavaScript anstatt des Kommas einen Punkt ```.``` schreibt.
2. Hier deklarieren und definieren wir die Variable *radius* explizit als reelle Zahl, obwohl nach dem Komma (Punkt) kein Bruch kommt. Da bei dem intern verwendeten Datentyp ```number``` nicht zwischen ganzen und reellen Zahlen unterschieden wird, dient das an dieser Stelle nur der Lesbarkeit: Die Variable *radius* akzeptiert auch Nachkommastellen.
3. Der Konstante Wert *2* ist ebenfalls eine ```number```.
4. In JavaScript sind die üblichen Rechenoperationen auf Zahlen möglich: ```+``` (addieren), ```-``` (substrahieren), ```*``` (multiplizieren), ```/``` (dividiren) und ```**``` (exponieren). Auch ```%``` (Modulo) ist möglich.
5. Das Resultat einer Rechnung auf dem Datentypen ```number``` ist ebenfalls eine ```number```.


<p class="info">
Wie in der Mathematik üblich, gilt auch in JavaScript: <em>Punkt- vor Strichrechnung</em>. Sofern man explizit Anderweitiges mag, hat man die Möglichkeit mit <em>(</em> und <em>)</em> zu klammern.
</p>
```javascript
const x = 3 + 5 * 2;    // ergibt für x: 13
const y = (x + 3) / 8;  // ergibt für y: 2
```

<p class="info">
Neben den Grundrechenoperationen finden wir weitere nützliche <em>Funktionen</em> zur Anwendung auf dem Datentypen <em>number</em> im Modul <a href="https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math#Methods"><em>Math</em></a>.
</p>

Lass uns die Hypotenuse ***c*** eines rechtwinkligen Dreieckes, mit den gegebenen Seiten **a** und **b**, unter Verwendung des [Satzes des Pythagoras](https://de.wikipedia.org/wiki/Satz_des_Pythagoras), berechnen:
```javascript
const a = 5;    // Gegeben: Seite a vom Typ number
const b = 8;    // Gegeben: Seite b vom Typ number

const c = Math.sqrt(a**2 + b**2);   // ergibt für c: 9.433981132056603
```

### Alphanumerische Zeichen und Zeichenketten &#x2192; string

In JavaScript fasst man einzelne Buchstaben (allgemeiner: Zeichen) oder deren An­ei­n­an­der­rei­hung (Worte, Sätze, Bezeichner uvm.) unter dem Datentyp ***string***, was auf Deutsch so viel wie ***Zeichenkette*** bedeutet, zusammen. 

Zeichenketten werden i.d.R. immer dann genutzt, wenn was ausgegeben werden soll.

Wir haben drei Möglichkeiten *strings* anzugeben:

**Einfache Hochkomma** ```'```
```javascript
const name = 'Max Mustermann'; // Das ist ein string.
```
Bei der ersten Variante umschließen wir die Zeichenkette mit ***einfachen Hochkomma*** ```'```. Dies ist die einfachste Art und Weise einen string anzugeben.

**Doppelte Hochkomma** ```"```
```javascript
const frage = "Wie geht's?"; // Das ist ein string
```
Hin und wieder kann es sein, dass die Zeichenkette selbst die einfachen Hochkomma enthält, wie in diesem Beispiel. In diesem Fall ist es möglich die Zeichenkette mit ***doppelten Hochkomma*** ```"``` zu umschließen.

**Template strings** ``` ` ```
```javascript
let eineVariable = 'Das ist ein Text'; // Das ist ein string

// Das ist ein template string mit Zugriff auf den Kontext
const html = `<p class="mein-absatz">${eineVariable}</p>`;
```
Sofern die Zeichenkette selbst kompliziert ist, bspw. selbst Hochkomma enthält oder zusammengesetzt werden muss, kann man den sogenannten ***Template string*** nutzen. Bei den *Template string* wird die Zeichenkette in die sogenannten ***Backticks*** ``` ` ``` umschloßen. Innerhalb der Zeichenkette selbst, kann man auf den Kontext mittels ```${kontext}```zugreifen, bspw. auf Variablen.

#### Operationen auf strings

Du kannst einfach strings aus anderen strings zusammensetzen, indem Du diese mit dem ```+``` Operator verkettest (Konkatenation).

<p class="definition">
Das Verketten mehrerer strings zu einem resultierenden string nennt man <em>Konkatenation</em>.
</p>

Beispiel:

```javascript
const vorname = 'Lisa';
const nachname = 'Musterfrau';

const name = vorname + ' ' + nachname;
```

Hin und wieder ist es jedoch einfacher auf den Template string zurückzugreifen:

```javascript
const frage = `Du heißt ${name}, nicht wahr?!`;
```

Es ist auch denkbar, Werte eines anderen Datentypen mit einem string zu konkatenieren.

```javascript
const aussage = 'Ich bin ' + 99 + ' Jahre alt.';
```

Sofern man herausfinden möchte, wieviele Zeichen ein string enthält, kann man auf die ***Eigentschaft*** ***length*** eines strings zugreifen:

```javascript
console.log(`Die Aussage hat ${aussage.length} Zeichen.`);
    // Ausgabe: Die Aussage hat 21 Zeichen.
```

<p class="info">
Auch der <em>leere string</em> <code>''</code> ist ein string. Seine Länge ist <em>0</em>.
</p>
<!-- <iframe width="720" height="500" src="https://www.youtube.com/embed/eczbkWAGRic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->

### Wahrheitsaussagen mit der Booleschen Logik &#x2192; boolean

In JavaScript, wie auch in den meisten anderen Programmiersprachen, wird der Programmablauf maßgeblich von sogenannten ***Wahrheitsaussagen*** beinflusst. Eine Wahrheitsaussage kann entweder ***wahr*** ```true``` oder ***falsch*** ```false``` sein.


<p class="definition">
Der Datentyp <em>boolean</em> hat nur zwei mögliche Werte: <em>true</em> oder <em>false</em>.<br>
</p>

<p class="definition">
Die <em>Boolesche Logik</em> basiert auf dem Datentypen <em>boolean</em> unter Anwendung von <em>booleschen Operatoren</em>.<br><br>

Die möglichen Operationen sind <em>a und b</em> <code>a && b</code>, <em>a oder b</em> <code>a || b</code>, <em>nicht a</em> <code>!a</code>, <em>a gleich b</em> <code>a === b</code> und <em>a ungleich b</em> <code>a !== b</code>, wobei <em>a</em> und <em>b</em> vom Datentyp <em>boolean</em> sind.<br>Die Anwendung der booleschen Operationen resultiert wiederum in einem Wert vom Datentyp <em>boolean</em>.
</p>
