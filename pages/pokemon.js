import React from 'react'
import Layout from './components/Layout'
import Link from 'next/link'

export default function pokemon({ pokeman }) {
    return (
        <>
            <Layout title={pokeman.name}>
                <h1 className="tracking-in-expand text-4xl mb-2 text-center capitalize font-bold">{pokeman.name}</h1>
                <img className="tilt-in-top-1 mx-auto" src={pokeman.image} alt={pokeman.name} />
                <div className="slide-in-blurred-top flex items-center flex-col">
                    <p><span className="font-bold mr-2">Weight: </span>{pokeman.weight}</p>
                    <p><span className="font-bold mr-2">Height: </span>{pokeman.height}</p>
                    <h2 className="text-2xl mt-6 mb-2 font-bold">Types</h2>
                    {pokeman.types.map((type, index) => (
                        <p key={index}>{type.type.name}</p>
                    ))}
                </div>
                <p className="puff-in-center mt-10 text-center">
                    <Link href="/">
                        <a className="text-2 underline text-2xl">Back</a>
                    </Link>
                </p>
            </Layout>
        </>
    )
}

export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedId = ('00' + id).slice(-3);
        pokeman.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
        return {
            props: { pokeman },
        };
    } catch (err) {
        console.error(err);
    }
}