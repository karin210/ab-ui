<!-- Decorative spinner for busy buttons; the button label carries the accessible state ("Guardando…"). -->
<span class="spinner" aria-hidden="true"></span>

<style>
	.spinner {
		inline-size: 1em;
		block-size: 1em;
		border: 2px solid currentColor;
		border-inline-end-color: transparent;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.spinner {
			animation-duration: 3s;
		}
	}
</style>
