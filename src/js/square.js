class Square{

	constructor(xpos, ypos, sz, col){
		this.position = {
			x: xpos,
			y: ypos
		};
		this.color = col;
		this.translation = new Mat3();
		this.rotAngle = 0;
		this.scaleFactor = [0,0];
		this.size = sz;
	}

	generateVertices(){
		this.vertices = [];
		this.vertices.push(-this.size, this.size);
		this.vertices.push(this.size, this.size);
		this.vertices.push(this.size, -this.size);
		this.vertices.push(-this.size, -this.size);
	}

}