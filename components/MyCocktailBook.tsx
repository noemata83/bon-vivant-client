import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const ME_QUERY = gql`
  query MeQuery {
    me {
      username
      book {
        id
        name
        slug
      }
      shelf {
        id
        name
        slug
      }
    }
  }
`

const myCocktailBook = (props) => {
  const { data, error, loading } = useQuery(ME_QUERY)
  if (error) return <>`Ack! An error: ${error.message}`</>
  if (loading) return <>x`Loading...`</>
  const { me } = data
  const { book, shelf, username } = me
  return (
    <div>
      <h1>Welcome back, {username}!</h1>
      <h2>My cocktail book:</h2>
      <ul>
        {book.map((spec) => (
          <li key={spec.id}>
            <Link href={`/cocktails/[slug]`} as={`/cocktails/${spec.slug}`}>
              {spec.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default myCocktailBook
