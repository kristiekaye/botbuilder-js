/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { EvaluateExpressionDelegate, ExpressionEvaluator } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { ReturnType } from '../returnType';

/**
 * Return the string version of a data uniform resource identifier (URI).
 */
export class DataUriToString extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.DataUriToString, DataUriToString.evaluator(), ReturnType.String, FunctionUtils.validateUnary);
    }

    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply((args: any[]): string => Buffer.from(args[0].slice(args[0].indexOf(',') + 1), 'base64').toString(), FunctionUtils.verifyString);
    }
}
