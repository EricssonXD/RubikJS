export class RubiksCube {
	private _solvedCube = Array.from({ length: 6 }, (_, i) => Array(9).fill(i)) as Cube;
	private _cube: Cube = $state(this._solvedCube);

	constructor() {
		console.log('RubiksCube created');
	}

	public rotate(side: SideName, counterClockwise = false): void {
		const sideIndex = this.getSideIndex(side);
		this.move(sideIndex, counterClockwise);
	}

	get cube(): Cube {
		return this._cube;
	}

	public reset(): void {
		for (let i = 0; i < 9; i++) {
			this._cube[i] = this._solvedCube[i];
		}
	}

	public setTestCube(): void {
		this._cube[0] = [0, 1, 2, 3, 4, 5, 1, 2, 4];
	}

	private move(side: Side, counterClockwise = false): void {
		// Javascript doesnt need this
		// const sideCopy = Object.assign([], this._cube[sideIndex]);

		const rotatedSide = counterClockwise
			? this.rotateFaceCounterClockwise(side)
			: this.rotateFaceClockwise(side);

		this._cube[side] = rotatedSide;
	}

	private getSideIndex(side: SideName): Side {
		switch (side) {
			case 'front':
				return F;
			case 'back':
				return B;
			case 'left':
				return L;
			case 'right':
				return R;
			case 'top':
				return U;
			case 'bottom':
				return D;
		}
	}

	private rotateFaceClockwise(sideIndex: Side): RubiksCubeSide {
		const side = this._cube[sideIndex];
		return [side[6], side[3], side[0], side[7], side[4], side[1], side[8], side[5], side[2]];
	}

	private rotateFaceCounterClockwise(sideIndex: Side): RubiksCubeSide {
		const side = this._cube[sideIndex];
		return [side[2], side[5], side[8], side[1], side[4], side[7], side[0], side[3], side[6]];
	}

	private rotateEdge(side: Side, counterClockwise = false): void {
		// 0, [2,4,3,5]
		// 1, [4,2,5,3]
		// 2, [4,0,5,1]
		// 3, flip 2
		// 4, [0,2,1,3]
		// 5, flip 4
		const fb: EdgeRotateSequence = [L, U, R, D];
		const lr: EdgeRotateSequence = [4, 0, 5, 1];
		const tb: EdgeRotateSequence = [0, 2, 1, 3];

		const f = this._cube[F];
		const b = this._cube[B];
		const l = this._cube[L];
		const r = this._cube[R];
		const u = this._cube[U];
		const d = this._cube[D];

		switch (side) {
			case F:
				break;
			case B:
				break;
			case L:
				break;
			case R:
				break;
			case U:
				break;
			case D:
				break;
		}
	}

	private getRow(sideIndex: Side, row: number) {
		const side = this._cube[sideIndex];
		const start = row * 3;
		return [side[start], side[start + 1], side[start + 2]];
	}

	private getCol(sideIndex: Side, col: number) {
		const side = this._cube[sideIndex];
		return [side[col], side[col + 3], side[col + 6]];
	}
}

type Cube = [
	RubiksCubeSide,
	RubiksCubeSide,
	RubiksCubeSide,
	RubiksCubeSide,
	RubiksCubeSide,
	RubiksCubeSide
];
export type RubiksCubeSide = [Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot, Slot];
type Slot = 0 | 1 | 2 | 3 | 4 | 5;
type Side = Slot;

const [F, B, L, R, U, D] = [0, 1, 2, 3, 4, 5] as const;

type SideName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

type EdgeRotateSequence = readonly [Side, Side, Side, Side];

const defaultColorMap: [string, string, string, string, string, string] = [
	'red',
	'orange',
	'blue',
	'green',
	'yellow',
	'white'
];
export const colorMap: [string, string, string, string, string, string] = defaultColorMap;
