/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ExpressionType } from '../expressionType';
import { NumberTransformEvaluator } from './numberTransformEvaluator';

/**
 * Returns the largest integer less than or equal to the specified number.
 */
export class Floor extends NumberTransformEvaluator {
    public constructor() {
        super(ExpressionType.Floor, Floor.func);
    }

    private static func(args: any[]): number {
        return Math.floor(args[0]);
    }
}
