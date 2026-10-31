import {
	emailGuidance,
	emailParts,
	signInPasswordGuidance,
	signUpPasswordGuidance,
	type EmailPart
} from '#lib/validation/auth.ts';

export type AuthField = 'email' | 'password';
export type FieldMark = 'valid' | 'invalid';

export interface AuthValues {
	email: string;
	password: string;
}

const FIELD_ORDER: AuthField[] = ['email', 'password'];

/** Fields, edited/blur tracking and per-field guidance shared by the sign-in and sign-up forms. */
export abstract class AuthForm {
	email = $state('');
	password = $state('');

	private edited = $state<Record<AuthField, boolean>>({ email: false, password: false });
	private left = $state<Record<AuthField, boolean>>({ email: false, password: false });

	protected abstract passwordRules(value: string): string[];

	get emailParts(): EmailPart[] {
		return emailParts(this.email);
	}

	get firstInvalidField(): AuthField | null {
		return FIELD_ORDER.find((field) => this.unmetRules(field).length > 0) ?? null;
	}

	/** Marks a field as edited so its guidance may be shown. */
	touch(field: AuthField): void {
		this.edited[field] = true;
	}

	/** Records that the user has left the field, which allows its border mark to show. */
	leave(field: AuthField): void {
		this.left[field] = true;
	}

	isEdited(field: AuthField): boolean {
		return this.edited[field];
	}

	/** True once a field has been edited and its value meets every rule. */
	isValid(field: AuthField): boolean {
		return this.edited[field] && this.unmetRules(field).length === 0;
	}

	/** Border mark: only after leaving the field, and never for an empty one. */
	mark(field: AuthField): FieldMark | null {
		if (!this.left[field] || this.valueOf(field).length === 0) return null;
		return this.unmetRules(field).length === 0 ? 'valid' : 'invalid';
	}

	/** Guidance text for a field: empty until it has been edited and while it is valid. */
	guidance(field: AuthField): string {
		return this.edited[field] ? this.unmetRules(field).join(' ') : '';
	}

	/** Sets the password programmatically (e.g. a suggestion) and validates it immediately. */
	fillPassword(value: string): void {
		this.password = value;
		this.touch('password');
	}

	/** Marks every field as edited; returns the first invalid field, or null when the form is valid. */
	validate(): AuthField | null {
		FIELD_ORDER.forEach((field) => this.touch(field));
		return this.firstInvalidField;
	}

	toValues(): AuthValues {
		return { email: this.email.trim(), password: this.password };
	}

	private valueOf(field: AuthField): string {
		return field === 'email' ? this.email : this.password;
	}

	private unmetRules(field: AuthField): string[] {
		return field === 'email' ? emailGuidance(this.email) : this.passwordRules(this.password);
	}
}

export class SignInForm extends AuthForm {
	protected passwordRules(value: string): string[] {
		return signInPasswordGuidance(value);
	}
}

export class SignUpForm extends AuthForm {
	protected passwordRules(value: string): string[] {
		return signUpPasswordGuidance(value);
	}
}
