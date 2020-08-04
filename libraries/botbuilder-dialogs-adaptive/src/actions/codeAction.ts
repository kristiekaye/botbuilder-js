/**
 * @module botbuilder-dialogs-adaptive
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { StringUtils } from 'botbuilder-core';
import { DialogTurnResult, DialogContext, Dialog } from 'botbuilder-dialogs';
import { BoolExpression } from 'adaptive-expressions';

export type CodeActionHandler = (dc: DialogContext, options?: object) => Promise<DialogTurnResult>;

export class CodeAction<O extends object = {}> extends Dialog<O> {
    private codeHandler: CodeActionHandler;

    public disabled?: BoolExpression;

    public constructor(codeHandler: CodeActionHandler) {
        super();
        this.codeHandler = codeHandler;
    }

    protected onComputeId(): string {
        return `CodeAction[${ StringUtils.ellipsis(this.codeHandler.toString(), 50) }]`;
    }

    public async beginDialog(dc: DialogContext, options: O): Promise<DialogTurnResult> {
        if (this.disabled && this.disabled.getValue(dc.state)) {
            return await dc.endDialog();
        }
        return await this.codeHandler(dc, options);
    }
}
