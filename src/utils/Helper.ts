import { ValidationRequest, ContentValidationRequest } from './../types/ValidationRequest';
import { ValidationResponse } from './../types/ValidationResponse';

export abstract class Helper {
    public static initResponse(): ValidationResponse {
        return { checked: false, error: '', status: 500, valid: null };
    }

    public static isHttpRequestValid(request: ValidationRequest): boolean {
        if (request.url && typeof request.url === 'string') {
            return true;
        } else {
            return false;
        }
    }

    public static isContentRequestValid(request: ContentValidationRequest): boolean {
        if (request.document && typeof request.document === 'string') {
            return true;
        } else {
            return false;
        }
    }
}
