---
layout: tutorial

lecture: "1"
lecture_title: "JavaScript und ECMAScript"

sublecture: "4"
sublecture_title: "Bedingte Ausführung mit if / else if / else"

date: 2020-05-27
categories: tutorial update

author: Pawel Sawicki
---

<!-- ![Essen kann viele Werte annehmen](/assets/food.jpg) -->

## Eine Autofahrt nach Rom

Michael möchte mit seinem Auto nach *Rom* fahren.

Er steht an einer *Wegabzweigung* und weiß nicht wohin er fahren soll, ***nach links*** oder ***nach rechts***.

Er fragt einen Passanten nach dem Weg. Der Passant antwortet: 

> Sofern sie nach Rom möchten, fahren sie nach links. Sofern sie nach Paris möchten, fahren sie nach rechts. Ansonsten fahren sie zurück, hier gibt es keine weiteren Wege.

Michael fährt nach links.

In dem Beispiel mich Michaels Autofahrt nach Rom finden wir drei Bedingungen vor, die eine Entscheidung einleiten:
1. ***Sofern sie nach Rom möchten***, fahren sie nach links.
2. ***Sofern sie nach Paris möchten***, fahren sie nach rechts.
3. ***Ansonsten*** fahren sie zurück, [...]

Da Michael nach *Rom* möchte, ist die Aussage 1 ***wahr*** (JavaScript: <code>true</code>), während die Aussage 2 ***falsch*** (JavaScript: <code>false</code>) ist. Die Aussage 3 kann ebenfalls nicht zutreffen, da die Aussage 1 bereits zutrifft.

In dem Beispiel haben wir es mit einer ***Bedingten Ausführung*** zu tun. Michael fährt in die Richtung (links oder rechts), deren Bedingung ***wahr*** ist.

## if / else if / else

Lass uns nun anschauen, wie wir das obige Beispiel mit JavaScript ausdrücken können.

```javascript
if (Bedingung) {
    // Code der ausgeführt werden soll, wenn die Bedingung zutrifft.
}
```
Die ***Bedingung*** ist hierbei ein boolescher Ausdruck, wie in der Lektion zu [Primitiven Datentypen](/tutorial/01/03-Primitive-Datentypen.html#wahrheitsaussagen-mit-der-booleschen-logik--boolean) kennengelernt.

Wie man sieht, ist die Bedingung innerhalb der notwendigen Klammern ```(``` und ```)``` anzugeben.

Auf diesen Klammerausdruck folgt der eigentliche Code, der nur dann ausgeführt wird, wenn die Bedingung zu ```true``` ausgewertet wird. Der Code ist innerhalb der *geschweiften* Klammern ```{``` und ```}``` anzugeben.

Lass uns das Beispiel aus der Einleitung mit JavaScript ausdrücken:

```javascript
const ziel = 'Rom';             // Das Ziel, gegeben als string

if (ziel === 'Rom') {           // (1) ist das Ziel "Rom"?
    fahre('links');             // ... dann fahre nach links.
} else if (ziel === 'Paris') {  // (2) ist das Ziel "Paris"?
    fahre('rechts');            // ... dann fahre nach rechts
} else {                        // (3) andernfalls
    fahre('zurück');            // ... fahre zurück.
}
```
1. Hier sehen wir einen Vergleich der Konstante *ziel* mit dem string ```'Rom'```. Dieser Vergleich ist eine mögliche ***Bedingung***. Die Bedingung wird durch das ```if``` Statement eingeleitet, gefolgt von einem booleschen Ausdruck, mit den Klammern ```(``` und ```)``` umschloßen. Sofern der boolesche Ausdruck *wahr* ist, d.h. zu ```true``` ausgewertet wird, dann wird der Code zwischen den geschweiften Klammern ```{``` und ```}``` ausgeführt.
2. Der Pfad, der mit ```else if``` eingeleitet ist, wird nur dann eingeschlagen, wenn die hier in Klammern stehende Bedingung zu ```true```ausgewertet wird **und** alle zuvor stehenden Bedingungen nicht zutreffen.
3. Sofern keine der darüber stehenden Bedingungen zutrifft, wird der mit ```else``` eingeleitete Pfad eingeschlagen. Die Angabe des ```else``` Pfades ist optional.

