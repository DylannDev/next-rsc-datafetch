// 🐶 Importe la fonction `getPosts` qui va récupérer les posts en BDD
import {getPosts} from '@/db/sgbd'

export async function GET() {
  const posts = await getPosts()
  return Response.json(posts)
}
