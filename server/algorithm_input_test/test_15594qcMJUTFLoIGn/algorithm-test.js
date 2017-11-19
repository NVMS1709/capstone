
const BST = require('./algorithm-input');
const chai = require('chai')
let expect = chai.expect;

const test1 = new BST(10).insert(5).insert(15).insert(5).insert(2)
.insert(14).insert(22);

const test2 = new BST(10).insert(15).insert(11).insert(22).remove(10);

const test3 = new BST(10).insert(5).insert(7).insert(2).remove(10);

const test4 = new BST(10).insert(5).insert(15).insert(22).insert(17)
.insert(34).insert(7).insert(2).insert(5).insert(1).insert(35).insert(27)
.insert(16).insert(30).remove(22).remove(17);

function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}
//node child process child_process.spawn(command[,args][,options])
//shared node process the server is running one node process
//if containerize, spin up a new container everytime someone sends the code to server, not sharing the node process, 

describe('BST', function () {

   it('Test Case #1', function () {
    expect(test1.left.value).to.deep.equal(5);
  });

  it('Test Case #2', function () {
    expect(test1.right.right.value).to.deep.equal(22);
  });

  it('Test Case #3', function () {
    expect(test1.right.left.value).to.deep.equal(14);
  });

  it('Test Case #4', function () {
    expect(test1.left.right.value).to.deep.equal(5);
  });

  it('Test Case #5', function () {
    expect(test1.left.left.value).to.deep.equal(2);
  });

  it('Test Case #6', function () {
    expect(test1.left.left.left).to.deep.equal(null);
  });

  it('Test Case #7', function () {
    expect(test1.right.left.right).to.deep.equal(null);
  });

  it('Test Case #8', function () {
    expect(test1.contains(15)).to.deep.equal(true);
  });

  it('Test Case #9', function () {
    expect(test1.contains(2)).to.deep.equal(true);
  });

  it('Test Case #10', function () {
    expect(test1.contains(5)).to.deep.equal(true);
  });

  it('Test Case #11', function () {
    expect(test1.contains(10)).to.deep.equal(true);
  });

  it('Test Case #12', function () {
    expect(test1.contains(22)).to.deep.equal(true);
  });

  it('Test Case #13', function () {
    expect(test1.contains(23)).to.deep.equal(false);
  });

  it('Test Case #14', function () {
    expect(inOrderTraverse(test2, [])).to.deep.equal([11, 15, 22]);
  });

  it('Test Case #15', function () {
    expect(inOrderTraverse(test3, [])).to.deep.equal([2, 5, 7]);
  });

  it('Test Case #16', function () {
    expect(inOrderTraverse(test4, [])).to.deep.equal([1, 2, 5, 5, 7, 10, 15, 16, 27, 30, 34, 35]);
  });

  it('Test Case #17', function () {
    expect(test4.right.right.value).to.deep.equal(27);
  });

  it('Test Case #18', function () {
    expect(test4.right.right.left.value).to.deep.equal(16);
  });
 
});
      