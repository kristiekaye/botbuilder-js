/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ExpressionType } from '../expressionType';
import { FunctionUtils } from '../functionUtils';
import { StringTransformEvaluator } from './stringTransformEvaluator';

/**
 * Converts the specified string to title case.
 */
export class TitleCase extends StringTransformEvaluator {
    public constructor() {
        super(ExpressionType.TitleCase, TitleCase.evaluator);
    }

    private static evaluator(args: any[]): string {
        const inputStr = String(FunctionUtils.parseStringOrUndefined(args[0])).toLowerCase();
        if (inputStr === '') {
            return inputStr;
        } else {
            return inputStr.replace(/\w\S*/g, (txt): string => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
    }
}
