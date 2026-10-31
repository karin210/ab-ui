const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = LOWER.toUpperCase();
const DIGITS = '0123456789';
const PASSWORD_LENGTH = 16;

/** Unbiased random integer in [0, max) from the platform's secure generator. */
function randomIndex(max: number): number {
	const limit = Math.floor(0x100000000 / max) * max;
	const buffer = new Uint32Array(1);
	do {
		crypto.getRandomValues(buffer);
	} while (buffer[0] >= limit);
	return buffer[0] % max;
}

function pick(characters: string): string {
	return characters[randomIndex(characters.length)];
}

/** Random password with at least one lowercase letter, one uppercase letter and one digit. */
export function generatePassword(): string {
	const all = LOWER + UPPER + DIGITS;
	const characters = [pick(LOWER), pick(UPPER), pick(DIGITS)];
	while (characters.length < PASSWORD_LENGTH) characters.push(pick(all));

	for (let i = characters.length - 1; i > 0; i--) {
		const j = randomIndex(i + 1);
		[characters[i], characters[j]] = [characters[j], characters[i]];
	}
	return characters.join('');
}
