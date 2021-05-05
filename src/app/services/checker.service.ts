import { Injectable } from '@angular/core';
import { Coordinates, Rover, Square } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class CheckerService {

  constructor() { }

  // This method will check if the coordinates given are inside the square

checkIfInsideSquare(square: Square , coordinates: Coordinates ): boolean {

  const maxWidth = square.width; // The max width of the square will be the width of the square.
  const maxHeight = square.height; // The max height of the square will be the height of the square.
  
  // so we check if coordinates are within those boundaries and also positive number
  return ( coordinates.xWidth <= maxWidth )
  && ( coordinates.yHeight <= maxHeight )
  && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 )
  }
  
  
  
  
  
  //// METHODS THAT HANDLE MOVEMENT OF THE ROVER ON THE SQUARE /////
  
  getNewCoordinateWhereIWantToGo( actualCoordinate: Coordinates, orientation: 'N' | 'S' | 'W' | 'E' ): Coordinates{
  
  switch (orientation){
  case 'N': {
  return {
  xWidth: actualCoordinate.xWidth,
  yHeight: actualCoordinate.yHeight + 1
  }
  }
  
  case 'E': {
  return {
  xWidth: actualCoordinate.xWidth + 1,
  yHeight: actualCoordinate.yHeight
  }
  }
  case 'S': {
  return {
  xWidth: actualCoordinate.xWidth,
  yHeight: actualCoordinate.yHeight - 1
  }
  }
  case 'W': {
  return {
  xWidth: actualCoordinate.xWidth - 1,
  yHeight: actualCoordinate.yHeight
  }
  }
  }
  }
  
  
  // This method will return the actual orientation and the new direction after receiving an order
  
  changeOrientation( direction: string, orientation: string ):string {
  // we assume the rover can only change orientation when he receives either Left (L) or Right (R) Direction
  
  // const arrayOrientations = ['N', 'E', 'S', 'W']
  if( ( direction === 'L' ) || ( direction === 'R') ){
  switch(orientation) {
  case 'N': {
  if( direction === 'L'){
  return 'W'
  }else{
  // can only be 'R'
  return 'E'
  }
  }
  case 'S': {
  if( direction === 'L'){
  return 'E'
  }else{
  // can only be 'R'
  return 'W'
  }
  }
  case 'E': {
  if( direction === 'L'){
  return 'N'
  }else{
  // can only be 'R'
  return 'S'
  }
  }
  case 'W': {
  if( direction === 'L'){
  return 'S'
  }else{
  // can only be 'R'
  return 'N'
  }
  }
  }
  
  }else{
  return orientation
  }
  }
  
  
  
  
  
  
  
  moveRover( rover: Rover , direction: 'L' | 'R' | 'A' , square: Square ): Rover {
  // I receive an order of type direction;
  // 1. I change the orientation of the rover;
  if( direction === 'L' || direction === 'R') {
  
  rover.orientation = this.changeOrientation(direction, rover.orientation) as 'N' | 'S' | 'W' | 'E'
  console.log('rover', rover);
  
  return rover
  
  } else {
  // I want to check first if is possible to go there;
  
  const targetCoordinates = this.getNewCoordinateWhereIWantToGo(rover.coordinates, rover.orientation);
  
  if( this.checkIfInsideSquare(square, targetCoordinates)){
  
  // is allowed to go so let's execute the method move;
  rover['coordinates'] = targetCoordinates;
  
  console.log('ROVER', rover);
  rover.successTrip = true
  return rover
  }else{
  rover.successTrip = false
  return rover
  }
  }
  }



  /// L, L, L, L , A, A, A, R, A , R, L, A


async trip( directions: string[], rover: Rover, square: Square){

  // we use a promise to track all the steps since we add some delay effect
  let roverUpdated:Rover = rover;
  
  directions.forEach((direction: 'L' | 'R' | 'A' )=>{
  
  if(roverUpdated.successTrip ){
  roverUpdated = this.moveRover(roverUpdated, direction, square );
  console.log('rover updated', roverUpdated);
  
  }else{
  console.log('ME HE SALIDO DEL CUADRADO, EL ROVER ESTA EN', roverUpdated)
  
  }
  })
}
  
  
}
  
  

//   insideSquare(square: Square , coordinates: Coordinates ): boolean {

//     const maxWidth = square.width; // The max width of the square will be the width of the square.
//     const maxHeight = square.height; // The max height of the square will be the height of the square.
    
//     // so we check if coordinates are within those boundaries and also positive number
//     return ( coordinates.xWidth <= maxWidth )
//     && ( coordinates.yHeight <= maxHeight )
//     && ( coordinates.xWidth >= 0 && coordinates.yHeight >= 0 )
//     }



//     changeOrientation(orientation: 'N'|'S'|'E'|'W', command: 'A'|'L'|'R' ): 'N'|'S'|'E'|'W'{
//       switch (command) {
//         case 'A':
//         return orientation = orientation;
        
//         case 'L':
//           if(orientation === 'N') { 
//             orientation = 'W';
//           } else if (orientation === 'E') {
//             orientation = 'N';
//           } else if (orientation === 'W') {
//             orientation = 'S';
//           } else { orientation = 'E'; };
//         return orientation;
  
//         case 'R':
//           if(orientation === 'N') { 
//             orientation = 'E';
//           } else if (orientation === 'E') {
//             orientation = 'S';
//           } else if (orientation === 'W') {
//             orientation = 'N';
//           } else { orientation = 'W'; };
//         return orientation;
//       }
//     }

//     getNewCoordinateIWantToGo( orientation: 'N' | 'E' | 'S' | 'W' ){
//       let coordinate: Coordinates;
    
  
//       if(orientation === 'N' || orientation === 'S'){
//         coordinate.yHeight = orientation === 'N'? coordinate.yHeight++ : coordinate.yHeight--;
//       }else{
//         coordinate.xWidth = orientation === 'E'? coordinate.xWidth++ : coordinate.xWidth--;
//       }
  
//       return coordinate
//     }
  

// // parametros Square, direccion, rover (dentro ya viene la orientacion)
//   // funcion de moverse: evalúe si la posición futura está dentro o no del cuadrado
//   // si esta dentro del cuadrado me voy a mover, si no está dentro devolverá false;
//   moveRover(rover: Rover){
//     const orientation = this.changeOrientation(rover.orientation, rover.direction);
//     const coordenadas: Coordinates = this.getNewCoordinateIWantToGo(orientation);
//     const insideSquare = this.insideSquare(coordinates);
    
//     if(insideSquare) {
//       //dentro del cuadrado: moverse
//       rover.coordinates.xWidth = coordenadas.xWidth;
//       rover.coordinates.yHeight = coordenadas.yHeight;
//       return ${insideSquare}, ${orientation}, ${coordenadas};

//     } else { return ${insideSquare}; }
//   }}
