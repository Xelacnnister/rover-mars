import { Component, OnInit } from '@angular/core';
import { CheckerService } from '../services/checker.service';
import { Square } from '../interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  width= 100;
  square: Square = {width:100, height:100};
  height= 100;

constructor(
private helpers: CheckerService
) {}

ngOnInit(){

this.helpers.trip(

[ 'A' , 'A', 'L', 'A' , 'A'] , /// array de instrucciones

{
direction: 'A',
orientation: 'N',
coordinates: {
xWidth: 1,
yHeight: 1
},
successTrip: true // objeto rover inicial
},

{
  width: 10,
  height: 10
})



/// tercer parametro que son las dimensiones del cuadrado

}

getWidth(){

  if(this.width){
  this.square.width = this.width;
  const dimensionsRes = `${this.width}px`;
  console.log('square', this.square)
  return dimensionsRes
  }
  
  }

  
  getHeight(){
  if(this.height){
  this.square.height = this.height;
  const dimensionsRes = `${this.height}px`;
  console.log('square', this.square);
  
  return dimensionsRes
  }
  
  
  }
}