// import PokemonCard from "@/components/PokemonCard"
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";
import { pokemonDetailServices /*pokemonListServices*/ } from "@/services";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type pokemonType = {
  data: IPokemonDetailResponse | undefined;
  loading: boolean;
  error: null | any;
};

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    const response = await pokemonDetailServices.getPokemonDetail(name);
    if (response.status === 200) {
      if (response.data)
        setPokemon({
          data: {
            ...response.data,
            image:
              response.data.sprites.other.dream_world.front_default ||
              response.data.sprites.other["official-artwork"].front_default,
          },
          loading: false,
          error: null,
        });
    } else {
      setPokemon({ data: undefined, loading: false, error: response.error });
    }
  };

  useEffect(() => {
    if (name) callData(name);
  }, [name]);

  return (
    <div className="w-[90%] max-w-[1100px] m-[auto]">
      <Link to={"/"}>
        <div className="flex justify-center">
          <img
            src="/images/logo.webp"
            className="max-h-[80px] mt-[20px] mb-[20px]"
            alt="logoPokemon"
          />
        </div>
      </Link>
      <Link
        to={"/"}
        className="bg-blue-300 text-gray-800  px-[20px] py-[10px] rounded-[20px] font-semibold"
      >
        Back
      </Link>
      <div className="w-[90%] m-[auto] flex justify-center ">
        {pokemon.data && (
          <div className="rounded-2xl">
            <div className="bg-[url('/images/pokemon_bg.png')] bg-center w-full bg-cover">
              <img
                className="rounded-t-lg p-[40px] w-full"
                src={pokemon.data.image}
                alt=""
              />
            </div>
            <div className="p-5 bg-[#2c2b47] rounded-[25px] mt-[50px]">
              <div className="flex justify-between">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-300 capitalize">
                  {pokemon.data.name}
                </h5>
                <h6 className="mt-2 mr-4 text-xl tracking-tight text-gray-300">
                  # {pokemon.data.id}
                </h6>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 ">
                <div className="">
                  <div className="text-red-50 flex gap-10">
                    Height :
                    <div className="text-green-300 ">
                      {pokemon.data.height} m{" "}
                    </div>
                  </div>
                  <div className="text-red-50 flex pt-[8px] gap-8">
                    Weight :
                    <div className="text-green-300">
                      {pokemon.data.weight} kg
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 justify-end text-sm mt-5 sm:ml-14 md:ml-[50px] m-auto p-[5px]">
                  {pokemon.data.types.map((item) => {
                    return (
                      <span
                        key={item.type.name}
                        className={`badge-type-${item.type.name} p-2 rounded-xl capitalize`}
                      >
                        {item.type.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <p className="text-red-50">Abilities :</p>
                {pokemon.data.abilities.map((item) => {
                  return (
                    <div
                      key={item.ability.name}
                      className="capitalize text-[#fecdd3] bg-[#9f1239] rounded-[10px] py-1 px-2 mt-2 flex justify-center ml-2"
                    >
                      {item.ability.name}
                    </div>
                  );
                })}
              </div>
              <div>
                <h5 className="text-red-50 mt-2 mb-2 text-lg">State :</h5>
                <div className="grid grid-cols-1 gap-[10px] mt-1">
                  {pokemon.data.stats.map((item) => {
                    return (
                      <div
                        key={item.stat.name}
                        className="flex gap-5 text-[#5eead4] capitalize justify-between"
                      >
                        <div>{item.stat.name} :</div>
                        <div className="flex">
                          <div className="text-[#15803d] bg-[#fee2e2] rounded-[10px] m-auto px-[30px]">
                            {item.base_stat}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
