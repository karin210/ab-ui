/** Placeholder for a real API call (save, delete…); resolves after a short delay. */
export function simulateRequest(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 900));
}
