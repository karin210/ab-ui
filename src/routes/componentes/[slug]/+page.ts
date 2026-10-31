import { error } from '@sveltejs/kit';
import { findUiComponent } from '#lib/data/uiComponents.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const uiComponent = findUiComponent(params.slug);
	if (!uiComponent) error(404, 'Este componente no existe.');
	return { uiComponent };
};
