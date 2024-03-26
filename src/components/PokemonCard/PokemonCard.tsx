import { Type } from "@/interface/pokemonDetail";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
  return (
    <div className="max-w-[275px] rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 p-[16px] bg-white hover:scale-105 w-full m-auto">
      <div className="bg-[url('/images/poke-card-bg.png')] bg-center aspect-square w-full bg-cover rounded-full">
        <Link to={`/detail/${name}`}>
          <img
            className="rounded-t-lg h-[218px] p-[30px] w-full"
            src={image}
            alt=""
          />
        </Link>
      </div>
      <div className="p-5 bg-white">
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white capitalize">
            {name}
          </h5>
          <h6 className="mt-2 text-base tracking-tight text-gray-800 dark:text-white">
            # {id}
          </h6>
        </div>
        <div className="flex gap-2 justify-end text-sm mt-2">
          {types.map((item) => {
            return (
              <span
                key={item.type.name}
                className={`badge-type-${item.type.name} px-5 py-[5px] rounded-xl capitalize`}
              >
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
