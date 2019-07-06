export type ValidationResponse = {
    status: number;
    checked: boolean;
    valid: null | boolean;
    error: string;
};

export type BulkValidationResponse = {
    [key: string]: ValidationResponse;
};
