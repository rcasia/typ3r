import { Component, ViewChild, Input, AfterViewInit, DoCheck } from '@angular/core';
import { Typ3rText } from '../core/model/typ3rtext';
import { StatsCounterComponent } from '../stats-counter/stats-counter.component';
import texts from '../_files/texts.json';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements AfterViewInit, DoCheck {

  @ViewChild(StatsCounterComponent) stats: any;

  data = {
    mistakes: 0,
    words: 0,
    characters: 0,
    accuracy: 0,
    initialTime: 60
  }

  wordsPerMinute: number = 0;

  finished: Boolean = false;

  text = new Typ3rText(texts['texts'][1]['content']);
  renderedText = this.text.getContent();
  passedCharacters: string= '';
  wrongCharacters: string = '';

  totalTextView: any;
  typ3rTextElement: any;

  checkCharactersBound = this.checkCharacters.bind(this)

  constructor() {
    this.listenToKeystrokes();
  }

  ngDoCheck(){
    //Checks if stats component is loaded
    if(this.stats) {
      //Remove keystrokes listener if text finished or timeout
      if( this.text.isFinished() || this.stats.seconds === 0 ) {
          this.setFinished(true);
          document.removeEventListener('keydown', this.checkCharactersBound)
      }
    }
  }

  ngAfterViewInit() {
    this.totalTextView = document.getElementById('text-view');
    this.typ3rTextElement = document.getElementById('typ3rtext')!;
    this.calculateWordsPerMinute();
  }

  setFinished(value: Boolean): void {
    this.finished = value;
  }

  listenToKeystrokes(){
      document.addEventListener('keydown',  this.checkCharactersBound)
  }

  checkCharacters({key}: any): void {
          if(this.wrongCharacters && key.length === 1) this.wrongInput(key);
          else if(key === this.text.val()) this.correctInput(key);
          else if(key === 'Backspace') this.deleteLastCharacter();
          else if(key.length === 1) this.wrongInput(key);
          this.calculateAccuracy();
  }

  correctInput(key: string): void {
      if(key === ' ') this.data.words++;
      this.text.next();
      this.setCharacterRight(key);
      this.data.characters++;
      this.calculateWordsPerMinute();
  }

  wrongInput(key: string): void{
    if(key === ' '){
        this.passedCharacters += '×' + this.wrongCharacters + '× ';
        this.renderedText = this.text.getContentFromCurrentWord();
        this.wrongCharacters = '';

    } else if ( this.data.characters ) {
        this.data.mistakes++;
        this.wrongCharacters += key;
    }
  }

  setCharacterRight(character: string): void {
    this.passedCharacters += character;
    this.renderedText = this.renderedText.slice(1);
  }

  setCharacterWrong(character: string): void {
    this.renderedText = this.renderedText.slice(1);
  }

  deleteLastCharacter(): void {
    this.wrongCharacters = this.wrongCharacters.slice(0, -1);
    this.data.mistakes--;
  }

  calculateWordsPerMinute(): void {
    const secondsFromZero = (this.data.initialTime - this.stats.seconds) || 1;
    this.wordsPerMinute = Math.floor(this.data.words * 60 / secondsFromZero) || 0;
  }

  calculateAccuracy(): void {
    const characters = this.data.characters;
    const totalInputs = characters + this.data.mistakes;
    const percentage = Math.round(( characters / totalInputs) * 100) || 0;

    this.data.accuracy = percentage;
   }
}
