import { Component, AfterViewInit } from '@angular/core';
import { Typ3rText } from './core/model/typ3rtext';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'typ3r';
  placeholder = `The argument in favor of using filler text goes something like this: If you use real content in the design process, anytime you reach a review point you’ll end up reviewing and negotiating the content itself and not the design. This will just slow down the design process. Design first, with real content in mind (of course!), but don’t drop in the real content until the design is well on its way. Using filler text avoids the inevitable argumentation that accompanies the use of real content in the design process.`

  text = new Typ3rText(this.placeholder)
  renderedText = this.text.content;
  passedCharacters: string= '';

  totalTextView: any;
  typ3rTextElement: any;


  constructor() {
    this.checkCharacters()
  }

  ngAfterViewInit() {
    this.totalTextView = document.getElementById('text-view');
    this.typ3rTextElement = document.getElementById('typ3rtext')!;

  }

  checkCharacters(): void {
      document.addEventListener('keydown', e =>{
          if(e.key === this.text.val()) {
              this.text.next()
              this.setCharacterRight(e.key)
          }
      })
  }

  setCharacterRight(character: string): void {
   //if(character === ' ') character = '_'; 
   this.passedCharacters += character 

    this.renderedText = this.renderedText.slice(1)
  }
}
