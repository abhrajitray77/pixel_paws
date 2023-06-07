import { Game } from "@/gameTypes";
import { ResponseSchema, get } from "./api";

//for searching for games

interface Params {
    term: string;
}

const Search = (params: Params): Promise<ResponseSchema<Game>> => {
    return get<ResponseSchema<Game>>(`games?search=${params.term}&ordering=-added&search_exact=true`)
};

export { Search }