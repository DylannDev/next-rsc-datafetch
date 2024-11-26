# Exposer des API REST (Route Handler)

### 💡 Exposer API dans Next

## 📝 Tes notes

Détaille ce que tu as appris ici, sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

Les applications, sites, SaaS contiennent généralement 2 grosses parties. Un front-end et un back-end. Par exemple, le client en `React` appelle un serveur (souvent développé avec d’autres Langages/Frameworks). Exemple React / Node Express ou Angular / Spring Boot. Avec Next, il est également possible d’exposer du code serveur via des API REST pour avoir une application où tout est géré dans le même projet avec le même langage et framework. Pour cela, il existe le principe de route handler. Il suffit de créer un fichier `route.ts`.

```tsx
//app/items/route.ts
export async function GET() {
  const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return Response.json({data})
}
```

📑 Le lien vers la doc [https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention)

## Exercice

**🐶** Dans cet exercice, tu vas devoir remplacer l’`API REST` externe qui permet d’avoir une liste de `posts` par notre propre `API REST`. Nous allons créer un `endpoint` comme cela.

```tsx
http://localhost:3000/exercises/api/posts
```

Les `posts` sont stockés côté backend dans une base de données light `lowdb`.

**🤖** Pour simplifier l’exercice, une fonction `getPosts` permet de récupérer les `posts` en bdd.

```tsx
import {getPosts} from '@/db/sgbd'
```

- Dans `route.tsx` fait l’appel en base de données et retourne les données au format JSON.
- Dans `page.tsx` modifie l'url.

Fichiers

- `exercise/api/posts/route.tsx`
- `exercise/post/page.tsx`

## Bonus

### 1. 🚀 Appeler des API externes depuis le route handler

Il est également possible d’appeler des API externes depuis le route handler. Cela permet notamment de faire appel à différentes sources de données (MongoDB, Prisma ou n’importe quel autre service )

🐶 Dans cet exercice, adapte l’appel de la bdd vers un appel de post externe.

```tsx
**// ⛏️ n'appelle plus** getPosts
**//**import {getPosts} from '@/db/sgbd'

// mais
fetch('https://jsonplaceholder.typicode.com/posts')
```

Fichiers

- `exercise/api/posts/route.tsx`

<aside>
💡 Vérifie via un CURL [http://localhost:3000/exercises/post](http://localhost:3000/exercises/post) que cela n’est toujours pas optimisé pour le SEO

</aside>

## Aller plus loin

📑 Le lien vers la doc [https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention](https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention)

## Ils vont t’aider

- **🐶 Mowgli le Chien** : _Mowgli te guidera dans chaque exercice._
- **🤖 Ash le Robot** : _Ash le Robot te donnera du code utile._
- **🚀 Julia La roquette** : _Julia te donnera des défis supplémentaires._
- **⛏️ Hulk le Marteau** : _Quand du code à supprimer est présent_
- **👨‍✈️ Hugo le chef de projet** : _Va t'aider sur les spécifications du projet_

## 🐜 Feedback

Remplir le formulaire le [formulaire de FeedBack](https://go.mikecodeur.com/cours-next-avis?entry.1912869708=Next%20PRO&entry.1430994900=03.RSC%20Data%20fetch&entry.533578441=03%20Route%20handler).
