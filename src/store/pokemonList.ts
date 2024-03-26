import { create } from 'zustand'
import {IPokemonDetailResponse} from '@/interface/pokemonDetail'


// ค่าเริ่มต้น
const initStore = {
    pokemon:{
        data: [],
        loading: false,
        error: null
    },
    fetchPokemon:{
        data: [],
        loading: false,
        error: null
    }
}

type pokemonType = {
    data: IPokemonDetailResponse[],
    loading: boolean,
    error: null | any
}

type UsePokemonListStoreType = {
    pokemon:pokemonType,
    fetchPokemon:pokemonType,
    setPokemonList: (value: pokemonType) => void,
    setFetchPokemonList: (value: pokemonType) => void,
    clearPokemon: () => void,
}

export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
    // จะมีค่าเริ่มต้นเป็น pokemon
    ...initStore,
    // function ที่เอาไว้จัดการ store
    setPokemonList: (value: pokemonType) => set({ pokemon: value }),
    setFetchPokemonList: (value: pokemonType) => set({ fetchPokemon: value }),
    clearPokemon: () => set({ ...initStore }),
}))