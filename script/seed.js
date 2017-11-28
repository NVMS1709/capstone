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
const {
  User,
  Question,
  Category,
  Difficulty,
  Forum
} = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ name: 'admin', email: 'admin@email.com', password: '123' }),
    User.create({ name: '', email: 'cody@email.com', password: '123' }),
    User.create({ name: '', email: 'murphy@email.com', password: '123' })
  ])

  console.log(`seeded ${users.length} users`)

  const forums = await Promise.all([
    Forum.create({
      title: 'Report Bugs',
      comment:
        'Use this thread to submit bugs that you come across while using the Algorithms website.  Reports will be reviewed by the site administator in the order that they are received.',
      userId: 1
    }),
    Forum.create({
      title: 'Site Design',
      comment:
        'Use this thread to submit comments and or suggestions on site design and usability.  Suggestions will be reviewed by the site administator in the order that they are received.',
      userId: 1
    })
  ])

  console.log(`seeded ${forums.length} forums`)

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
    }),
    Category.create({
      name: 'Puzzle',
      description: 'Mind teasing questions'
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
      name: 'Merge Sort Top Down',
      published: true,
      description: `Implement the algorithm for a merge sort. The idea behind this algorithm is that it combines two ordered arrays together`,
      javascriptSolution: `
      function mergeSortTopDown(array) {
        if(array.length < 2) {
          return array;
        }
      
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
      
        return mergeTopDown(mergeSortTopDown(left), mergeSortTopDown(right));
      }
      
      function mergeTopDown(left, right) {
        const array = [];
      
        while(left.length && right.length) {
          if(left[0] < right[0]) {
            array.push(left.shift());
          } else {
            array.push(right.shift());
          }
        }
        return array.concat(left.slice()).concat(right.slice());
      }
      
      module.exports = mergeSortTopDown, mergeTopDown
      `,
      pythonSolution: '',
      functionName: 'mergeSortTopDown',
      javascriptTestFile: `
      const mergeSortTopDown = require('../problems/mergeSortTopDown')
      const chai = require('chai')
      let expect = chai.expect
      
      describe('Merge Sort(Top-Down Implemention)', function() {
      
        it('return an array', function() {
          let result = mergeSortTopDown([])
          expect(result).to.deep.equal([])
        })
      
         it('sorts an array with random positive values', function () {
          let result = mergeSortTopDown([9, 2, 5, 6, 4, 3, 7, 10, 1, 8])
          expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        })
      
        it('sorts an array in reverse order', function () {
          let result = mergeSortTopDown([8, 7, 6, 5, 4])
          expect(result).to.deep.equal([4, 5, 6, 7, 8])
        })
      
        it('sorts an array with mixed values', function () {
          let result = mergeSortTopDown([8, -7, 6, -5, 4])
          expect(result).to.deep.equal([-7, -5, 4, 6, 8])
        })
      
        it('sorts an array with negative values', function () {
          let result = mergeSortTopDown([-1, -5, -22, -11, -7])
          expect(result).to.deep.equal([-22, -11, -7, -5, -1])
        }) 
      })
      `,
      pythonTestFile: '',
      categoryId: 4,
      difficultyId: 1
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
      description: `Implement the bubble sort algorithm that will sort any given array.`,
      javascriptSolution: `
      function bubbleSort(array) {
        let swapped;
        do {
          swapped = false;
          for(let i = 0; i < array.length; i++) {
            if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
              [array[i], array[i + 1]] = [array[i + 1], array[i]];
              swapped = true;
            }
          }
        } while(swapped);
        return array;
      }`,
      pythonSolution: '',
      functionName: 'bubbleSort',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect;
      
      describe('Solution for bubble sort', () => {
          let bubble_sort_func
      
          beforeEach(() => {
              bubble_sort_func = bubbleSort
          })
      
          it('Sorts an unordered array', () => {
              let result = bubble_sort_func([3, 7, 2, 1, 8])
              expect(result).to.deep.equal([1,2,3,7,8])
          })
      
          it('Returns original array value for already sorted array', () => {
              let result = bubble_sort_func([1,2,3])
              expect(result).to.deep.equal([1,2,3])
          })
      
          it('Can sort a mixed array of positive and negative numbers', () => {
            let result = bubble_sort_func([5, -6, 9, -2])
            expect(result).to.deep.equal([-6, -2, 5, 9])
          })
      
          it('Sorts an array of negative numbers', () => {
            let result = bubble_sort_func([-3, -5, -2, -8])
            expect(result).to.deep.equal([-8, -5, -3, -2])
          })
      
          it('Sorts an array with duplicate values', () => {
            let result = bubble_sort_func([2, 5, 5, 3, 8, 3])
            expect(result).to.deep.equal([2, 3, 3, 5, 5, 8])
          })
      })`,
      pythonTestFile: '',
      jsWalkThrough: [
        `Step One: Create a function definition called "bubbleSort" which takes an array and takes a parameter named "array", return the parameter as well`,
        `Step Two: Create a boolean flag that will keep track of when a swap will occur inside of a do "while loop"`,
        `Step Three: Create a loop that will iterate through the array.`,
        `Step Four: Create a conditional statement that will determine if adjacent values are bigger or smaller than the other.`,
        `Step Five: Upon a succesful conditional entering, swap the adjacent values`
      ],
      jsSolutionWT: [
        `
        function bubbleSort(array) {
          return array
        }
        `, `
        function bubbleSort(array) {
          do {
            swapped = false;
            // more stuff
          } while(swapped);
          return array
        }
        `, `
        function bubbleSort(array) {
          do {
            swapped = false;
            for (let i = 0; i < array.length; i++) {
              // set up conditional at this point
            }
          } while(swapped);
          return array
        }
        `, `
        function bubbleSort(array) {
          do {
            swapped = false;
            for(let i = 0; i < array.length; i++) {
              if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
                // Now swap these values! Can you figure out how?
              }
            }
          } while(swapped);
          return array
        }`, `
        function bubbleSort(array) {
          do {
            swapped = false;
            for(let i = 0; i < array.length; i++) {
              if(array[i] && array[i + 1] && array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
              }
            }
          } while(swapped);
          return array
        }`
      ],
      categoryId: 8,
      difficultyId: 1
    }),
    Question.create({
      name: 'Insertion Sort',
      published: true,
      description: 'Implement the insertionSort function to sort any array',
      javascriptSolution: `
      function insertionSort(array) {
        for (let i = 0; i < array.length; i++) {
          let temp = array[i];
          let j = i - 1;
          while (j >= 0 && array[j] > temp) {
            array[j + 1] = array[j];
            j--;
          }
          array[j + 1] = temp;
        }
        return array;
      }
      
      module.exports = insertionSort
      `,
      pythonSolution: '',
      functionName: 'insertionSort',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect
      
      describe('Insertion Sort', function () {
      
        it('sorts an array with random positive values', function () {
          let result = insertionSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8])
          expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        })
      
        it('sorts an array in reverse order', function () {
          let result = insertionSort([8, 7, 6, 5, 4])
          expect(result).to.deep.equal([4, 5, 6, 7, 8])
        })
      
        it('sorts an array with mixed values', function () {
          let result = insertionSort([8, -7, 6, -5, 4])
          expect(result).to.deep.equal([-7, -5, 4, 6, 8])
        })
      
        it('sorts an array with negative values', function () {
          let result = insertionSort([-1, -5, -22, -11, -7])
          expect(result).to.deep.equal([-22, -11, -7, -5, -1])
        })
      
        it('returns an array', function () {
          let result = insertionSort([])
          expect(result).to.deep.equal([])
        })
      })
      `,
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
    }),
    Question.create({
      name: 'even_or_odd',
      published: true,
      description:
        "Create a function that takes an integer as an argument and returns 'even' for even numbers, or 'odd' for odd numbers.",
      javascriptSolution: `
        function even_or_odd(number) {
          if (number % 2 === 0) {
            return 'even'
          } else {
            return 'odd'
          }
        }
      `,
      pythonSolution: '',
      functionName: 'even_or_odd',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect;

      describe('Solution for even_or_odd', () => {

        let even_or_oddFunc
        beforeEach(function() {
          even_or_oddFunc = even_or_odd
        })

        it('Test Case 1', function () {
          let result = even_or_oddFunc(5)
          expect(result).to.deep.equal('odd');
        });

        it('Test Case 2', function () {
          let result = even_or_oddFunc(6)
          expect(result).to.deep.equal('even');
        });

        it('Test Case 3', function () {
          let result = even_or_oddFunc(-6)
          expect(result).to.deep.equal('even');
        });

        it('Test Case 4', function () {
          let result = even_or_oddFunc(99)
          expect(result).to.deep.equal('odd');
        });

        it('Test Case 5', function () {
          let result = even_or_oddFunc(0)
          expect(result).to.deep.equal('even');
        });

        it('Test Case 6', function() {
          let result = even_or_oddFunc(33)
          expect(result).to.deep.equal('odd');
        })
      })
      `,
      pythonTestFile: '',
      jsWalkThrough: [
        `
      Function: even_or_odd\n
      Step One: Create a function named "even_or_odd" that takes an a variable called number.
      `,
        `
      Step Two: Create an if statement that will return 'even' if the number is an even number.
      Hint: To determine if a number is even or odd, user the '%' (modulus) operator.
      `,
        `
      Step Three: Now that your if statement is setup, you must return 'odd' if your if statement is odd.
      Hint: You can use the else {} statement after an if {} block. This tells your program to execute the code inside of the else {} block if the if {} block does not pass the conditional.`
      ],
      jsSolutionWT: [
        `
      function even_or_odd(number) {
        // Your logic goes here...
      }
      `,
        `
      function even_or_odd(number) {
        if (number % 2 === 0) {
          return 'even'
        }
      }
      `,
        `
      function even_or_odd(number) {
        if (number % 2 === 0) {
          return 'even'
        } else {
          return 'odd'
        }
      }
      `
      ],
      categoryId: 8,
      difficultyId: 1
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
