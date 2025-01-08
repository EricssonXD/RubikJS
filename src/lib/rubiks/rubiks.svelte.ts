// The logic here is inspired from the repository https://github.com/ldez/cubejs

// Centers
const [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5] as const;

// Corners
const [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7] as const;

// Edges
const [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
] as const;

const [centerFacelet, cornerFacelet, edgeFacelet] = (() => {
	const _U = (x: number) => x - 1;
	const _R = (x: number) => _U(9) + x;
	const _F = (x: number) => _R(9) + x;
	const _D = (x: number) => _F(9) + x;
	const _L = (x: number) => _D(9) + x;
	const _B = (x: number) => _L(9) + x;

	return [
		// Centers
		[4, 13, 22, 31, 40, 49],
		// Corners
		[
			[_U(9), _R(1), _F(3)],
			[_U(7), _F(1), _L(3)],
			[_U(1), _L(1), _B(3)],
			[_U(3), _B(1), _R(3)],
			[_D(3), _F(9), _R(7)],
			[_D(1), _L(9), _F(7)],
			[_D(7), _B(9), _L(7)],
			[_D(9), _R(9), _B(7)]
		],
		// Edges
		[
			[_U(6), _R(2)],
			[_U(8), _F(2)],
			[_U(4), _L(2)],
			[_U(2), _B(2)],
			[_D(6), _R(8)],
			[_D(2), _F(8)],
			[_D(4), _L(8)],
			[_D(8), _B(8)],
			[_F(6), _R(4)],
			[_F(4), _L(6)],
			[_B(6), _L(4)],
			[_B(4), _R(6)]
		]
	];
})();

const centerColor: string[] = ['U', 'R', 'F', 'D', 'L', 'B'];
const cornerColor: string[][] = [
	['U', 'R', 'F'],
	['U', 'F', 'L'],
	['U', 'L', 'B'],
	['U', 'B', 'R'],
	['D', 'F', 'R'],
	['D', 'L', 'F'],
	['D', 'B', 'L'],
	['D', 'R', 'B']
];
const edgeColor: string[][] = [
	['U', 'R'],
	['U', 'F'],
	['U', 'L'],
	['U', 'B'],
	['D', 'R'],
	['D', 'F'],
	['D', 'L'],
	['D', 'B'],
	['F', 'R'],
	['F', 'L'],
	['B', 'L'],
	['B', 'R']
];

export class RubiksCube {
	private center: number[] = $state([]);
	private cp: number[] = $state([]);
	private co: number[] = $state([]);
	private ep: number[] = $state([]);
	private eo: number[] = $state([]);

	// Temporary arrays for multiplication
	private newCenter: number[];
	private newCp: number[];
	private newEp: number[];
	private newCo: number[];
	private newEo: number[];

	cube = $derived.by(() => {
		const result: string[] = [];
		for (let i = 0; i <= 5; i++) {
			result[centerFacelet[i]] = centerColor[this.center[i]];
		}
		for (let i = 0; i <= 7; i++) {
			const corner = this.cp[i];
			const ori = this.co[i];
			for (let n = 0; n < 3; n++) {
				result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
			}
		}
		for (let i = 0; i <= 11; i++) {
			const edge = this.ep[i];
			const ori = this.eo[i];
			for (let n = 0; n < 2; n++) {
				result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
			}
		}

		return {
			U: result.slice(0, 9),
			R: result.slice(9, 18),
			F: result.slice(18, 27),
			D: result.slice(27, 36),
			L: result.slice(36, 45),
			B: result.slice(45, 54)
		};
	});

	constructor(other?: CubeState) {
		if (other != null) {
			this.init(other);
		} else {
			this.identity();
		}

		// For moves to avoid allocating new objects each time
		this.newCenter = Array(6).fill(0);
		this.newCp = Array(8).fill(0);
		this.newEp = Array(12).fill(0);
		this.newCo = Array(8).fill(0);
		this.newEo = Array(12).fill(0);
	}

	init(state: CubeState): void {
		this.center = [...state.center];
		this.cp = [...state.cp];
		this.co = [...state.co];
		this.ep = [...state.ep];
		this.eo = [...state.eo];
	}

