let lastPrNumber: number | null;
let lastCommenter: string | null;

/**
 * Gets the last PR number that was being processed, stored locally to reference in the follow-up event
 */
export function getLastPrNumber() {
	return lastPrNumber;
}

/**
 * Sets the last PR number that was being processed, stored locally to reference in the follow-up event
 */
export function setLastPrNumber(prNumber: number | null) {
	lastPrNumber = prNumber;
}

/**
 * Gets the last commenter name, stored locally to reference in the follow-up event
 */
export function getLastCommenter() {
	return lastCommenter;
}

/**
 * Sets the last commenter name, stored locally to reference in the follow-up event
 */
export function setLastCommenter(commenter: string | null) {
	lastCommenter = commenter;
}
