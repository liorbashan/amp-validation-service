import { ValidationResponse } from './../types/ValidationResponse';
import { ValidationRequest } from './../types/ValidationRequest';
import { ValidationResult } from 'amphtml-validator';
import { AmpValidationService } from './../services/AmpValidationService';
import { JsonController, Post, Body, BadRequestError } from 'routing-controllers';
import axios, { AxiosResponse, AxiosError } from 'axios';

@JsonController('/validate')
export class ValidateController {
    @Post('/')
    public async validate(@Body() validationRequest: ValidationRequest): Promise<ValidationResponse> {
        let response: ValidationResponse = this.initResponse();
        try {
            const page: AxiosResponse = await this.getHtml(validationRequest.url);
            if (page.status === 200 || page.status === 204) {
                const validator: AmpValidationService = AmpValidationService.getInstance();
                const validationResult: ValidationResult = await validator.validate(page.data);
                if (validationResult.status === 'PASS') {
                    response.checked = true;
                    response.status = page.status;
                    response.valid = true;
                } else {
                    response.checked = true;
                    response.status = page.status;
                    response.valid = false;
                    response.error = validator.parseValidationError(validationResult);
                }
            } else {
                response.status = page.status;
                response.error = page.statusText;
            }
        } catch (error) {
            console.log(error.message);
            response.error = error.message;
        }

        return response;
    }

    private initResponse(): ValidationResponse {
        return { checked: false, error: '', status: 500, valid: null };
    }

    // TODO: This should be a singleton serive
    private async getHtml(url: string): Promise<AxiosResponse> {
        try {
            const axiosResponse: AxiosResponse = await axios.get(url);
            return axiosResponse;
        } catch (error) {
            console.log(error.message);
            return error.response;
        }
    }
}
