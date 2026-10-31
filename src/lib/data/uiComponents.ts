import type { Component } from 'svelte';
import LoginFormGuided from '#lib/components/login/LoginFormGuided.svelte';
import LoginFormClassic from '#lib/components/login/LoginFormClassic.svelte';

export interface ComponentPattern {
	id: string;
	name: string;
	description: string;
	component: Component;
}

export interface UiComponent {
	slug: string;
	name: string;
	description: string;
	patterns: ComponentPattern[];
}

export const uiComponents: UiComponent[] = [
	{
		slug: 'formularios-de-inicio-de-sesion',
		name: 'Formularios de inicio de sesión',
		description: 'Compara cómo distintos diseños guían a las personas al ingresar a su cuenta.',
		patterns: [
			{
				id: 'a',
				name: 'Patrón A',
				description:
					'Registro e inicio de sesión en pestañas; valida mientras escribes, muestra solo lo que falta y nunca desactiva el botón.',
				component: LoginFormGuided
			},
			{
				id: 'b',
				name: 'Patrón B',
				description:
					'Convención habitual: botón desactivado hasta completar los campos, mostrar contraseña y recordarme.',
				component: LoginFormClassic
			}
		]
	}
];

export function findUiComponent(slug: string): UiComponent | undefined {
	return uiComponents.find((component) => component.slug === slug);
}
