import { Component, ViewChild, Input, AfterViewInit } from '@angular/core';
import { Typ3rText } from '../core/model/typ3rtext';
import { StatsCounterComponent } from '../stats-counter/stats-counter.component';
import texts from '../_files/texts.json';

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
    accuracy: 0,
    initialTime: 60
  }

  wordsPerMinute: number = 0;

  finished: Boolean = false;

  text = new Typ3rText(texts['texts'][1]['content']);
  renderedText = this.text.content;
  passedCharacters: string= '';
  wrongCharacter: string = '';

  totalTextView: any;
  typ3rTextElement: any;


  constructor() {
    this.checkCharacters();
  }

  ngAfterViewInit() {
    this.totalTextView = document.getElementById('text-view');
    this.typ3rTextElement = document.getElementById('typ3rtext')!;
    this.calculateWordsPerMinute();
  }

  setFinished(value: Boolean): void {
    this.finished = value;
  }

  checkCharacters(): void {
      document.addEventListener('keydown', e =>{
          if(e.key === this.text.val()) this.correctInput(e.key);
          else if(e.key.length === 1) this.wrongInput(e.key);
          this.calculateAccuracy();
          if( this.text.isFinished() || this.stats.seconds === 0 ) this.setFinished(true);
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
    if( this.data.characters ) this.data.mistakes++;
    this.wrongCharacter = key;
    setTimeout(()=> this.wrongCharacter = '', 300);
  }

  setCharacterRight(character: string): void {
   this.passedCharacters += character;

    this.renderedText = this.renderedText.slice(1);
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
