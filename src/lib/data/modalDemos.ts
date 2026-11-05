/** Sample data for the modal showcases; every change to it is simulated and kept in memory only. */

export interface Profile {
	name: string;
	email: string;
	bio: string;
}

export interface DemoDocument {
	id: string;
	name: string;
	kind: string;
	updated: string;
}

export const SAMPLE_PROFILE: Profile = {
	name: 'Lucía Gómez',
	email: 'lucia@correo.com',
	bio: 'Diseñadora de producto. Me interesan las interfaces accesibles y los formularios claros.'
};

export const SAMPLE_DOCUMENTS: DemoDocument[] = [
	{ id: 'informe', name: 'Informe trimestral', kind: 'Documento', updated: 'Editado hace 2 días' },
	{ id: 'presupuesto', name: 'Presupuesto 2027', kind: 'Hoja de cálculo', updated: 'Editado ayer' },
	{ id: 'acta', name: 'Acta de la reunión de equipo', kind: 'Documento', updated: 'Editado hace 1 semana' }
];
