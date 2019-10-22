import { IAmpValidator } from './../interfaces/IAmpValidator';
import ampHtmlValidator, { ValidationResult } from 'amphtml-validator';
import * as minifier from 'html-minifier';

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
            const minifiedHtml = minifier.minify(html, {
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
            });
            return validator.validateString(minifiedHtml);
        } catch (error) {
            const errMsg: string = error.message || '';
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
