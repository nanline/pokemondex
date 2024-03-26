import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from "@/store/pokemonList";
import PokemonCard from "@/components/PokemonCard";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore();
  return (
    <div className="w-[90%] max-w-[1100px] m-[auto]">
      <div className="flex justify-center">
        <img
          src="/images/logo.webp"
          className="max-h-[80px] mt-[20px] mb-[20px]"
          alt="logoPokemon"
        />
      </div>
      <SearchForm />
      {fetchPokemon.loading && (
        <div className="h-[600px] flex justify-center items-center">
          <ReactLoading type="spinningBubbles" color="#fff" />
        </div>
      )}

      {!fetchPokemon.loading && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[30px] mt-[40px]">
          {pokemon.data?.map((item) => {
            return (
              <PokemonCard
                key={item.id}
                image={item.image || ""}
                name={item.name}
                id={item.id}
                types={item.types}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
