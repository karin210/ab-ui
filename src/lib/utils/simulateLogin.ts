/** Placeholder for a real authentication call; resolves after a short delay. */
export function simulateLogin(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 900));
}
