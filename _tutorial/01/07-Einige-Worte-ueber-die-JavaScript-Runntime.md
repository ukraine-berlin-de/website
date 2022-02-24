---
layout: tutorial

lecture: "1"
lecture_title: "JavaScript und ECMAScript"

sublecture: "7"
sublecture_title: "Einige Worte über die JavaScript Runtime."

date: 2020-05-18
categories: tutorial update

author: Pawel Sawicki
---

<figure>
  <img src="{{site.url}}/assets/queue.svg" alt="Die JavaScript Runtime funktioniert so ähnlich wie die Schlange zur Kasse."/>
  <figcaption>Die JavaScript Runtime funktioniert so ähnlich wie die Schlange zur Kasse.</figcaption>
</figure>


## Ein Gedankenexperiment

Stell Dir mal vor, es ist Feierabend. 

Du möchtest nach Deinem täglichen Treiben nach Hause gehen. Du kommst jedoch auf den Gedanken, wie so ziemlich viele andere Menschen zu dieser Zeit: _Ich muss noch einkaufen_.

Du gehst in den Supermarkt Deiner Wahl.

Dort findest Du folgende Situation vor: Eine menge Menschen laufen wie wild mit Ihren Einkaufskörben umher. 

> Hilfe! Der Supermarkt ist überlaufen.

Aber es soll noch schlimmer kommen. Du gehst mit Deinem mühevoll zusammengestellten Einkäufen in Richtung der Kasse. 

> Oh, nein! Nur eine Kasse ist offen.

> Eine lange Schlange von Menschen steht davor.

Wie das Pech so will: 
> Jeder dieser Menschen hat einen überfüllten Warenkorb.

> Der Kassierer ist unglaublich langsam.

Ein erschreckendes Szenario, nicht wahr? Doch was hat das alles mit JavaScript zu tun?
Nun, eine ganze Menge, wie wir gleich sehen werden.

## Ein Blick auf die JavaScript Runtime

Das Szenario, wie oben beschrieben, lässt sich wunderbar auf JavaScript übertragen:

Das hohe Aufkommen von Menschen, die wie wild umherlaufen, steht sinnbildlich für das nicht deterministische hohe Aufkommen von ***Events*** in unserer JavaScript Anwendung: *Click*, *MouseMove*, *Scroll*, *Input*, uvm.

In JavaScript steht uns Anwendungsentwicklern nur ***ein einziger Thread*** für unsere ganze Anwendung zur Verfügung. Ein einziger Thread für alles: Sowohl für unseren selbstgeschriebenen Code als auch für die Bibliotheken und Frameworks die wir nutzen (bspw. React, Angular oder Vue).

Die einzige offene Kasse steht sinnbildlich für diesen Thread der in der Lage dazu ist, das Aufkommen der Events abzuarbeiten.

Man mag sich an dieser Stelle fragen:

> Was heißt es ein Event abzuarbeiten?

Nun, im oben genannten Szenario ist das recht einfach: Jeder Einkäufer hat einen Warenkorb und der Kassierer muss die Waren aus dem Korb kassieren.

In JavaScript können wir als Anwendungsentwickler für jedes Aufkommen eines Events ein Interesse kundgeben (oder eben nicht), indem wir ein Stück ***Code hinterlegen***. Der hinterlegte Code soll genau dann ausgeführt werden, wenn das Event an der Reihe ist vom Thread abgearbeitet zu werden.

Du kannst es Dir vorstellen: Wenn alle Menschen recht volle Einkaufskörbe haben, dauert es recht lange bis Du an der Reihe bist. Genauso verhält es sich bei JavaScript: Wenn der Code den Du für  die Events hinterlegst zu *schwergewichtig* ist, müssen die Events tendenziell lange warten bis sie vom Thread abgearbeitet werden können.

Was heißt das konkret? 

Beispiel: Du interessierst Dich für das *KeyDown* Event auf einem Input. Du hinterlegst für diesen Event Code, der sekundenlange Berechnungen macht. Du wirst schnell feststellen, dass die Tastatureingaben, die der Benutzer macht, erst viel später sichtbar wahrgenommen werden. 
Jede Tastatureingabe löst ein Event aus, für das erst einmal Dein schwergewichtiger Code von dem einzigen zur Verfügung stehenden Thread ausgeführt werden muss.

Tbd 



<figure>
  <img src="{{site.url}}/assets/js-runtime.png" alt="Ein Modell der JavaScript Runtime."/>
  <figcaption>Ein Modell der JavaScript Runtime.</figcaption>
</figure>

## Übung

tbd

<iframe
     src="https://codesandbox.io/embed/heuristic-gould-xe5z2?fontsize=14&hidenavigation=1&view=editor"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="heuristic-gould-xe5z2"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>