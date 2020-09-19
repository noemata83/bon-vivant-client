import { useQuery } from "@apollo/client"
import { ME_QUERY } from "../queries/me"
import Link from "next/link"

export default (props) => {
  const { data, error, loading } = useQuery(ME_QUERY)
  if (error) return `Ack! An error: ${error.message}`
  if (loading) return `Loading...`
  const { me } = data
  const { book, shelf, username } = me
  return (
    <div>
      <div>Successfully logged in. Welcome back, {username}!</div>
      <div>
        <h2>Saved Cocktails</h2>
        <ul>
          {book.slice(0, 4).map((spec) => (
            <li key={spec.id}>
              <Link href="cocktails/[slug]" as={`/cocktails/${spec.slug}`}>
                <a>{spec.name}</a>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/my-cocktail-book">
              <a>View all saved cocktails</a>
            </Link>
          </li>
        </ul>
        <h2>On Your Shelf</h2>
        <ul>
          {shelf.slice(0, 4).map((ingredient) => (
            <li key={ingredient.name}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
