import type { Profile } from '#lib/data/modalDemos.ts';
import { emailGuidance } from '#lib/validation/auth.ts';
import { bioGuidance, nameGuidance } from '#lib/validation/profile.ts';

export type ProfileField = 'name' | 'email' | 'bio';
export type FieldMark = 'valid' | 'invalid';

const FIELD_ORDER: ProfileField[] = ['name', 'email', 'bio'];

const NOT_EDITED: Record<ProfileField, boolean> = { name: false, email: false, bio: false };

const RULES: Record<ProfileField, (value: string) => string[]> = {
	name: nameGuidance,
	email: emailGuidance,
	bio: bioGuidance
};

/** Fields, edited/blur tracking and per-field guidance for the profile editing form. */
export class ProfileForm {
	name = $state('');
	email = $state('');
	bio = $state('');

	private edited = $state<Record<ProfileField, boolean>>({ ...NOT_EDITED });
	private left = $state<Record<ProfileField, boolean>>({ ...NOT_EDITED });

	constructor(profile: Profile) {
		this.load(profile);
	}

	/** Fills the fields with a saved profile and forgets any previous edits. */
	load(profile: Profile): void {
		this.name = profile.name;
		this.email = profile.email;
		this.bio = profile.bio;
		this.edited = { ...NOT_EDITED };
		this.left = { ...NOT_EDITED };
	}

	/** Marks a field as edited so its guidance may be shown. */
	touch(field: ProfileField): void {
		this.edited[field] = true;
	}

	/** Records that the user has left the field, which allows its border mark to show. */
	leave(field: ProfileField): void {
		this.left[field] = true;
	}

	/** Border mark: only after leaving the field, and never for an empty one. */
	mark(field: ProfileField): FieldMark | null {
		if (!this.left[field] || this[field].length === 0) return null;
		return this.unmetRules(field).length === 0 ? 'valid' : 'invalid';
	}

	/** Guidance text for a field: empty until it has been edited and while it is valid. */
	guidance(field: ProfileField): string {
		return this.edited[field] ? this.unmetRules(field).join(' ') : '';
	}

	/** Marks every field as edited; returns the first invalid field, or null when the form is valid. */
	validate(): ProfileField | null {
		FIELD_ORDER.forEach((field) => this.touch(field));
		return FIELD_ORDER.find((field) => this.unmetRules(field).length > 0) ?? null;
	}

	toProfile(): Profile {
		return { name: this.name.trim(), email: this.email.trim(), bio: this.bio.trim() };
	}

	private unmetRules(field: ProfileField): string[] {
		return RULES[field](this[field]);
	}
}
