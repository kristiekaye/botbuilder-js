/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { EvaluateExpressionDelegate, ExpressionEvaluator } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { ReturnType } from '../returnType';

/**
 * Check whether a string ends with a specific substring. Return true if the substring is found, or return false if not found.
 * This function is case-insensitive.
 */
export class EndsWith extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.EndsWith, EndsWith.evaluator(), ReturnType.Boolean, EndsWith.validator);
    }

    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply((args: any[]): boolean => FunctionUtils.parseStringOrUndefined(args[0]).endsWith(FunctionUtils.parseStringOrUndefined(args[1])), FunctionUtils.verifyStringOrNull);
    }

    private static validator(expression: Expression): void {
        FunctionUtils.validateArityAndAnyType(expression, 2, 2, ReturnType.String);
    }
}
