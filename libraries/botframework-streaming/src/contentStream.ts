/**
 * @module botframework-streaming
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { SubscribableStream } from './subscribableStream';
import { PayloadAssembler } from './assemblers';
import { INodeBuffer } from './interfaces/INodeBuffer';

export class ContentStream {
    public id: string;
    private readonly assembler: PayloadAssembler;
    private stream: SubscribableStream;

    public constructor(id: string, assembler: PayloadAssembler) {
        if (!assembler) {
            throw Error('Null Argument Exception');
        }
        this.id = id;
        this.assembler = assembler;
    }

    public get contentType(): string {
        return this.assembler.payloadType;
    }

    public get length(): number {
        return this.assembler.contentLength;
    }

    public getStream(): SubscribableStream {
        if (!this.stream) {
            this.stream = this.assembler.getPayloadStream();
        }

        return this.stream;
    }

    public cancel(): void {
        this.assembler.close();
    }

    public async readAsString(): Promise<string> {
        const { bufferArray } = await this.readAll();
        return (bufferArray || []).map(result => result.toString('utf8')).join('');
    }

    public async readAsJson<T>(): Promise<T> {
        const stringToParse = await this.readAsString();
        try {
            return <T>JSON.parse(stringToParse);
        } catch (error) {
            throw error;
        }
    }

    private async readAll(): Promise<Record<string, any>> {
    // do a read-all
        const allData: INodeBuffer[] = [];
        let count = 0;
        const stream = this.getStream();

        // populate the array with any existing buffers
        while (count < stream.length) {
            const chunk = stream.read(stream.length);
            allData.push(chunk);
            count += (chunk as INodeBuffer).length;
        }

        if (count < this.length) {
            const readToEnd = new Promise<boolean>((resolve): void => {
                const callback = (cs: ContentStream) => (chunk: any): void => {
                    allData.push(chunk);
                    count += (chunk as INodeBuffer).length;
                    if (count === cs.length) {
                        resolve(true);
                    }
                };

                stream.subscribe(callback(this));
            });

            await readToEnd;
        }

        return {bufferArray: allData, size: count};
    }

}
