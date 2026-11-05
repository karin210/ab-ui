export const MAX_NAME_LENGTH = 60;
export const MAX_BIO_LENGTH = 160;

/** Returns only the name requirements that the current value does not meet yet. */
export function nameGuidance(value: string): string[] {
	const name = value.trim();
	if (!name) return ['Escribe tu nombre.'];
	if (name.length > MAX_NAME_LENGTH) return [`Acorta tu nombre a ${MAX_NAME_LENGTH} caracteres.`];
	return [];
}

/** The biography is optional; it only has a length limit. */
export function bioGuidance(value: string): string[] {
	return value.trim().length > MAX_BIO_LENGTH
		? [`Acorta la biografía a ${MAX_BIO_LENGTH} caracteres.`]
		: [];
}
