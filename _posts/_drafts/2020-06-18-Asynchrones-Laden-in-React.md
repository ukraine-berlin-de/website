---
layout: post
title:  "Asynchrones Laden in React mit TypeScript"
date:   2020-06-18 10:00:00 +0100
categories: Artikel update
author: Pawel Sawicki

image: /assets/og/article_2020_06_18.jpg

seo:
  name: Asynchrones Laden in React - mit TypeScript
  publisher: Pawel Sawicki

---
![](/assets/idea.svg)

In der Webentwicklung mit React haben wir es häufig mit dem ***Asynchronem Laden*** von Daten zu tun, die für das Rendering von Components relevant sind.

In diesem Artikel wollen wir die übliche Vorgehensweise betrachten: **Das Zusammenspiel der Hooks** ***useEffect*** **und** ***useState***.

Wir stellen außerdem fest, dass diese Vorgehensweise zum repetitiven, unnötigen Boilerplate Code führt.

Wir entwickeln zwei Strategieen um diesen Nachteil zu vermeiden:
- Ein ***eigener Hook für den jeweiligen Anwendungsfall des asynchronen Ladens***
- Eine ***generische AsyncLoad Component***

## Asynchrones Laden innerhalb des *useEffect* Hooks

Schauen wir uns die Ausgangssituation an.

### Presentational Component

Wir haben die Component *ProfilePicture*, die den Datensatz *Profile* via Props entgegennimmt.

```tsx
// ProfilePicture.tsx
import React, { ReactElement } from 'react';
import Profile from '../domain/Profile';

export interface ProfilePictureProps {
  profile: Profile;
}

export function ProfilePicture({ profile }: ProfilePictureProps): ReactElement {
  // ...
}
```
Die Component macht nicht viel, sie zeigt was an. Die Component *ProfilePicture* ist somit in der Rolle einer ***[Presentational Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)***.

### Container Component

Die notwendigen Daten nimmt die *Presentational Component* via *Props* von der *Parent Component* entgegen. 

Sofern die Parent Component auch *Smart* ist, d.h. tatsächlich was macht, bspw. mit der API kommuniziert, spricht man von einer ***[Container Component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)***.

Schauen wir uns eine Container Component für unser Beispiel an: die *ProfileScreen Component*

```tsx
// ProfileScreen.tsx
import React, { ReactElement, useEffect, useState } from 'react';
import Profile, { profileService } from '../domain/Profile';
import { ProfilePicture } from '../components/ProfilePicture';

export function ProfileScreen(): ReactElement {
  const [me, setMe] = useState<Profile | null>(null);
  useEffect(() => {
    profileService.me().then((me: Profile) => {
      setMe(me);
    });
  }, [profileService]);

  return (
    <div>
      {me ? (
        <ProfilePicture profile={me} />
      ) : (
        <p>Loading...</p>
      )}
      { /* ... */ }
    </div>
  );
}
```

