# Rappel fetch dans un composant React (client)

### 💡 Comment récupérer des données via `fetch`

## 📝 Tes notes

Détaille ce que tu as appris ici, sur une page [Notion](https://go.mikecodeur.com/course-notes-template)

## Comprendre

`Fetch` (comme `axios`) permet de récupérer des données sur un serveur. Souvent via des API REST en JSON. Exemple :

```jsx
const response = await fetch('https://jsonplaceholder.typicode.com/posts')
const data = await response.json()
```

Avec `React`, cet appel est généralement fait dans un `useEffect` et les données sont ajoutées dans un `state`.

```jsx
const [posts, setPosts] = useState<Post[]>([])

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      const data = await response.json()
      setPosts(data as Post[])
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
  fetchPosts()
}, [])
```

## Exercice

Dans cet exercice, tu vas devoir appeler et afficher une liste de `posts` dans un composant client de manière classique.

Observe le comportement client avec la commande `CURL`

```jsx
curl http://localhost:3000/exercises/post
```

Fichiers

- `app/exercises/post/page`

## Bonus

### 1. 🚀 JSON-SERVER

Afin de ne pas être dépendant d’un service externe, nous allons utiliser un petit utilitaire qui permet de démarrer simplement un serveur API REST à partir d’un simple fichier JSON. Pour simplifier l’exercice, cet utilitaire est déjà préconfiguré dans `package.json`

```jsx
 "json-server": "json-server --watch ./src/db/db.json --port 4000"
```

Et pour plus de transparence, il est automatiquement lancé lors d’un `npm dev`

```jsx
 "dev": "concurrently 'npm run json-server' 'next dev'",
```

Dans cet exercice bonus, remplace l’appel du service

```jsx
https://jsonplaceholder.typicode.com/posts
par
http://localhost:4000/posts/
```

Fichiers

- `app/exercises/post/page`

## Aller plus loin

📑 Le lien vers la doc [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Ils vont t’aider

- **🐶 Mowgli le Chien** : _Mowgli te guidera dans chaque exercice._
- **🤖 Ash le Robot** : _Ash le Robot te donnera du code utile._
- **🚀 Julia La roquette** : _Julia te donnera des défis supplémentaires._
- **⛏️ Hulk le Marteau** : _Quand du code à supprimer est présent_
- **👨‍✈️ Hugo le chef de projet** : _Va t'aider sur les spécifications du projet_

## 🐜 Feedback

Remplir le formulaire le [formulaire de FeedBack](https://go.mikecodeur.com/cours-next-avis?entry.1912869708=Next%20PRO&entry.1430994900=03.RSC%20Data%20fetch&entry.533578441=02%20Fetch%20RCC).
