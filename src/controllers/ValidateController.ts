import { HttpClientService } from './../services/HttpClientService';
import { ValidationResponse, BulkValidationResponse } from './../types/ValidationResponse';
import { ValidationRequest } from './../types/ValidationRequest';
import { ValidationResult } from 'amphtml-validator';
import { AmpValidationService } from './../services/AmpValidationService';
import { JsonController, Post, Body, BadRequestError, Res } from 'routing-controllers';
import { AxiosResponse } from 'axios';
import { IHttpClient } from '../interfaces/IHttpClient';
import { Helper } from '../utils/Helper';

@JsonController('/validate')
export class ValidateController {
    @Post('/')
    public async validate(@Body() validationRequest: ValidationRequest): Promise<ValidationResponse> {
        if (!Helper.isHttpRequestValid(validationRequest)) {
            throw new BadRequestError('string url property is missing');
        }
        let response: ValidationResponse = Helper.initResponse();
        try {
            const http: IHttpClient = HttpClientService.getInstance();
            const page: AxiosResponse = await http.getHtml(validationRequest.url);
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

    @Post('/bulk')
    public async bulkValidate(@Body() request: ValidationRequest[]): Promise<BulkValidationResponse[]> {
        if (request.length > Number(process.env.BULK_SIZE)) {
            throw new BadRequestError(`Number of sites in request is limited to ${process.env.BULK_SIZE}`);
        }
        let result: BulkValidationResponse[] = [];
        for (const site of request) {
            const validationResponse: ValidationResponse = await this.validate(site);
            let singleValidationResponse: BulkValidationResponse = {
                [site.url]: validationResponse,
            };
            result.push(singleValidationResponse);
        }
        return result;
    }

    // TODO: Create a validator for HTML text.
}