	identity(): void {
		this.center = [0, 1, 2, 3, 4, 5];
		this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
		this.co = Array(8).fill(0);
		this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		this.eo = Array(12).fill(0);
	}

	toJSON(): CubeState {
		return {
			center: this.center,
			cp: this.cp,
			co: this.co,
			ep: this.ep,
			eo: this.eo
		};
	}

	asString(): string {
		const result: string[] = [];
		for (let i = 0; i <= 5; i++) {
			result[centerFacelet[i]] = centerColor[this.center[i]];
		}
		for (let i = 0; i <= 7; i++) {
			const corner = this.cp[i];
			const ori = this.co[i];
			for (let n = 0; n < 3; n++) {
				result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
			}
		}
		for (let i = 0; i <= 11; i++) {
			const edge = this.ep[i];
			const ori = this.eo[i];
			for (let n = 0; n < 2; n++) {
				result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
			}
		}
		return result.join('');
	}

	static fromString(str: string): RubiksCube {
		let ori: number;
		const cube = new RubiksCube();
		for (let i = 0; i <= 5; i++) {
			for (let j = 0; j <= 5; j++) {
				if (str[9 * i + 4] === centerColor[j]) {
					cube.center[i] = j;
				}
			}
		}
		for (let i = 0; i <= 7; i++) {
			for (ori = 0; ori <= 2; ori++) {
				if (['U', 'D'].includes(str[cornerFacelet[i][ori]])) {
					break;
				}
			}
			const col1 = str[cornerFacelet[i][(ori + 1) % 3]];
			const col2 = str[cornerFacelet[i][(ori + 2) % 3]];
			for (let j = 0; j <= 7; j++) {
				if (col1 === cornerColor[j][1] && col2 === cornerColor[j][2]) {
					cube.cp[i] = j;
					cube.co[i] = ori % 3;
				}
			}
		}
		for (let i = 0; i <= 11; i++) {
			for (let j = 0; j <= 11; j++) {
				if (
					str[edgeFacelet[i][0]] === edgeColor[j][0] &&
					str[edgeFacelet[i][1]] === edgeColor[j][1]
				) {
					cube.ep[i] = j;
					cube.eo[i] = 0;
					break;
				}
				if (
					str[edgeFacelet[i][0]] === edgeColor[j][1] &&
					str[edgeFacelet[i][1]] === edgeColor[j][0]
				) {
					cube.ep[i] = j;
					cube.eo[i] = 1;
					break;
				}
			}
		}
		return cube;
	}

	clone(): RubiksCube {
		return new RubiksCube(this.toJSON());
	}

	static random(): RubiksCube {
		return new RubiksCube().randomize();
	}

	isSolved(): boolean {
		const clone = this.clone();
		clone.move(clone.upright());
		for (let cent = 0; cent <= 5; cent++) {
			if (clone.center[cent] !== cent) {
				return false;
			}
		}
		for (let c = 0; c <= 7; c++) {
			if (clone.cp[c] !== c || clone.co[c] !== 0) {
				return false;
			}
		}
		for (let e = 0; e <= 11; e++) {
			if (clone.ep[e] !== e || clone.eo[e] !== 0) {
				return false;
			}
		}
		return true;
	}

	centerMultiply(other: CubeState): this {
		for (let to = 0; to <= 5; to++) {
			const from = other.center[to];
			this.newCenter[to] = this.center[from];
		}
		[this.center, this.newCenter] = [this.newCenter, this.center];
		return this;
	}

	cornerMultiply(other: CubeState): this {
		for (let to = 0; to <= 7; to++) {
			const from = other.cp[to];
			this.newCp[to] = this.cp[from];
			this.newCo[to] = (this.co[from] + other.co[to]) % 3;
		}
		[this.cp, this.newCp] = [this.newCp, this.cp];
		[this.co, this.newCo] = [this.newCo, this.co];
		return this;
	}

	edgeMultiply(other: CubeState): this {
		for (let to = 0; to <= 11; to++) {
			const from = other.ep[to];
			this.newEp[to] = this.ep[from];
			this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
		}
		[this.ep, this.newEp] = [this.newEp, this.ep];
		[this.eo, this.newEo] = [this.newEo, this.eo];
		return this;
	}

