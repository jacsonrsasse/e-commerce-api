/**
 * Class to handle every error and problem
 */
export class Exception {
    constructor(public readonly message: string, public readonly statusCode: number = 400) {}
}
