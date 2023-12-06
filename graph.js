class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    let set = [null, null];
    for(let vertex of this.nodes){
      if(vertex===v1)set[0]=vertex;
      if(vertex===v2)set[1]=vertex;
    }
    if(set[0]&&set[1]){
      set[0].adjacent.add(v2);
      set[1].adjacent.add(v1);
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for(let tex of this.nodes){
      tex.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let vals = [];
    let check = start;
    let checked=[];
    let depth = 0;
    while(vals.length<this.nodes.size){
      const initialCheck=check;
      if(!vals.includes(check.value))vals.push(check.value);
      if(!checked.includes(check))checked.push(check);
      for(let vertex of check.adjacent){
        if(!vals.includes(vertex.value)){
          check = vertex;
          break;
        }
      }
      if(check===initialCheck){
        check=checked[depth-1];
        depth=depth-1;
      }else{
        depth++;
      }
    }
    console.log(vals);
    return vals;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let vals = [];
    let checks = [start];
    while(vals.length<this.nodes.size){
      let newCheck = [];
      for(let check of checks){
        if(!vals.includes(check.value))vals.push(check.value);
        for(let vertex of check.adjacent){
          if(!vals.includes(vertex.value))vals.push(vertex.value);
          newCheck.push(vertex);
        }
      }
      checks = newCheck;
    }
    console.log(vals);
    return vals;}
}

module.exports = {Graph, Node}