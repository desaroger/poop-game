import * as whatsappChatParser from 'whatsapp-chat-parser';

export const AVERAGE_POOP_WEIGHT_KILOS = 0.35;

export type Message = whatsappChatParser.Message;

export async function fileToString(file: File): Promise<string> {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('loadend', e => {
            const messagesText = e.target?.result;
            if (!messagesText || typeof messagesText !== 'string') {
                throw new Error(`Expected string but got ${typeof messagesText}`);
            }
            
            resolve(messagesText);
        });

        if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
            reader.readAsArrayBuffer(file);
        } else if (file.type === 'text/plain') {
            reader.readAsText(file);
        } else {
            alert(`File type '${file.type}' not supported`);
        }
    });
}

export function stringToMessagesArray(text: string): Message[] {
    const messages = whatsappChatParser.parseString(text);

    return messages;
}

export function analyzeMessages(rawMessages: Message[]) {
    const messages = rawMessages.filter(m => {
        return !!m.author && m.message === '💩';
    });

    const byAuthor = messages.reduce((result, message) => {
        let item = result.find(r => r.author === message.author);
        if (!item) {
            item = {author: message.author!, messages: []};
            result.push(item);
        }

        item.messages.push(message);

        return result;
    }, [] as {author: string, messages: Message[]}[]);
    byAuthor.sort((a, b) => b.messages.length - a.messages.length);

    const startDate = messages[0].date;
    const endDate = messages[messages.length - 1].date;
    const totalCount = messages.length;
    const totalKilos = (totalCount * AVERAGE_POOP_WEIGHT_KILOS).toFixed(0);

    const elapsedSeconds = (endDate.getTime() - startDate.getTime()) / 1000;
    const elapsedDays = elapsedSeconds / (24 * 3600);
    const countPerDay = (totalCount / elapsedDays).toFixed(2);

    return {
        messages,
        byAuthor,
        totalCount,
        countPerDay,
        totalKilos,
        startDate,
        endDate,
    }
}
