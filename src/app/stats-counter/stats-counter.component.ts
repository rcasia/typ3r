import { Component, Input, OnInit , AfterViewInit} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stats-counter',
  templateUrl: './stats-counter.component.html',
  styleUrls: ['./stats-counter.component.css']
})
export class StatsCounterComponent implements OnInit, AfterViewInit {
  @Input() data: any;

  time: string = '';
  seconds: number = 60;

  constructor() {
    this.setRemainingTime(this.seconds)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
      this.waitOnFirstCharacter()
  }

  waitOnFirstCharacter(): void {
      const x = new Observable(subscriber =>{
        if(this.data.characters>=1) subscriber.complete()
      })

      const i = setInterval(()=>{
                  x.subscribe({
                      complete: () => {
                            this.startTimer()
                            clearInterval(i)
                      }
                    })
                    
                }, 300)
  }

  startTimer(): void{
      setInterval(() => {
          if(this.seconds <= 0) return
          this.seconds--
          this.setRemainingTime(this.seconds)

      }, 1000)
  }

  setRemainingTime(seconds: number): void {
      var min = Math.floor(seconds / 60).toString();
      var sec = (seconds % 60).toString();
    
      if(min.length < 2) min = '0' + min;
      if(sec.length < 2) sec = '0' + sec;

      this.time = min + ':' + sec;
  }

}
