/**
 * Common page config object type.
 */
export interface Type {
    /**
     * Delay for a wait condition.
     */
    readonly elementWaitTimeout: number;
    /**
     * Delay for element location. This would be useful to slow down the test pace
     * to inspect elements visually.
     */
    readonly elementLocatedDelay: number;
    /**
     * Enable locator logging every time an element is interacted with.
     */
    readonly loggingEnabled: boolean;
    /**
     * The number of times to retry if an error is encountered.
     */
    readonly retryCount: number;
}