	multiply(other: CubeState): this {
		this.centerMultiply(other);
		this.cornerMultiply(other);
		this.edgeMultiply(other);
		return this;
	}

	move(arg: string | Move[]): this {
		const moves = parseAlg(arg);
		for (const move of moves) {
			const face = Math.floor(move / 3);
			const power = move % 3;
			for (let x = 0; x <= power; x++) {
				this.multiply(CubeMoves[face]);
			}
		}
		return this;
	}

	upright(): string {
		let i: number, j: number;

		const clone = this.clone();
		const result: string[] = [];
		for (i = 0; i <= 5; i++) {
			if (clone.center[i] === F) {
				break;
			}
		}
		switch (i) {
			case D:
				result.push('x');
				break;
			case U:
				result.push("x'");
				break;
			case B:
				result.push('x2');
				break;
			case R:
				result.push('y');
				break;
			case L:
				result.push("y'");
		}
		if (result.length) {
			clone.move(result[0]);
		}
		for (j = 0; j <= 5; j++) {
			if (clone.center[j] === U) {
				break;
			}
		}
		switch (j) {
			case L:
				result.push('z');
				break;
			case R:
				result.push("z'");
				break;
			case D:
				result.push('z2');
		}
		return result.join(' ');
	}

	static inverse(arg: string | Move[]): string | Move[] | Move {
		const result: Move[] = [];
		if (typeof arg === 'string') {
			const moves = parseAlg(arg);
			for (const move of moves) {
				const face = Math.floor(move / 3);
				const power = move % 3;
				result.push(face * 3 + (-(power - 1) + 1));
			}
			result.reverse();
			return result
				.map((move) => {
					const face = Math.floor(move / 3);
					const power = move % 3;
					return faceNames[face] + (power === 1 ? '2' : power === 2 ? "'" : '');
				})
				.join(' ');
		} else if (arg instanceof Array) {
			for (const move of arg) {
				const face = Math.floor(move / 3);
				const power = move % 3;
				result.push(face * 3 + (-(power - 1) + 1));
			}
			result.reverse();
			return result;
		} else {
			const move = arg;
			const face = Math.floor(move / 3);
			const power = move % 3;
			return face * 3 + (-(power - 1) + 1);
		}
	}

	randomize(): this {
		const generateValidRandomPermutation = (cp: number[], ep: number[]) => {
			let numSwaps = 0;
			const seen = Array(cp.length).fill(false);
			for (let i = 0; i < cp.length; i++) {
				if (!seen[i]) {
					let cycleLength = 0;
					let j = i;
					while (!seen[j]) {
						seen[j] = true;
						j = cp[j];
						cycleLength++;
					}
					numSwaps += cycleLength + 1;
				}
			}
			seen.fill(false);
			for (let i = 0; i < ep.length; i++) {
				if (!seen[i]) {
					let cycleLength = 0;
					let j = i;
					while (!seen[j]) {
						seen[j] = true;
						j = ep[j];
						cycleLength++;
					}
					numSwaps += cycleLength + 1;
				}
			}
			if (numSwaps % 2 !== 0) {
				// Swap two elements in ep to make it even
				const a = Math.floor(Math.random() * ep.length);
				const b = Math.floor(Math.random() * ep.length);
				[ep[a], ep[b]] = [ep[b], ep[a]];
			}
		};

		const generateValidRandomOrientation = (co: number[], eo: number[]) => {
			const sumCo = co.reduce((a, b) => a + b, 0);
			const sumEo = eo.reduce((a, b) => a + b, 0);
			if (sumCo % 3 !== 0) {
				// Adjust co to make sum divisible by 3
				const index = Math.floor(Math.random() * co.length);
				co[index] = (co[index] + 1) % 3;
			}
			if (sumEo % 2 !== 0) {
				// Adjust eo to make sum even
				const index = Math.floor(Math.random() * eo.length);
				eo[index] = (eo[index] + 1) % 2;
			}
		};

		const shuffle = (array: number[]) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
		};

