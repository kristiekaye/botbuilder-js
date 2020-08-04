/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Expression } from '../expression';
import { ExpressionEvaluator, ValueWithError } from '../expressionEvaluator';
import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { MemoryInterface } from '../memory/memoryInterface';
import { Options } from '../options';
import { ReturnType } from '../returnType';

/**
 * Return the ticks property value of a specified timestamp. A tick is 100-nanosecond interval.
 */
export class Ticks extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.Ticks, Ticks.evaluator, ReturnType.Number, Ticks.validator);
    }

    private static evaluator(expr: Expression, state: MemoryInterface, options: Options): ValueWithError {
        let value: any;
        let error: string;
        let args: any[];
        ({ args, error } = FunctionUtils.evaluateChildren(expr, state, options));
        if (!error) {
            if (typeof (args[0]) === 'string') {
                ({ value, error } = FunctionUtils.ticks(args[0]));
            } else {
                error = `${ expr } cannot evaluate`;
            }
        }

        return { value, error };
    }

    private static validator(expression: Expression): void {
        FunctionUtils.validateArityAndAnyType(expression, 1, 1, ReturnType.String);
    }
}
