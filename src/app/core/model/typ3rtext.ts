export class Typ3rText {
    content: string;
    cursor: number = 0;

    constructor(content: string = 'type me'){
            this.content = this.setContent(content);
        }

    next(): void { if(this.cursor < this.content.length) this.cursor++ };
    back(): void { if(this.cursor > 0) this.cursor-- };
    val(): string { return this.content[this.cursor] };

    setContent(content:string): string { return content };

    isFinished(): boolean { return this.cursor >= this.content.length - 1 };
}
