import { BotContext } from 'botbuilder';
import { BotStateManager } from './botStateManager';

export function begin(context: BotContext, state: BotStateManager): Promise<any> {
    // Delete any existing topic
    state.conversation.get(context).topic = undefined;

    // Render alarms to user.
    // - No reply is expected so we don't set a new topic.
    return renderAlarms(context, state);
}

export function renderAlarms(context: BotContext, state: BotStateManager): Promise<number> {
    const list = state.user.get(context).alarms || [];
    if (list.length > 0) {
        let msg = `**Current Alarms**\n\n`;
        let connector = '';
        list.forEach((alarm) => {
            msg += connector + `- ${alarm.title} (${alarm.time})`;
            connector = '\n';
        });
        return context.sendActivity(msg).then(() => list.length);
    }
    return context.sendActivity(`No alarms found.`).then(() => 0);
}
