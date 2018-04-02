/**
 * Common page config object type.
 */
export interface Type {
    /**
     * Delay for element location. This would be useful to slow down the test pace
     * to inspect elements visually.
     */
    elementLocatedDelay: number;
    /**
     * The number of times to retry if an error is encountered.
     */
    retryCount: number;
}