An diesem Beispiel sieht man das Zusammenspiel der Hooks ***[useEffect](https://reactjs.org/docs/hooks-effect.html)*** und ***[useState](https://reactjs.org/docs/hooks-state.html)***:
- useEffect - um den Datensatz asynchron zu laden
- useState - um ein Rerendering mit dem geladenen Datensatz anzustoßen

**Doch was, wenn wir das Profile** ***Me*** **öfters laden wollen?**

## Ein eigener Hook

Sofern wir den Datensatz öfters innerhalb unserer Anwendung laden müssen, bietet es sich an den entsprechenden Code als **[eigenen Hook](https://reactjs.org/docs/hooks-custom.html)** herauszuziehen.

```ts
// Profile.ts
import { useEffect, useState } from 'react';

export interface Profile { /* .. */ }

export interface ProfileService {
  // ...
  me(): Promise<Profile>;
  // ...
}

export const profileService: ProfileService = { /* ... */ }

// the associated hook
export function useMe(): Profile | null {
  const [me, setMe] = useState<Profile | null>(null);
  useEffect(() => {
    profileService.me().then((me: Profile) => {
      setMe(me);
    });
  }, [profileService]);
  return me;
}

export default Profile;
```

<p class="info">
Ich den Hook zu den assoziierten Artefakten <i>Profile</i> und <i>ProfileService</i> gepackt.
<br>
Du kannst selbstverständlich Deinen Code anderweitig auf Dateien verteilen.
</p>

Die Implementierung unserer Container Component *ProfileScreen* wird dadurch um einfacher:

```tsx
// ProfileScreen.tsx
import React, { ReactElement } from 'react';
import Profile, { useMe } from '../domain/Profile';
import { ProfilePicture } from '../components/ProfilePicture';

export function ProfileScreen(): ReactElement {
  const me = useMe();

  return (
    <div>
      {me ? (
        <ProfilePicture profile={me} />
      ) : (
        <p>Loading...</p>
      )}
      { /* ... */ }
    </div>
  );
}
```

Wie man an diesem Beispiel sieht, ist ein Import des useEffect und des useState Hooks nun nicht mehr notwendig.

Du magst Dir an dieser Stelle womöglich die Frage stellen: *Wann lohnt es sich einen eigenen Hook für den jeweiligen Anwendungsfall des asynchronen Ladens zu entwickeln?*

Die Frage lässt sich nicht pauschal beantworten, da dies von der jeweiligen Architektur der Anwendung abhängt. 

Zu den **Vorteilen** gehört sicherlich ***[Separation of concerns (SoC)](https://en.wikipedia.org/wiki/Separation_of_concerns)*** und weitestgehend ***[Loose coupling](https://en.wikipedia.org/wiki/Loose_coupling)***, was wiederum zum testbaren und lesbaren **[Clean Code](https://de.wikipedia.org/wiki/Clean_Code)** führt.

Zu den **Nachteilen** gehört der ***Mehraufwand bei der Implementierung, sofern der zu erstellende Hook nicht mehr als einmal genutzt wird***.

## Eine generische Component

Nun haben wir also in unserer Webapp mit dem oben genannten Nachteil zu tun. Wir müssen in unserer Webapp recht häfig einen Datensatz laden, wobei der jeweilige Datensatz **genau an einer Codestelle** zu laden ist.

Aus diesem Grund ist es legitim sich dagegen zu entscheiden, für jeden Anwendungsfall des asynchronen Ladens einen eigenen Hook einzuführen.

Trotzdem möchten wir uns die Implementierung des asynchronen Ladens, das immer nach dem gleichen Schema abläuft (in Verbindung mit *useEffect* und *useState*), vereinfachen. 

Hierzu bietet sich eine generische ***AsyncLoad*** Component an:

```tsx
import { ReactElement, useState, useEffect } from 'react';

export interface AsyncLoadProps<TData> {
  children: (data: TData | null) => ReactElement;
  load: () => Promise<TData | null>;
}

export default function AsyncLoad<TData>({ children, load }: AsyncLoadProps<TData>): ReactElement {
  const [data, setData] = useState<TData | null>(null);
  useEffect(() => {
    load().then(setData);
  }, [load]);

  return children(data);
}
```
Diese Component kann in unserer Container Component *ProfileScreen* wie folgt genutzt werden:
```tsx
// ProfileScreen.tsx
import React, { ReactElement } from 'react';
import Profile, { profileService } from '../domain/Profile';
import { ProfilePicture } from '../components/ProfilePicture';

export function ProfileScreen(): ReactElement {
  // no loading of 'me' needed here
  return (
    <div>
      <AsyncLoad load={profileService.me}>
        {
          (me: Profile) => me ? (
            <ProfilePicture profile={me} />
          ) : (
            <p>Loading...</p>
          )
        }
      </AsyncLoad>
      { /* ... */ }
    </div>
  );
}
```