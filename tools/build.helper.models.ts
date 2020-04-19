/**
 * TypeScript definition for the CLI options. 
 */
export interface CliOptions {
    /**
     * Directory with the generated services
     */
    dir: string;
    /**
     * Name of the API for which the client was generated for
     */
    apiName: string;
    /**
     * Name of the generated library (npm package name)
     */
    packageName: string;
    /**
     * Version of the generated library (npm package version)
     */
    packageVersion: string;
}