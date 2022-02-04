export type PokemonData = {
  isLoading: boolean;
  data: {
    name: string;
    id: number;
    height: number;
    weight: number;
    base_experience: number;
    order: number;
    abilities: {
      ability: {
        name: string;
        url: string;
      };
      is_hidden: boolean;
      slot: number;
    }[];
    sprites: {
      front_default: string;
      front_female?: string;
      other: {
        "official-artwork": {
          front_default: string;
        }
      };
      versions: {
        "generation-v": {
          "black-white": {
            animated: {
              front_default: string;
            }
          }
        }
      }
    }
    stats: {
      baseStat: number;
      stat: {
        name: string;
      }
    }[];
    types: {
      slot: number;
      type: {
        name: string;
      }
    }[];
  }
}