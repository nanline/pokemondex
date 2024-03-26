import axios from "axios"
import { POKEMON_BASE_URL } from '@/utils/constant' ;
import { IPokemonListResponse } from "@/interface/pokemonList";
import { handleResponse, IResponse } from '@/utils/handleResponse'

                             //   สืบทอด
interface IGetPokemonListResponse extends IResponse {
    status: number | undefined
    data?: IPokemonListResponse
}

// ยิง API 
export const pokemonListServices = {
    getPokemonList : async (limit?:number, offset?:number): Promise<IGetPokemonListResponse> => {
        try {
            const response = await axios.get(`${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}&offset=${offset || 0}`)
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }
    },
}