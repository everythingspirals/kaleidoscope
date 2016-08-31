export default class Grid{

  constructor(id, nodeLength, rowLength){
    this.id = id;
    this.nodeLength = nodeLength;
    this.rowLength = rowLength;
    this.currentNode = 0;
    this.top = null;
    this.right = null;
    this.bottom = null;
    this.left = null;
    this.registered = false;
    this.domNode = null;
  }

  setOrientation(top,right,bottom,left){
    this.setTop(top);
    this.setRight(right);
    this.setBottom(bottom);
    this.setLeft(left);
  }

  register(domNode){
    this.registered = true;
    this.domNode = domNode;
  }

  unregister(){
    this.registered = false;
    this.domNode = null;
  }

  isRegistered(){
    return this.registered;
  }

  setGridManager(gridManager){
    this.gridManager = gridManager;
  }

  getGridManager(){
    return this.gridManager;
  }

  getId(){
    return this.id;
  }

  setTop(top){
    this.top = top;
  }

  getTop(){
    return this.top;
  }

  setRight(right){
    this.right = right;
  }

  getRight(){
    return this.right;
  }

  setBottom(bottom){
    this.bottom = bottom;
  }

  getBottom(){
    return this.bottom;
  }

  setLeft(left){
    this.left = left;
  }

  getLeft(){
    return this.left;
  }

  getRowLength(){
    return this.rowLength;
  }

  getNodeLength(){
    return this.nodeLength;
  }

  getCurrentNode(){
    return this.currentNode;
  }

  setCurrentNode(node){
    this.currentNode = node;
  }

  navigate(){
      let node = this.domNode.querySelector(".grid-node-"+this.currentNode);
      let href = node.querySelector("a").href;
      location.href = href;
  }

  updateCurrentNode(keyCode){

    let currentNode = this.getCurrentNode(),
        rowLength = this.getRowLength(),
        nodeLength = this.getNodeLength(),
        top = this.getTop(),
        right = this.getRight(),
        bottom = this.getBottom(),
        left = this.getLeft(),
        gridManager = this.getGridManager();

    switch(keyCode){
      case 13://return
          this.navigate();
        break;

      case 37://left
        if(currentNode > 0){
          this.currentNode--;
        }
        break;

      case 38://up
        if(rowLength && (currentNode - rowLength >= 0)){
          this.currentNode = currentNode - rowLength
        }else if(top != null){
          if(gridManager.isRegistered(top)){
            gridManager.setCurrentGrid(top);
          }
        }
        break;

      case 39://right
        if(currentNode < nodeLength - 1){
          this.currentNode++;
        }
        break;

      case 40://down
        if(rowLength && (currentNode + rowLength <= nodeLength - 1)){
          console.log(currentNode + rowLength,nodeLength - 1);
          this.currentNode = currentNode + rowLength;
        }else if(bottom != null){
          if(gridManager.isRegistered(bottom)){
            gridManager.setCurrentGrid(bottom);
          }
        }
        break;
    }
  }
}
