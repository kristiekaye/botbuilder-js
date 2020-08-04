/**
 * @module adaptive-expressions
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import moment from 'moment';

import { ExpressionType } from '../expressionType';
import { TimeTransformEvaluator } from './timeTransformEvaluator';

/**
 * Add a number of minutes to a timestamp.
 */
export class AddMinutes extends TimeTransformEvaluator {
    public constructor() {
        super(ExpressionType.AddMinutes, (ts: Date, num: any): Date => moment(ts).utc().add(num, 'minutes').toDate());
    }
}