		shuffle(this.cp);
		shuffle(this.ep);
		generateValidRandomPermutation(this.cp, this.ep);
		for (let i = 0; i < this.co.length; i++) {
			this.co[i] = Math.floor(Math.random() * 3);
		}
		for (let i = 0; i < this.eo.length; i++) {
			this.eo[i] = Math.floor(Math.random() * 2);
		}
		generateValidRandomOrientation(this.co, this.eo);
		return this;
	}
}

type CubeState = {
	center: number[];
	cp: number[];
	co: number[];
	ep: number[];
	eo: number[];
};

type Move = number;

const CubeMoves: CubeState[] = [
	// U
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [UBR, URF, UFL, ULB, DFR, DLF, DBL, DRB],
		co: [0, 0, 0, 0, 0, 0, 0, 0],
		ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
		eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	// R
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [DFR, UFL, ULB, URF, DRB, DLF, DBL, UBR],
		co: [2, 0, 0, 1, 1, 0, 0, 2],
		ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
		eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	// F
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [UFL, DLF, ULB, UBR, URF, DFR, DBL, DRB],
		co: [1, 2, 0, 0, 2, 1, 0, 0],
		ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
		eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0]
	},
	// D
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [URF, UFL, ULB, UBR, DLF, DBL, DRB, DFR],
		co: [0, 0, 0, 0, 0, 0, 0, 0],
		ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
		eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	// L
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [URF, ULB, DBL, UBR, DFR, UFL, DLF, DRB],
		co: [0, 1, 2, 0, 0, 2, 1, 0],
		ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
		eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	},
	// B
	{
		center: [0, 1, 2, 3, 4, 5],
		cp: [URF, UFL, UBR, DRB, DFR, DLF, ULB, DBL],
		co: [0, 0, 1, 2, 0, 0, 2, 1],
		ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
		eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
	},
	// E
	{
		center: [U, F, L, D, B, R],
		cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
		co: [0, 0, 0, 0, 0, 0, 0, 0],
		ep: [UR, UF, UL, UB, DR, DF, DL, DB, FL, BL, BR, FR],
		eo: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
	},

	// M
	{
		center: [B, R, U, F, L, D],
		cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
		co: [0, 0, 0, 0, 0, 0, 0, 0],
		ep: [UR, UB, UL, DB, DR, UF, DL, DF, FR, FL, BL, BR],
		eo: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
	},

	// S
	{
		center: [L, U, F, R, D, B],
		cp: [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB],
		co: [0, 0, 0, 0, 0, 0, 0, 0],
		ep: [UL, UF, DL, UB, UR, DF, DR, DB, FR, FL, BL, BR],
		eo: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
	}
];

const faceNums: { [key: string]: number } = {
	U: 0,
	R: 1,
	F: 2,
	D: 3,
	L: 4,
	B: 5,
	E: 6,
	M: 7,
	S: 8,
	x: 9,
	y: 10,
	z: 11,
	u: 12,
	r: 13,
	f: 14,
	d: 15,
	l: 16,
	b: 17
};

const faceNames: { [key: number]: string } = {
	0: 'U',
	1: 'R',
	2: 'F',
	3: 'D',
	4: 'L',
	5: 'B',
	6: 'E',
	7: 'M',
	8: 'S',
	9: 'x',
	10: 'y',
	11: 'z',
	12: 'u',
	13: 'r',
	14: 'f',
	15: 'd',
	16: 'l',
	17: 'b'
};

const parseAlg = (arg: string | Move[] | Move): Move[] => {
	if (typeof arg === 'string') {
		return arg
			.split(/\s+/)
			.filter((part) => part.length > 0)
			.map((part) => {
				const move = faceNums[part[0]];
				if (move === undefined) {
					throw new Error(`Invalid move: ${part}`);
				}
				let power = 0;
				if (part.length > 1) {
					if (part[1] === '2') {
						power = 1;
					} else if (part[1] === "'") {
						power = 2;
					} else {
						throw new Error(`Invalid move: ${part}`);
					}
				}
				return move * 3 + power;
			});
	} else if (Array.isArray(arg)) {
		return arg;
	} else {
		return [arg];
	}
};

export const colorMap: { [key: string]: string } = {
	F: 'red',
	B: 'orange',
	L: 'blue',
	R: 'green',
	U: 'yellow',
	D: 'white'
};
