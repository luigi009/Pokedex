import Layout from './components/Layout'
import Link from 'next/link'

export default function Home({ pokemon }) {
  return (
    <>
    <Layout title="Pokedex" >
      <h1 className="text-4xl mb-8 text-center font-bold">Pokedex</h1>
      <ul>
        <li>{pokemon.map((pokeman, index) => (
          <li className="slide-in-elliptic-top-fwd" key={index}>
            <Link href={`/pokemon?id=${index + 1}`}>
              <a className="border p-4 border-gray my-2 capitalize flex items-center text-lg bg-gray-200 rounded-md">
                <img className="w-20 h-20 mr-3" src={pokeman.image} alt={pokeman.name} />
                <span className="mr-2 font-bold">{index + 1}.</span>
                {pokeman.name}
              </a>
            </Link>
          </li>
        ))}</li>
      </ul>
    </Layout>
    </>
  )
}

export async function getStaticProps() {
  try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
      const { results } = await res.json();
      const pokemon = results.map((pokeman, index) => {
          const paddedId = ('00' + (index + 1)).slice(-3);

          const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
          return { ...pokeman, image };
      });
      return {
          props: { pokemon },
      };
  } catch (err) {
      console.error(err);
  }
}