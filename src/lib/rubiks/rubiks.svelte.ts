export class RubiksCube {
	private _cube: Cube = $state(this.solvedCube);

	constructor() {
		console.log('RubiksCube created');
	}

	public rotate(side: SideName, counterClockwise = false): void {
		const sideIndex = this.getSideIndex(side);
		// Javascript doesnt need this
		// const sideCopy = Object.assign([], this._cube[sideIndex]);

		const rotatedSide = counterClockwise
			? this.rotateFaceCounterClockwise(sideIndex)
			: this.rotateFaceClockwise(sideIndex);

		this._cube[sideIndex] = rotatedSide;
	}

	private getSideIndex(side: SideName): Side {
		switch (side) {
			case 'front':
				return 0;
			case 'back':
				return 1;
			case 'left':
				return 2;
			case 'right':
				return 3;
			case 'top':
				return 4;
			case 'bottom':
				return 5;
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

	private rotateEdge(side: Side) {
		// 0, [2,4,3,5]
		// 1, [4,2,5,3]
		// 2, [4,0,5,1]
		// 3, flip 2
		// 4, [0,2,1,3]
		// 5, flip 4
		// const c1 = (ReadonlyArray<number> = []);
	}

	get cube(): Cube {
		return this._cube;
	}

	public reset(): void {
		for (let i = 0; i < 9; i++) {
			this._cube[i] = this.solvedCube[i];
		}
	}

	get solvedCube(): Cube {
		return Array.from({ length: 6 }, (_, i) => Array(9).fill(i)) as Cube;
	}

	public setTestCube(): void {
		this._cube[0] = [0, 1, 2, 3, 4, 5, 1, 2, 4];
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
type SideName = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom';

const defaultColorMap = ['red', 'orange', 'blue', 'green', 'yellow', 'white'];
export const colorMap = defaultColorMap;
