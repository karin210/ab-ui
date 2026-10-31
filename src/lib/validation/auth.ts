const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 128;

export type EmailPartKind = 'local' | 'at' | 'domain' | 'dot' | 'tld';

export interface EmailPart {
	kind: EmailPartKind;
	/** The chunk of the example value this part stands for (`nombre`, `@`, ...). */
	example: string;
	met: boolean;
}

const EMAIL_EXAMPLE: Record<EmailPartKind, string> = {
	local: 'nombre',
	at: '@',
	domain: 'dominio',
	dot: '.',
	tld: 'com'
};

/** Splits an email into the chunks it is made of, in writing order, flagging which ones are met. */
export function emailParts(value: string): EmailPart[] {
	const email = value.trim();
	const atIndex = email.indexOf('@');
	const local = atIndex === -1 ? email : email.slice(0, atIndex);
	const host = atIndex === -1 ? '' : email.slice(atIndex + 1);
	const dotIndex = host.lastIndexOf('.');
	const domain = dotIndex === -1 ? host : host.slice(0, dotIndex);
	const tld = dotIndex === -1 ? '' : host.slice(dotIndex + 1);

	const met: Record<EmailPartKind, boolean> = {
		local: /^[^\s@]+$/.test(local),
		at: atIndex !== -1,
		domain: /^[^\s@.]+(\.[^\s@.]+)*$/.test(domain),
		dot: dotIndex !== -1,
		tld: /^[^\s@.]+$/.test(tld)
	};

	return (Object.keys(EMAIL_EXAMPLE) as EmailPartKind[]).map((kind) => ({
		kind,
		example: EMAIL_EXAMPLE[kind],
		met: met[kind]
	}));
}

/** An email is valid exactly when every one of its parts is met. */
export function isEmailValid(value: string): boolean {
	return emailParts(value).every((part) => part.met);
}

/** Returns only the email requirements that the current value does not meet yet. */
export function emailGuidance(value: string): string[] {
	if (!value.trim()) return ['Escribe tu correo electrónico.'];

	const unmet = new Set(
		emailParts(value)
			.filter((part) => !part.met)
			.map((part) => part.kind)
	);
	const guidance: string[] = [];

	if (unmet.has('local')) guidance.push('Agrega tu nombre antes de la @.');
	if (unmet.has('at')) guidance.push('Agrega la @.');
	if (unmet.has('domain') || unmet.has('dot') || unmet.has('tld')) {
		guidance.push('Agrega el dominio, por ejemplo @correo.com.');
	}

	return guidance;
}

/** Sign-in only checks that the password is filled in: older accounts may predate the strength rule. */
export function signInPasswordGuidance(value: string): string[] {
	return value ? [] : ['Escribe tu contraseña.'];
}

/**
 * Sign-up rule: asks only for what every browser/password-manager suggestion satisfies
 * (length, lowercase, uppercase, digit); any other non-space character is allowed, never required.
 */
export const SIGN_UP_PASSWORD_PATTERN = new RegExp(
	`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)\\S{${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}}$`
);

/** Safari's `passwordrules` attribute mirroring the sign-up rule. */
export const SIGN_UP_PASSWORD_RULES_ATTRIBUTE =
	'minlength: 8; required: lower; required: upper; required: digit';

export function isSignUpPasswordValid(value: string): boolean {
	return SIGN_UP_PASSWORD_PATTERN.test(value);
}

/** Returns only the sign-up password requirements that the current value does not meet yet. */
export function signUpPasswordGuidance(value: string): string[] {
	if (!value) return ['Escribe una contraseña.'];

	const guidance: string[] = [];
	if (/\s/.test(value)) guidance.push('Quita los espacios.');
	if (value.length < MIN_PASSWORD_LENGTH) {
		guidance.push(`Usa al menos ${MIN_PASSWORD_LENGTH} caracteres.`);
	}
	if (value.length > MAX_PASSWORD_LENGTH) {
		guidance.push(`Usa como máximo ${MAX_PASSWORD_LENGTH} caracteres.`);
	}
	if (!/[a-z]/.test(value)) guidance.push('Agrega una letra minúscula.');
	if (!/[A-Z]/.test(value)) guidance.push('Agrega una letra mayúscula.');
	if (!/\d/.test(value)) guidance.push('Agrega un número.');

	return guidance;
}
