//https://stackoverflow.com/questions/47086858/create-a-grid-in-opengl
class Plane{
  constructor(gSIZEx, gSIZEz, h){
    this.size = [gSIZEx, gSIZEz];
    this.height = h;
    this.scale = 20;
    this.grid = {
      vertices: [],
      color: [
        0.0, 0.0, 0.0, 1.0,
      ],
      gridLines:0
    };
    for (let i = -gSIZEx/2; i < gSIZEx/2; i++){
      for (let j = -gSIZEz/2; j < gSIZEz/2; j++){
      // let x = j/gSIZEx * 2;
      // let y = 0.0;
      // let z = i/gSIZEz * 2;
      this.grid.vertices.push(i/gSIZEx* 2,0.0,j/gSIZEx* 2);
      // this.grid.vertices.push(i/gSIZEx,0.0,j/gSIZEx);
      this.grid.gridLines+=1;
    }
    }
    for (let i = -gSIZEx/2; i < gSIZEx/2; i++){
      for (let j = -gSIZEz/2; j < gSIZEz/2; j++){
      // let x = j/gSIZEx * 2;
      // let y = 0.0;
      // let z = i/gSIZEz * 2;
      this.grid.vertices.push(j/gSIZEx * 2,0.0,i/gSIZEx * 2);
      // this.grid.vertices.push(i/gSIZEx,0.0,j/gSIZEx);
      this.grid.gridLines+=1;
    }
    }
  }
}
