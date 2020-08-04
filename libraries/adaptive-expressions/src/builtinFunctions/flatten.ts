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
 *  Flatten an array into non-array values. You can optionally set the maximum depth to flatten to.
 */
export class Flatten extends ExpressionEvaluator {
    public constructor() {
        super(ExpressionType.Flatten, Flatten.evaluator(), ReturnType.Array, Flatten.validator);
    }

    private static evaluator(): EvaluateExpressionDelegate {
        return FunctionUtils.apply(
            (args: any[]): any[] => {
                let array = args[0];
                let depth = args.length > 1 ? args[1] : 100;
                return Flatten.evalFlatten(array, depth);
            });
    }

    private static evalFlatten(arr: any[], dept: number): any[] {
        if (!FunctionUtils.isNumber(dept) || dept < 1) {
            dept = 1;
        }

        let res = JSON.parse(JSON.stringify(arr));

        let reduceArr = (_arr): any => _arr.reduce((prevItem, curItem): any => prevItem.concat(curItem), []);

        for (let i = 0; i < dept; i++) {
            let hasArrayItem = res.some((item): boolean => Array.isArray(item));
            if (hasArrayItem) {
                res = reduceArr(res);
            } else {
                break;
            }
        }
        return res;
    }

    private static validator(expression: Expression): void {
        FunctionUtils.validateOrder(expression, [ReturnType.Number], ReturnType.Array);
    }
}
