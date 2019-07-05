import { IAmpValidator } from './../interfaces/IAmpValidator';
import ampHtmlValidator, { ValidationResult } from 'amphtml-validator';
export class AmpValidationService implements IAmpValidator {
    private static instance: AmpValidationService;
    private constructor() {}
    public static getInstance() {
        if (!AmpValidationService.instance) {
            AmpValidationService.instance = new AmpValidationService();
        }
        return AmpValidationService.instance;
    }

    public async validate(html: string): Promise<ValidationResult> {
        try {
            const validator = await ampHtmlValidator.getInstance();
            return validator.validateString(html);
        } catch (error) {
            const errMsg: string = ''; //ErrorHandler.getErrorMessage(error);
            throw new Error(errMsg);
        }
    }
    public parseValidationError(validation: ValidationResult): string {
        let msg = '';
        for (let index = 0; index < validation.errors.length; index++) {
            const error = validation.errors[index];
            msg += `line: ${error.line}, col: ${error.col}, message: ${error.message}`;
            if (error.specUrl) {
                msg += ` (see ${error.specUrl})`;
            }
            msg += ' | ';
        }
        return msg;
    }
}
