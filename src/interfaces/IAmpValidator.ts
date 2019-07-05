import { ValidationResult } from 'amphtml-validator';

export interface IAmpValidator {
    validate(html: string): Promise<ValidationResult>;
    parseValidationError(validation: ValidationResult): string;
}
