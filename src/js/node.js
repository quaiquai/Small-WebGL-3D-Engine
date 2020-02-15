class Node{
  constructor(source){
    this.children = [];
    this.localMatrixMin = [0,0,0];
    this.localMatrixMax = [0,0,0];
    this.worldMatrixMin = [0,0,0];
    this.worldMatrixMax = [0,0,0];
    this.source = source;
  }

  setParent(parent){
    parent.children.push(this);
    this.localMatrixMin = this.source.translationMin;
    this.localMatrixMax = this.source.translationMin;
    this.worldMatrixMin = parent.source.translationMin;
    this.worldMatrixMax = parent.source.translationMax;
  }
}
