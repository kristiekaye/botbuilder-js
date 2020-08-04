/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { ExpressionEvaluator } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { ReturnType } from '../returnType';

/**
 * Sort elements in the collection in ascending order and return the sorted collection.
 */
export class SortBy extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.SortBy, FunctionUtils.sortBy(false), ReturnType.Array, SortBy.validator);
    }

    private static validator(expression: Expression): void {
        FunctionUtils.validateOrder(expression, [ReturnType.String], ReturnType.Array);
    }
}
