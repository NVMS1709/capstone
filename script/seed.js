/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const { User, Question, Category, Difficulty } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ name: 'cody', email: 'cody@email.com', password: '123' }),
    User.create({ name: 'murphy', email: 'murphy@email.com', password: '123' })
  ])

  console.log(`seeded ${users.length} users`)

  const categories = await Promise.all([
    Category.create({
      name: 'Arrays',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Binary Search Trees',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Dynamic Programming',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Graphs',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Heaps',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Recursion',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Searching',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Sorting',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Stacks',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    }),
    Category.create({
      name: 'Strings',
      description:
        'Lorem ipsum dolor sit amet, mei ad exerci tincidunt sadipscing, eu choro quidam vivendo nec, ea sit amet impetus probatus. Libris iuvaret ius te. Ex mei rebum elitr maluisset, justo error eam ad. Eam ea graecis dissentiet, malis postea delicata usu id. No veritus interpretaris quo.'
    })
  ])

  console.log(`seeded ${categories.length} categories`)

  const difficulties = await Promise.all([
    Difficulty.create({ name: 'easy' }),
    Difficulty.create({ name: 'medium' }),
    Difficulty.create({ name: 'difficult' })
  ])

  console.log(`seeded ${difficulties.length} difficulties`)

  const questions = await Promise.all([
    Question.create({
      name: 'BST Construction',
      published: true,
      description:
        'Write a Binary Search Tree (BST) class named "BST". The BST class should have a "value" property set to be an integer, as well as "left" and "right" properties, both of which should point to either the None (null) value or to another BST. A node is said to be a BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and both of its children nodes are either BST nodes themselves or None (null) values. The BST class should support three methods, viz., "insert", "contains", and "remove". The "contains" method return a boolean value indicating whether the value is contained in the BST tree or not. The "remove" method should only remove the first instance of the target value.',
      javascriptSolution: `
class BST {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BST(value);
      } else {
        this.left.insert(value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(value);
      } else {
        this.right.insert(value);
      }
    }
    return this;
  }

  contains(value) {
    if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else if (value > this.value) {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    } else {
      return true;
    }
  }

  remove(value, parent = null) {
    if (value < this.value) {
      if (this.left !== null) {
        this.left.remove(value, this);
      }
    } else if (value > this.value) {
      if (this.right !== null) {
        this.right.remove(value, this);
      }
    } else {
      if (this.left !== null && this.right !== null) {
        this.value = this.right.getMinValue();
        this.right.remove(this.value, this);
      } else if (parent === null) {
        if (this.left !== null) {
          this.value = this.left.value;
          this.right = this.left.right;
          this.left = this.left.left;
        } else if (this.right !== null) {
          this.value = this.right.value;
          this.left = this.right.left;
          this.right = this.right.right;
        } else {
          this.value = null;
        }
      } else if (parent.left === this) {
        parent.left = this.left !== null ? this.left : this.right;
      } else if (parent.right === this) {
        parent.right = this.left !== null ? this.left : this.right;
      }
    }
    return this;
  }

  getMinValue() {
    if (this.left === null) {
      return this.value;
    } else {
      return this.left.getMinValue();
    }
  }
}
`,
      pythonSolution: `
class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def insert(self, value):
        currentNode = self
        while True:
            if value < currentNode.value:
                if currentNode.left is None:
                    currentNode.left = BST(value)
                    break
                else:
                    currentNode = currentNode.left
            else:
                if currentNode.right is None:
                    currentNode.right = BST(value)
                    break
                else:
                    currentNode = currentNode.right
        return self

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def contains(self, value):
        currentNode = self
        while currentNode is not None:
            if value < currentNode.value:
                currentNode = currentNode.left
            elif value > currentNode.value:
                currentNode = currentNode.right
            else:
                return True
        return False

    # Average: O(log(n)) time | O(1) space
    # Worst: O(n) time | O(1) space
    def remove(self, value, parentNode = None):
        currentNode = self
        while currentNode is not None:
            if value < currentNode.value:
                parentNode = currentNode
                currentNode = currentNode.left
            elif value > currentNode.value:
                parentNode = currentNode
                currentNode = currentNode.right
            else:
                if currentNode.left is not None and currentNode.right is not None:
                    currentNode.value = currentNode.right.getMinValue()
                    currentNode.right.remove(currentNode.value, currentNode)
                elif parentNode is None:
                    if currentNode.left is not None:
                        currentNode.value = currentNode.left.value
                        currentNode.right = currentNode.left.right
                        currentNode.left = currentNode.left.left
                    elif currentNode.right is not None:
                        currentNode.value = currentNode.right.value
                        currentNode.left = currentNode.right.left
                        currentNode.right = currentNode.right.right
                    else:
                        currentNode.value = None
                elif parentNode.left == currentNode:
                    parentNode.left = currentNode.left if currentNode.left is not None else currentNode.right
                elif parentNode.right == currentNode:
                    parentNode.right = currentNode.left if currentNode.left is not None else currentNode.right
                break
        return self

    def getMinValue(self):
        currentNode = self
        while currentNode.left is not None:
            currentNode = currentNode.left
        return currentNode.value

`,
      categoryId: 2,
      difficultyId: 2,
      functionName: 'BST',
      javascriptTestFile: `
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

describe('BST', function () {

  let testCaseOutcomes = [];

  afterEach(function(){
    testCaseOutcomes.push({title: this.currentTest.title, outcome: this.currentTest.state});
  });

  after(function(){
    console.log("*****Eventually the testCaseOutcomes", JSON.stringify(testCaseOutcomes), "*****End the testCaseOutcomes")
  })

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
      `,
      pythonTestFile: `
import program
import unittest


test1 = program.BST(10).insert(5).insert(15).insert(5).insert(2).insert(14).insert(22)

test2 = program.BST(10).insert(15).insert(11).insert(22).remove(10)

test3 = program.BST(10).insert(5).insert(7).insert(2).remove(10)

test4 = program.BST(10).insert(5).insert(15).insert(22).insert(17).insert(34) \
    .insert(7).insert(2).insert(5).insert(1).insert(35).insert(27).insert(16) \
    .insert(30).remove(22).remove(17)

def inOrderTraverse(tree, array):
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array


class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(test1.left.value, 5)

    def test_case_2(self):
        self.assertEqual(test1.right.right.value, 22)

    def test_case_3(self):
        self.assertEqual(test1.right.left.value, 14)

    def test_case_4(self):
        self.assertEqual(test1.left.right.value, 5)

    def test_case_5(self):
        self.assertEqual(test1.left.left.value, 2)

    def test_case_6(self):
        self.assertEqual(test1.left.left.left, None)

    def test_case_7(self):
        self.assertEqual(test1.right.left.right, None)

    def test_case_8(self):
        self.assertEqual(test1.contains(15), True)

    def test_case_9(self):
        self.assertEqual(test1.contains(2), True)

    def test_case_10(self):
        self.assertEqual(test1.contains(5), True)

    def test_case_11(self):
        self.assertEqual(test1.contains(10), True)

    def test_case_12(self):
        self.assertEqual(test1.contains(22), True)

    def test_case_13(self):
        self.assertEqual(test1.contains(23), False)

    def test_case_14(self):
        self.assertEqual(inOrderTraverse(test2, []), [11, 15, 22])

    def test_case_15(self):
        self.assertEqual(inOrderTraverse(test3, []), [2, 5, 7])

    def test_case_16(self):
        self.assertEqual(inOrderTraverse(test4, []), [1, 2, 5, 5, 7, 10, 15, 16, 27, 30, 34, 35])

    def test_case_17(self):
        self.assertEqual(test4.right.right.value, 27)

    def test_case_18(self):
        self.assertEqual(test4.right.right.left.value, 16)

if __name__ == "__main__":
    unittest.main()
      `,
      jsWalkThrough: [
        `Function: 'BST'

        .Create a class function called 'BST.'

        Make a constructor within the function that takes a value as a parameter. The initial value passed in through the constructor will become the value of our tree's root node.  Any future values passed  via the constructor's instance method(s) will become nodes within the tree.

        Next, you will want to create key value pairs that represent the properties of the new node and place these pairs into the constructor.  You will want a property that represents the node's value, as well as a property that points to the nodes located to the left and right of the newly created node.`,

        `Method: 'insert'
        Create a method called 'insert' that will insert new nodes into the tree.  This method will take a value.  This method will traverse the tree, find an appropriate place where a node of the value passed in should be inserted, create a new node with that value using the constructor, and then place it into the tree.

        Remember, if the value passed into the function is less than the value of the root node, this new node should be placed to the left of the root node.  If the value of the new node is greater than the value of the root node then this new node should be placed to the right of the root node.

        At the end of the the function you will want to place a return this, which should now represent the node that was created and inserted into the tree.`,

        `Method: 'contains'
        Create a method called 'contains' that will check the nodes of our tree to see if there is a node that contains a particular value or not.  This method should accept a value within its parameter to search for and then traverse the tree looking for that value.  If a node within the tree contains the value, we will want to return true.  If not, we want to return false.

        You will want to check the values of the nodes as you traverse the tree in order to determine which direction, left or right, within the tree you should search at any particular point.  Use recursion in this method in order to complete the traversal of the tree.`,

        `Method: 'remove'
        Create a method called 'remove'.  This method should take two values as parameters.  The first is the value that will be removed.  The second is a value that will represent the parent node of the node we are currently on during our traversal of the tree.

        You will want to recursively call the remove method in order to traverse the tree using.  Use if else statements to determine whether the current node you are on is the one you are looking for, or if you want to continue traversing the tree and whether you want to move left or right through the tree.

        If you reach the end of a branch without finding a node that contains the sought after value, you've traversed the entire tree and should return the current node.  If you find the value you are looking for you will want to re-orient the tree so that the the node can be removed without disrupting the structure of the tree.`,

        `Create a method called 'getMinValue.'  This method will not take any values into it's parameters.  This method will traverse the tree in a single direction searching for the lowest value contained within the tree.`
      ],
      jsSolutionWT: [
        `class BST {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }
      }`,
        `class BST {
          constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
          }
          insert(value) {
            if (value < this.value) {
              if (this.left === null) {
                this.left = new BST(value);
              } else {
                this.left.insert(value);
              }
            } else {
              if (this.right === null) {
                this.right = new BST(value);
              } else {
                this.right.insert(value);
              }
            }
            return this;
          }
        }`,
        `class BST {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }

        insert(value) {
          if (value < this.value) {
            if (this.left === null) {
              this.left = new BST(value);
            } else {
              this.left.insert(value);
            }
          } else {
            if (this.right === null) {
              this.right = new BST(value);
            } else {
              this.right.insert(value);
            }
          }
          return this;
        }

        contains(value) {
          if (value < this.value) {
            if (this.left === null) {
              return false;
            } else {
              return this.left.contains(value);
            }
          } else if (value > this.value) {
            if (this.right === null) {
              return false;
            } else {
              return this.right.contains(value);
            }
          } else {
            return true;
          }
        }
      }`,
        `class BST {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }

        insert(value) {
          if (value < this.value) {
            if (this.left === null) {
              this.left = new BST(value);
            } else {
              this.left.insert(value);
            }
          } else {
            if (this.right === null) {
              this.right = new BST(value);
            } else {
              this.right.insert(value);
            }
          }
          return this;
        }

        contains(value) {
          if (value < this.value) {
            if (this.left === null) {
              return false;
            } else {
              return this.left.contains(value);
            }
          } else if (value > this.value) {
            if (this.right === null) {
              return false;
            } else {
              return this.right.contains(value);
            }
          } else {
            return true;
          }
        }

        remove(value, parent = null) {
          if (value < this.value) {
            if (this.left !== null) {
              this.left.remove(value, this);
            }
          } else if (value > this.value) {
            if (this.right !== null) {
              this.right.remove(value, this);
            }
          } else {
            if (this.left !== null && this.right !== null) {
              this.value = this.right.getMinValue();
              this.right.remove(this.value, this);
            } else if (parent === null) {
              if (this.left !== null) {
                this.value = this.left.value;
                this.right = this.left.right;
                this.left = this.left.left;
              } else if (this.right !== null) {
                this.value = this.right.value;
                this.left = this.right.left;
                this.right = this.right.right;
              } else {
                this.value = null;
              }
            } else if (parent.left === this) {
              parent.left = this.left !== null ? this.left : this.right;
            } else if (parent.right === this) {
              parent.right = this.left !== null ? this.left : this.right;
            }
          }
          return this;
        }
      }`,
        `class BST {
        constructor(value) {
          this.value = value;
          this.left = null;
          this.right = null;
        }

        insert(value) {
          if (value < this.value) {
            if (this.left === null) {
              this.left = new BST(value);
            } else {
              this.left.insert(value);
            }
          } else {
            if (this.right === null) {
              this.right = new BST(value);
            } else {
              this.right.insert(value);
            }
          }
          return this;
        }

        contains(value) {
          if (value < this.value) {
            if (this.left === null) {
              return false;
            } else {
              return this.left.contains(value);
            }
          } else if (value > this.value) {
            if (this.right === null) {
              return false;
            } else {
              return this.right.contains(value);
            }
          } else {
            return true;
          }
        }

        remove(value, parent = null) {
          if (value < this.value) {
            if (this.left !== null) {
              this.left.remove(value, this);
            }
          } else if (value > this.value) {
            if (this.right !== null) {
              this.right.remove(value, this);
            }
          } else {
            if (this.left !== null && this.right !== null) {
              this.value = this.right.getMinValue();
              this.right.remove(this.value, this);
            } else if (parent === null) {
              if (this.left !== null) {
                this.value = this.left.value;
                this.right = this.left.right;
                this.left = this.left.left;
              } else if (this.right !== null) {
                this.value = this.right.value;
                this.left = this.right.left;
                this.right = this.right.right;
              } else {
                this.value = null;
              }
            } else if (parent.left === this) {
              parent.left = this.left !== null ? this.left : this.right;
            } else if (parent.right === this) {
              parent.right = this.left !== null ? this.left : this.right;
            }
          }
          return this;
        }

        getMinValue() {
          if (this.left === null) {
            return this.value;
          } else {
            return this.left.getMinValue();
          }
        }
      }`
      ]
    }),
    Question.create({
      name: 'BST Traversal',
      published: true,
      description:
        'Write three functions, viz., "inOrderTraverse", "preOrderTraverse", and "postOrderTraverse", that take in an empty array, traverse the BST, add its nodes\' values to the input array, and return that array. The three functions should traverse the BST using the in-order traversal, pre-order traversal, and post-order traversal techniques, respectively. You are given a BST data structure consisting of BST nodes. Each BST node has an integer value stored in a property called "value" and two children nodes stored in properties called "left" ani "right," respectively. A node is said to be a BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and both of its children nodes are either BST nodes themselves or None (null) values.',
      javascriptSolution: `
function inOrderTraverse(tree, array) {
  if (tree !== null) {
    inOrderTraverse(tree.left, array);
    array.push(tree.value);
    inOrderTraverse(tree.right, array);
  }
  return array;
}

function preOrderTraverse(tree, array) {
  if (tree !== null) {
    array.push(tree.value);
    preOrderTraverse(tree.left, array);
    preOrderTraverse(tree.right, array);
  }
  return array;
}

function postOrderTraverse(tree, array) {
  if (tree !== null) {
    postOrderTraverse(tree.left, array);
    postOrderTraverse(tree.right, array);
    array.push(tree.value);
  }
  return array;
}
`,
      pythonSolution: '',
      categoryId: 2,
      difficultyId: 2,
      functionName: 'inOrderTraverse, preOrderTraverse, postOrderTraverse',
      javascriptTestFile: '',
      pythonTestFile: ''
    }),
    Question.create({
      name: 'Two Number Sum',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 1,
      difficultyId: 1
    }),
    Question.create({
      name: 'Three Number Sum',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 1,
      difficultyId: 2
    }),
    Question.create({
      name: 'Max SubsetSum No Adjacent',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 3,
      difficultyId: 2
    }),
    Question.create({
      name: 'Max Sum Increasing Subsequence',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 3,
      difficultyId: 3
    }),
    Question.create({
      name: 'Depth-first Search',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 4,
      difficultyId: 1
    }),
    Question.create({
      name: 'Breadth-first Search',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 4,
      difficultyId: 2
    }),
    Question.create({
      name: 'Binary Search',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 7,
      difficultyId: 1
    }),
    Question.create({
      name: 'Search In Sorted Matrix',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 7,
      difficultyId: 2
    }),
    Question.create({
      name: 'Shifted Binary Search',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 7,
      difficultyId: 3
    }),
    Question.create({
      name: 'Bubble Sort',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 8,
      difficultyId: 1
    }),
    Question.create({
      name: 'Insertion Sort',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 8,
      difficultyId: 2
    }),
    Question.create({
      name: 'Heap Sort',
      published: true,
      description: '',
      javascriptSolution: '',
      pythonSolution: '',
      functionName: '',
      javascriptTestFile: '',
      pythonTestFile: '',
      categoryId: 8,
      difficultyId: 3
    })
  ])
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${questions.length} questions`)

  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
