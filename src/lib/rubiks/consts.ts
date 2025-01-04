type LengthArray<T, N extends number, R extends T[] = []> = number extends N
	? T[]
	: R['length'] extends N
		? R
		: LengthArray<T, N, [T, ...R]>;

// Centers
export const [U, D, L, R, F, B] = [0, 1, 2, 3, 4, 5] as const;
// as const is needed to make it being able to act like a type to define type "Faces"

// Corners
export const [ULF, ULB, URB, URF, DLF, DLB, DRB, DRF] = [0, 1, 2, 3, 4, 5, 6, 7] as const;

// Edges
export const [UF, UL, UB, UR, DF, DL, DB, DR, FL, BL, BR, FR] = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
] as const;

export type Center = typeof U | typeof D | typeof L | typeof R | typeof F | typeof B;

export type Corner =
	| typeof ULF
	| typeof ULB
	| typeof URB
	| typeof URF
	| typeof DLF
	| typeof DLB
	| typeof DRB
	| typeof DRF;

export type Edge =
	| typeof UF
	| typeof UL
	| typeof UB
	| typeof UR
	| typeof DF
	| typeof DL
	| typeof DB
	| typeof DR
	| typeof FL
	| typeof BL
	| typeof BR
	| typeof FR;

export type Face = Center;

export type Cube = {
	centers: LengthArray<Center, 6>;
	corners: LengthArray<Corner, 8>;
	edges: LengthArray<Edge, 12>;
};

export type Facelet = LengthArray<Face, 9>;
export type MOVE = 'U' | 'D' | 'L' | 'R' | 'F' | 'B';

export const SOLVED_CUBE: Cube = {
	centers: [U, D, L, R, F, B],
	corners: [ULF, ULB, URB, URF, DLF, DLB, DRB, DRF],
	edges: [UF, UL, UB, UR, DF, DL, DB, DR, FL, BL, BR, FR]
} as const;

export const MOVES: Record<MOVE, Cube> = {
	U: {
		centers: [U, D, L, R, F, B],
		corners: [URF, ULF, ULB, URB, DLF, DLB, DRB, DRF],
		edges: [UR, UF, UL, UB, DF, DL, DB, DR, FL, BL, BR, FR]
	},
	D: {
		centers: [U, D, L, R, F, B],
		corners: [ULF, ULB, URB, URF, DRF, DLF, DLB, DRB],
		edges: [UF, UL, UB, UR, DF, DL, DB, DR, FL, BL, BR, FR]
	},
	L: {
		centers: [U, D, L, R, F, B],
		corners: [ULB, DLB, DRB, URB, ULF, DLF, DRF, URF],
		edges: [UF, BL, UB, UR, DF, DL, DB, DR, FL, UL, BR, FR]
	},
	R: {
		centers: [U, D, L, R, F, B],
		corners: [ULF, ULB, DRB, URB, DLF, DLB, DRF, URF],
		edges: [UF, UL, UB, BR, DF, DL, DB, FR, FL, BL, UR, DR]
	},
	F: {
		centers: [U, D, L, R, F, B],
		corners: [DLF, ULF, ULB, DLB, DRF, URF, URB, DRB],
		edges: [FL, UL, UB, UR, FR, DL, DB, DR, UF, BL, BR, DF]
	},
	B: {
		centers: [U, D, L, R, F, B],
		corners: [ULF, ULB, URB, URF, DLF, DLB, DRB, DRF],
		edges: [UF, UL, UB, UR, DF, DL, DB, DR, FL, BL, BR, FR]
	}
} as const;
