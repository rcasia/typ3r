import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Typ3rText } from '../core/model/typ3rtext';
import { StatsCounterComponent } from '../stats-counter/stats-counter.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements AfterViewInit {

  @ViewChild(StatsCounterComponent) stats: any;

  data = {
    mistakes: 0,
    words: 0,
    characters: 0,
    initialTime: 60
  }

  wordsPerMinute: number = 0

  ready: Boolean = true;
  placeholder = `The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you'll end up reviewing and negotiating the content itself and not the design. This will just slow down the design process. Design first, with real content in mind (of course!), but don't drop in the real content until the design is well on its way. Using filler text avoids the inevitable argumentation that accompanies the use of real content in the design process.`

  text = new Typ3rText(this.placeholder)
  renderedText = this.text.content;
  passedCharacters: string= '';
  wrongCharacter: string = ''

  totalTextView: any;
  typ3rTextElement: any;


  constructor() {
    this.checkCharacters()
  }

  ngAfterViewInit() {
    this.totalTextView = document.getElementById('text-view');
    this.typ3rTextElement = document.getElementById('typ3rtext')!;
    console.log(this.stats.seconds)
    this.calculateWordsPerMinute();

  }

  setReady(value: Boolean): void {
    this.ready = value;
  }

  checkCharacters(): void {
      document.addEventListener('keydown', e =>{
          if(e.key === this.text.val()) {
              this.correctInput(e.key)
          } else {
            if(e.key.length === 1){
                this.wrongInput(e.key);
            }
            
          }
      })
  }

  correctInput(key: string): void {
      if(key === ' ') this.data.words++;
      this.text.next();
      this.setCharacterRight(key);
      this.data.characters++;
      this.calculateWordsPerMinute();

  }

  wrongInput(key: string): void{
    this.data.mistakes++;
    this.wrongCharacter = key;
    setTimeout(()=> this.wrongCharacter = '', 300);
  }

  setCharacterRight(character: string): void {
   this.passedCharacters += character 

    this.renderedText = this.renderedText.slice(1)
  }

  calculateWordsPerMinute() {
    const secondsFromZero = (this.data.initialTime - this.stats.seconds) || 1;
    this.wordsPerMinute = Math.floor(this.data.words * 60 / secondsFromZero) || 0
  }
}
