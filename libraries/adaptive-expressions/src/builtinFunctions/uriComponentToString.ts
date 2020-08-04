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
 * Return the string version of a uniform resource identifier (URI) encoded string, effectively decoding the URI-encoded string.
 */
export class UriComponentToString extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.UriComponentToString, UriComponentToString.evaluator(), ReturnType.String, FunctionUtils.validateUnary);
    }

    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply((args: any[]): string => decodeURIComponent(args[0]), FunctionUtils.verifyString);
    }
}
