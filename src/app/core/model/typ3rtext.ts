export class Typ3rText {
    listOfWords: string[];
    wordCursor: number = 0;
    cursor: number = 0;

    constructor(content: string = 'typ3 me'){
            this.listOfWords = this.setContent(content);
        }

    next(): void { 
        if(this.cursor < this.getCurrentWord().length - 1) {
            this.cursor++
        } else {
            this.wordCursor++;
            this.cursor = 0;
            } 
    };

    back(): void { if(this.cursor > 0) this.cursor-- };
    val(index: number = this.cursor ): string { return this.getCurrentWord()[index] };

    getCurrentWord(): string { return this.listOfWords[this.wordCursor] };
    
    skipCurrentWord(): void { 
        this.wordCursor++
        this.cursor = 0;
    }

    setContent(content:string): string[] {
        var listOfWords = content.split(' ');

        listOfWords = listOfWords.map(( word:string, index:number) => {
            if(index == listOfWords.length - 1) return word;
            return word + ' ';
        });

        return listOfWords; 
    };

    getContent(): string { return this.listOfWords.join('') }
    
    getContentFromCurrentWord(): string { 
        this.skipCurrentWord();
        return this.listOfWords.slice(this.wordCursor).join('') 
    }

    isFinished(): boolean { return Boolean( !this.getCurrentWord() ) };
}

