export default interface IPokemon {
	id: number
	name: string
	height?: number
	weight?: number
	base_experience?: number
	types?: {
		type: {
			name: string
		}
	}[]
	abilities?: {
		ability: {
			name: string
		}
		is_hidden: boolean
		slot: number
	}[]
	moves?: {
		move: {
			name: string
		}
	}[]
	sprites?: {
		other: {
			'official-artwork': {
				front_default: string,
			},
		},
	}
	stats?: {
		base_stat: number
		stat: {
			name: string
		}
	}[]
}
