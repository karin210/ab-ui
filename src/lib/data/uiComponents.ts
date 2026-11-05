import type { Component } from 'svelte';
import LoginFormGuided from '#lib/components/login/LoginFormGuided.svelte';
import LoginFormClassic from '#lib/components/login/LoginFormClassic.svelte';
import EditProfileGuided from '#lib/components/modals/EditProfileGuided.svelte';
import EditProfileClassic from '#lib/components/modals/EditProfileClassic.svelte';
import DeleteDocumentGuided from '#lib/components/modals/DeleteDocumentGuided.svelte';
import DeleteDocumentClassic from '#lib/components/modals/DeleteDocumentClassic.svelte';

export const DEFAULT_ROUTE = '/entrar';

/** Props every pattern may receive; patterns that simulate navigation report the new route. */
export interface PatternProps {
	onroutechange?: (route: string) => void;
}

export interface ComponentPattern {
	id: string;
	name: string;
	description: string;
	component: Component<PatternProps>;
}

export interface UiComponent {
	slug: string;
	name: string;
	description: string;
	/** Route shown in each pattern's sample URL bar until the pattern reports another one. */
	defaultRoute: string;
	patterns: ComponentPattern[];
}

export const uiComponents: UiComponent[] = [
	{
		slug: 'formularios-de-inicio-de-sesion',
		name: 'Formularios de inicio de sesión',
		description: 'Compara cómo distintos diseños guían a las personas al ingresar a su cuenta.',
		defaultRoute: DEFAULT_ROUTE,
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
	},
	{
		slug: 'modal-para-editar-datos',
		name: 'Modal para editar datos',
		description:
			'Cambia algún dato del perfil y después haz clic fuera de la ventana o pulsa Escape: compara qué pasa con tus cambios.',
		defaultRoute: '/perfil',
		patterns: [
			{
				id: 'a',
				name: 'Patrón A',
				description:
					'Solo se cierra con Cancelar o Guardar cambios: un clic fuera o la tecla Escape no descartan lo que escribiste.',
				component: EditProfileGuided
			},
			{
				id: 'b',
				name: 'Patrón B',
				description:
					'Convención habitual: se cierra con la X, con un clic fuera o con Escape, aunque haya cambios sin guardar.',
				component: EditProfileClassic
			}
		]
	},
	{
		slug: 'modal-para-eliminar-documentos',
		name: 'Modal para eliminar documentos',
		description:
			'Compara cómo distintas confirmaciones te ayudan a decidir antes de borrar un documento.',
		defaultRoute: '/documentos',
		patterns: [
			{
				id: 'a',
				name: 'Patrón A',
				description:
					'Nombra el documento y la consecuencia, y el botón dice lo que hace (Eliminar documento). Solo se cierra con sus botones.',
				component: DeleteDocumentGuided
			},
			{
				id: 'b',
				name: 'Patrón B',
				description:
					'Convención habitual: «¿Estás seguro?» con Aceptar y Cancelar. También se cierra con la X, con un clic fuera o con Escape.',
				component: DeleteDocumentClassic
			}
		]
	}
];

export function findUiComponent(slug: string): UiComponent | undefined {
	return uiComponents.find((component) => component.slug === slug);
}
