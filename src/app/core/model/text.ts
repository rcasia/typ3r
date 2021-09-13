export class Typ3rText {
    content: string = 'type me'
    cursor: number = 0


    next() { if(this.cursor < this.content.length) this.cursor++ };
    back() { if(this.cursor > 0) this.cursor-- };
    val() { return this.content[this.cursor] };
}
