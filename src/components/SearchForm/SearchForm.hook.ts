import { useEffect } from "react"
import { pokemonListServices, pokemonDetailServices } from '@/services'
import { usePokemonListStore } from '@/store/pokemonList'
import { useForm } from "react-hook-form";
import { generationList } from "@/utils/optionList";
import { IPokemonDetailResponse } from "@/interface/pokemonDetail";


//  function การทำงาน
const useSearchForm = () => {
  const {
    register,
    watch,
  } = useForm()
  const { setFetchPokemonList, fetchPokemon, setPokemonList } = usePokemonListStore()
  const keyword = watch('keyword')
  const generation = watch('generation')
  const type = watch('type')
  const sort = watch('sort')

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({ data: [], loading: true, error: null })
    const responseList = await pokemonListServices.getPokemonList(filter.limit, filter.offset)
    const pokeList = []

    if (responseList.status === 200) {
      const responseResults = responseList.data?.results || []
      for (const pokemon of responseResults) {
        const response = await pokemonDetailServices.getPokemonDetail(pokemon.name)
        const pokeData = response.data
        if (pokeData)
          pokeList.push({ ...pokeData, image: pokeData.sprites.other.dream_world.front_default || pokeData.sprites.other['official-artwork'].front_default })
      }
      // สำหรับ Search 
      setFetchPokemonList({ data: pokeList, loading: false, error: null })
      const data = filterPokemon(pokeList, keyword, type, sort)
      //  สำหรับคืนค่าเดิมไปยังหน้า Home
      setPokemonList({ data: data, loading: false, error: null })
    } else {
      setFetchPokemonList({ data: [], loading: false, error: responseList.error })
    }
  }

  const filterPokemon = (pokeList: IPokemonDetailResponse[], keyword: string, type: string, sort: 'id' | 'name') => {
    const keywordFilter = pokeList.filter((item) => item.name.toLowerCase().includes(keyword?.toLowerCase()))
    const typeFilter = type !== 'all types' ? keywordFilter.filter((item) => item.types.find((f) => f.type.name.toLowerCase().includes(type.toLowerCase()))) : keywordFilter
    return sortBy(typeFilter, sort)
  }

  const sortBy = (data: IPokemonDetailResponse[], type: 'id' | 'name') => {
    switch (type) {
      case 'id':
        return data.sort((a, b) => a.id - b.id)
      case 'name':
        return data.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
      default:
        return data.sort((a, b) => a.id - b.id)
    }
  }

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation])
    }
  }, [generation])

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, type, sort)
    setPokemonList({ data: data, loading: false, error: null })
  }, [keyword, type, sort])

  return {
    fieldKeyword: register("keyword"),
    fieldGeneration: register("generation"),
    fieldType: register("type"),
    fieldSort: register("sort")
  }
}

export { useSearchForm }