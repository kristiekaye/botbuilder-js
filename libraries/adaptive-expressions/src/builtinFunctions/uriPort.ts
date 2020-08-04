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
 * Return the port value of a unified resource identifier (URI).
 */
export class UriPort extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.UriPort, UriPort.evaluator, ReturnType.Number, FunctionUtils.validateUnary);
    }

    private static evaluator(expr: Expression, state: MemoryInterface, options: Options): ValueWithError {
        let value: any;
        let error: string;
        let args: any[];
        ({ args, error } = FunctionUtils.evaluateChildren(expr, state, options));
        if (!error) {
            if (typeof (args[0]) === 'string') {
                ({ value, error } = UriPort.evalUriPort(args[0]));
            } else {
                error = `${ expr } cannot evaluate`;
            }
        }

        return { value, error };
    }

    private static evalUriPort(uri: string): ValueWithError {
        let result: string;
        let error: string;
        let parsed: URL;
        ({ value: parsed, error } = FunctionUtils.parseUri(uri));
        if (!error) {
            try {
                result = parsed.port;
            } catch (e) {
                error = 'invalid operation, input uri should be an absolute URI';
            }
        }

        return { value: result, error };
    }
}
