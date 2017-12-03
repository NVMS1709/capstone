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
  Forum,
  Company
} = require('../server/db/models')

async function seed() {
  let userIdsObj = {}
  let forumIdsObj = {}
  let companyIdsObj = {}
  let categoryIdsObj = {}
  let difficultyIdsObj = {}

  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const companies = await Promise.all([
    Company.create({
      name: 'Google',
      description:
        'Google LLC is an American multinational technology company that specializes in Internet-related services and products. These include online advertising technologies, search, cloud computing, software, and hardware.'
    }),
    Company.create({
      name: `Facebook`,
      description: `Facebook is a popular social networking website that allows registered users to create profiles, upload photos and video, send messages and keep in touch with friends, family and colleagues.`
    }),
    Company.create({
      name: 'Microsoft',
      description: `Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and services.`
    })
  ]).then(companiesArr => {
    companiesArr.forEach(company => {
      companyIdsObj[company.name] = company.id
    })
    return companiesArr
  })

  console.log('User Ids Obj', companyIdsObj)

  console.log(`seeded ${companies.length} users`)

  const users = await Promise.all([
    User.create({
      name: 'admin',
      email: 'admin@email.com',
      password: '123',
      questionsSolved: [1, 4, 6, 8]
    }),
    User.create({ name: 'cody', email: 'cody@email.com', password: '123' }),
    User.create({ name: 'murphy', email: 'murphy@email.com', password: '123' })
  ]).then(usersArr => {
    usersArr.forEach(user => {
      userIdsObj[user.name] = user.id
    })
    return usersArr
  })

  console.log('User Ids Obj', userIdsObj)

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
  ]).then(forumsArr => {
    forumsArr.forEach(forum => {
      forumIdsObj[forum.name] = forum.id
    })
    return forumsArr
  })

  console.log('Forum Ids Obj', forumIdsObj)

  console.log(`seeded ${forums.length} forums`)

  const categories = await Promise.all([
    Category.create({
      name: 'Arrays',
      description:
        'Array data structure is a data structure consisting of a collection of elements (values or variables), each identified by at least one array index or key.'
    }),
    Category.create({
      name: 'Binary Search Trees',
      description:
        'Binary Search Tree is a node-based data structure in which each node has no more than two child nodes. Each child must either be a leaf node or the root of another binary search tree.'
    }),
    Category.create({
      name: 'Dynamic Programming',
      description:
        'Dynamic Programming is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.'
    }),
    Category.create({
      name: 'Graphs',
      description:
        'Graph data structure is set of items connected by edges. Each item is called a vertex or node. Formally, a graph is a set of vertices and a binary relation between vertices, adjacency.'
    }),
    Category.create({
      name: 'Heaps',
      description:
        'Heap"s algorithm generates all possible permutations of n objects'
    }),
    Category.create({
      name: 'Recursion',
      description:
        'Recursive algorithm is an algorithm which calls itself with "smaller (or simpler)" input values, and which obtains the result for the current input by applying simple operations to the returned value for the smaller (or simpler) input.'
    }),
    Category.create({
      name: 'Searching',
      description:
        'Search algorithm is the step-by-step procedure used to locate specific data among a collection of data.'
    }),
    Category.create({
      name: 'Sorting',
      description:
        'Sorting algorithm is an algorithm that puts elements of a list in a certain order.'
    }),
    Category.create({
      name: 'Stacks',
      description:
        'Stack is an ordered list in which all insertions and deletions are made at one end, called the top.'
    }),
    Category.create({
      name: 'Strings',
      description:
        'Strig algorithm tries to find a place where one or several strings (also called patterns) are found within a larger string or text. '
    }),
    Category.create({
      name: 'Puzzle',
      description: 'Mind teasing questions'
    })
  ]).then(categoriesArr => {
    categoriesArr.forEach(category => {
      categoryIdsObj[category.name] = category.id
    })
    return categoriesArr
  })

  console.log('Category Ids Obj', categoryIdsObj)

  console.log(`seeded ${categories.length} categories`)

  const difficulties = await Promise.all([
    Difficulty.create({ name: 'easy' }),
    Difficulty.create({ name: 'medium' }),
    Difficulty.create({ name: 'difficult' })
  ]).then(difficultiesArr => {
    difficultiesArr.forEach(difficulty => {
      difficultyIdsObj[difficulty.name] = difficulty.id
    })
    return difficultiesArr
  })

  console.log('Difficulty Ids Obj', difficultyIdsObj)

  console.log(`seeded ${difficulties.length} difficulties`)

  const questions = await Promise.all([
    Question.create({
      name: 'BST Construction',
      userId: userIdsObj.admin,
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
      categoryId: categoryIdsObj['Binary Search Trees'],
      difficultyId: difficultyIdsObj.medium,
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
    unittest.main(verbosity=2)
      `,
      jsWalkThrough: [
        `JS Walkthrough: Function: 'BST'
        .  Create a class function called 'BST.'
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
      userId: userIdsObj.admin,
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
      pythonSolution: `
def inOrderTraverse(tree, array):
    if tree is not None:
        inOrderTraverse(tree.left, array)
        array.append(tree.value)
        inOrderTraverse(tree.right, array)
    return array
      `,
      categoryId: categoryIdsObj['Binary Search Trees'],
      difficultyId: difficultyIdsObj.easy,
      functionName: 'inOrderTraverse, preOrderTraverse, postOrderTraverse',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect;

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
      }

      const test1 = new BST(10).insert(5).insert(15);

      const test2 = new BST(10).insert(5).insert(15).insert(5).insert(2).insert(1).insert(22);

      const test3 = new BST(100).insert(5).insert(15).insert(5).insert(2).insert(1).insert(22)
      .insert(1).insert(1).insert(3).insert(1).insert(1).insert(502).insert(55000)
      .insert(204).insert(205).insert(207).insert(206).insert(208).insert(203);

      it('Test Case #1', function() {
        chai.expect(inOrderTraverse(test1, [])).to.deep.equal([5, 10, 15]);
      });

      it('Test Case #2', function() {
        chai.expect(inOrderTraverse(test2, [])).to.deep.equal([1, 2, 5, 5, 10, 15, 22]);
      });

      it('Test Case #3', function() {
        chai.expect(inOrderTraverse(test3, [])).to.deep.equal([1, 1, 1, 1, 1, 2, 3, 5, 5, 15, 22, 100, 203, 204, 205, 206, 207, 208, 502, 55000]);
      });

      it('Test Case #4', function() {
        chai.expect(preOrderTraverse(test1, [])).to.deep.equal([10, 5, 15]);
      });

      it('Test Case #5', function() {
        chai.expect(preOrderTraverse(test2, [])).to.deep.equal([10, 5, 2, 1, 5, 15, 22]);
      });

      it('Test Case #6', function() {
        chai.expect(preOrderTraverse(test3, [])).to.deep.equal([100, 5, 2, 1, 1, 1, 1, 1, 3, 15, 5, 22, 502, 204, 203, 205, 207, 206, 208, 55000]);
      });

      it('Test Case #7', function() {
        chai.expect(postOrderTraverse(test1, [])).to.deep.equal([5, 15, 10]);
      });

      it('Test Case #8', function() {
        chai.expect(postOrderTraverse(test2, [])).to.deep.equal([1, 2, 5, 5, 22, 15, 10]);
      });

      it('Test Case #9', function() {
        chai.expect(postOrderTraverse(test3, [])).to.deep.equal([1, 1, 1, 1, 1, 3, 2, 5, 22, 15, 5, 203, 206, 208, 207, 205, 204, 55000, 502, 100]);
      });
      `,
      pythonTestFile: `
import program
import unittest

class BST:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        if value < self.value:
            if self.left is None:
                self.left = BST(value)
            else:
                self.left.insert(value)
        else:
            if self.right is None:
                self.right = BST(value)
            else:
                self.right.insert(value)
        return self

test1 = BST(10).insert(5).insert(15)

test2 = BST(10).insert(5).insert(15).insert(5).insert(2).insert(1).insert(22)

test3 = BST(100).insert(5).insert(15).insert(5).insert(2).insert(1).insert(22) \
.insert(1).insert(1).insert(3).insert(1).insert(1).insert(502).insert(55000) \
.insert(204).insert(205).insert(207).insert(206).insert(208).insert(203)


class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.inOrderTraverse(test1, []), [5, 10, 15])

	def test_case_2(self):
		self.assertEqual(program.inOrderTraverse(test2, []), [1, 2, 5, 5, 10, 15, 22])

	def test_case_3(self):
		self.assertEqual(program.inOrderTraverse(test3, []), [1, 1, 1, 1, 1, 2, 3, 5, 5, 15, 22, 100, 203, 204, 205, 206, 207, 208, 502, 55000])

	def test_case_4(self):
		self.assertEqual(program.preOrderTraverse(test1, []), [10, 5, 15])

	def test_case_5(self):
		self.assertEqual(program.preOrderTraverse(test2, []), [10, 5, 2, 1, 5, 15, 22])

	def test_case_6(self):
		self.assertEqual(program.preOrderTraverse(test3, []), [100, 5, 2, 1, 1, 1, 1, 1, 3, 15, 5, 22, 502, 204, 203, 205, 207, 206, 208, 55000])

	def test_case_7(self):
		self.assertEqual(program.postOrderTraverse(test1, []), [5, 15, 10])

	def test_case_8(self):
		self.assertEqual(program.postOrderTraverse(test2, []), [1, 2, 5, 5, 22, 15, 10])

	def test_case_9(self):
		self.assertEqual(program.postOrderTraverse(test3, []), [1, 1, 1, 1, 1, 3, 2, 5, 22, 15, 5, 203, 206, 208, 207, 205, 204, 55000, 502, 100])


if __name__ == "__main__":
	unittest.main(verbosity=2)
`
    }),
    Question.create({
      name: 'Duplicates',
      published: true,
      functionName: 'duplicatesHash',
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Facebook,
      description:
        'Write a function named "duplicatesHash" that finds all duplicates in an array.  The array should only contain integers.  Attempt to utilize a hash table to store each element as we go throguh the array.',
      javascriptSolution: `
function duplicatesHash(arr) {
  var hashTable = [];
  var dups = [];
  for (var i = 0; i < arr.length; i++) {
    if (hashTable[arr[i].toString()] === undefined) {
      hashTable[arr[i].toString()] = true;
    }
    else { dups.push(arr[i]); }
  }
  return dups;
}`,
      pythonSolution: `
def duplicatesHash(arr):

    # our hash table to store each element
    # in the list as we pass through it
    hashTable = {}
    # store duplicates
    dups = []
    # check each element in the array
    for i in range(0, len(arr)):
    # if element does not exist in hash table
    # then insert it
        if arr[i] not in hashTable:
            hashTable[arr[i]] = True
    # if element does exist in hash table
    # then we know it is a duplicate
        else:
            dups.append(arr[i])
    return dups
      `,
      javascriptTestFile: `
const chai = require('chai')
  let expect = chai.expect

  describe('Find Duplicate', function() {
    it('Test Case #1', function() {
        let result = duplicatesHash([1, 21, -4, 103, 21, 4, 1])
      expect(result.sort()).to.deep.equal([1, 21])
    })

    it('Test Case #2', function() {
      let result = duplicatesHash([2, 24, 52, -103, -21, 24, 1])
      expect(result.sort()).to.deep.equal([24])
    })

    it('Test Case #3', function() {
      let result = duplicatesHash([
        473,
        572,
        1118,
        4848,
        4911,
        10,
        -31,
        -41,
        3450,
        -25251,
        12451425,
        64,
        13,
        572,
        592,
        473
      ])
      expect(result.sort()).to.deep.equal([473, 572])
    })

    it('Test Case #4', function() {
      let result = duplicatesHash([355, 24, 52, 1311, -21, -52, -24, 1])
      expect(result.sort()).to.deep.equal([])
    })

    it('Test Case #5', function() {
      let result = duplicatesHash([355, 24, 52, 1311, -21, -52, -24, 1])
      expect(result.sort()).to.deep.equal([])
    })

    it('Test Case #6', function() {
      let result = duplicatesHash([
        57132,
        47343,
        57132,
        1323576,
        523672,
        48235748,
        49235711,
        1023572357,
        -323571,
        -41,
        34630,
        -25251,
        12425,
        623574,
        123643,
        523672,
        591732,
        34630,
        4723573
      ])
      expect(result.sort()).to.deep.equal([34630, 523672, 57132])
    })

    it('Test Case #7', function() {
      let result = duplicatesHash([
        1313,
        4246911,
        51312,
        1357288,
        99948,
        4246911,
        10,
        -324691,
        -4991,
        296450,
        -24921,
        999224645,
        26442964,
        2469913,
        5246972,
        269592,
        999224645,
        2469429473,
        10,
        -324691
      ])
      expect(result.sort()).to.deep.equal([-324691, 10, 4246911, 999224645])
    })

    it('Test Case #8', function() {
      let result = duplicatesHash([355, 355, 24, 52, 1311, -21, -52, -24, 1])
      expect(result.sort()).to.deep.equal([355])
    })

    it('Test Case #9', function() {
      let result = duplicatesHash([473, 572, 1118, 4848, 4911, 473])
      expect(result.sort()).to.deep.equal([473])
    })

    it('Test Case #10', function() {
      let result = duplicatesHash([
        2345,
        23,
        4578,
        2354,
        236,
        2356236236,
        235635,
        567,
        25623,
        56235,
        635,
        6,
        347,
        548,
        34,
        73,
        68,
        4578,
        3457,
        36,
        84,
        567,
        437,
        458
      ])
      expect(result.sort()).to.deep.equal([4578, 567])
    })
  })
`,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(program.duplicatesHash([1, 3, 6, 8, 33, 10, 13, 15, 17, 37, 33]), [33])

    def test_case_2(self):
        self.assertEqual(program.duplicatesHash([1, 3, 6, 8, 9, 22, 22, 22, 22, 13, 15, 17, 33, 37, 33]), [22, 22, 22, 33 ])

    def test_case_3(self):
        self.assertEqual(program.duplicatesHash([0, 0, -1, 8, -22, 22, 22, 22, 13, 15, -33, 33, 37, 33]), [0, 22, 22, 33])

    def test_case_4(self):
        self.assertEqual(program.duplicatesHash([0, 0, -1, 8, -22, 22, 22, 22, -0, -0, 'hello', 'hello', 15, -33, 33, 37, 33]), [0, 22, 22, 0, 0, 'hello', 33])

    def test_case_5(self):
        self.assertEqual(program.duplicatesHash([0, 0, -1, 8, 3, -22, 22, 22, 22, -0, -0, 'heLlo', 'hello', 15, -33, 33, 37, 33, 10 + 12, 30 + 3]), [0, 22, 22, 0, 0, 33, 22, 33])

    def test_case_6(self):
        self.assertEqual(program.duplicatesHash(['4', 4, 'Beautiful', int('4')]), [4])

    def test_case_7(self):
        self.assertEqual(program.duplicatesHash(['4', 4, 'Beautiful', float('4'), 23.5, -34.0, -34.0000]), [4.0, -34.0])

    def test_case_8(self):
        self.assertEqual(program.duplicatesHash(['4', 4, 'Beautiful', float('4'), 23.5, int(-34.0), int(-34.0000)]), [4.0, -34])

    def test_case_9(self):
        self.assertEqual(program.duplicatesHash(['4', 4, 'Beautiful', str('-0'), 0, 3423.5, int(-34.0), int(-34.0000)]), [-34])

if __name__ == "__main__":
    unittest.main(verbosity=2)
          `
    }),
    Question.create({
      name: 'Dutch Flag',
      published: true,
      description:
        'Create a function that will take an array.  This array should not contain any value outside of 0, 1 and 2.  The array can have any number of these stated values and the values can appear in any order.  The function should take the array and sort it in ascending order.  Example, the function is given the following array [ 0, 2, 2, 0, 1 ].  The return value of the function should be [ 0, 0, 1, 2, 2]',
      javascriptSolution: `
function swap(arr, i1, i2) {
  var temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
}

function dutchFlag(arr) {
  var low = 0
  var mid = 0
  var high = arr.length - 1
  while (mid <= high) {
    if (arr[mid] === 0) {
      swap(arr, low++, mid++)
    } else if (arr[mid] === 2) {
      swap(arr, mid, high--)
    } else if (arr[mid] === 1) {
        mid++
    }
  }

  return arr
}
`,
      pythonSolution: `
def swap(arr, i1, i2):
    temp = arr[i1]
    arr[i1] = arr[i2]
    arr[i2] = temp

def dutchFlag(arr):
    low = 0
    mid = 0
    high = len(arr) - 1

# one pass through the array swapping
# the necessary elements in place
    while mid <= high:
        if arr[mid] == 0:
            swap(arr, low, mid)
            low += 1
            mid += 1
        elif arr[mid] == 2:
            swap(arr, mid, high)
            high -= 1
        elif arr[mid] == 1:
            mid += 1
    return arr
      `,
      functionName: 'dutchFlag',
      javascriptTestFile: `
const chai = require('chai')
let expect = chai.expect

describe('Dutch Flag Sort', function() {
  it('Test Case #1', function() {
    let result = dutchFlag([2, 2, 0, 1, 0, 0, 1, 2])
    expect(result).to.deep.equal([0, 0, 0, 1, 1, 2, 2, 2])
  })

  it('Test Case #2', function() {
    let result = dutchFlag([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
    expect(result).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1])
  })

  it('Test Case #3', function() {
    let result = dutchFlag([1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1])
    expect(result).to.deep.equal([0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1])
  })

  it('Test Case #4', function() {
    let result = dutchFlag([2, 2, 0, 1, 1, 0, 1, 2])
    expect(result).to.deep.equal([0, 0, 1, 1, 1, 2, 2, 2])
  })

  it('Test Case #5', function() {
    let result = dutchFlag([2, 2, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2])
    expect(result).to.deep.equal([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2])
  })

  it('Test Case #6', function() {
    let result = dutchFlag([1, 1, 1, 1, 1, 2, 2, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 2])
    expect(result).to.deep.equal([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2])
  })

  it('Test Case #7', function() {
    let result = dutchFlag([2, 2, 0, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 1, 0, 0, 1, 2])
    expect(result).to.deep.equal([0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2])
  })

  it('Test Case #8', function() {
    let result = dutchFlag([2, 2, 0, 1, 1, 0, 1, 2, 2, 1, 0, 1, 1, 0, 2, 2, 1, 2])
    expect(result).to.deep.equal([0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2])
  })
})
`,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(program.dutchFlag([2, 2, 0, 1, 0, 0, 1, 2]), [0, 0, 0, 1, 1, 2, 2, 2])

    def test_case_2(self):
        self.assertEqual(program.dutchFlag([0, 1, 2, 2, 0, 1, 0]), [0, 0, 0, 1, 1, 2, 2])

    def test_case_3(self):
        self.assertEqual(program.dutchFlag([2, 1, 2, 2, 0, 1, 0, 0, 0, 1]), [0, 0, 0, 0, 1, 1, 1, 2, 2, 2])

    def test_case_4(self):
        self.assertEqual(program.dutchFlag([]), [])

    def test_case_5(self):
        self.assertEqual(program.dutchFlag([2, 0]), [0, 2])

    def test_case_6(self):
        self.assertEqual(program.dutchFlag([0, 0]), [0, 0])

    def test_case_7(self):
        self.assertEqual(program.dutchFlag([0, 0, 1, 2, 2, 1, 1, 0, 2, 1, 0, 0, 0, 0, 0, 2, 1, 1, 2, 0, 1, 2]), [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2])

if __name__ == "__main__":
    unittest.main(verbosity=2)
          `,
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Facebook
    }),
    Question.create({
      name: 'Merge Sort',
      published: true,
      description:
        'Write a function named "mergeSort". The idea behind this algorithm is that it combines two ordered arrays together',
      javascriptSolution: `
function mergeSort(array) {
  if(array.length < 2) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
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
`,
      pythonSolution: `
def mergeSort(nlist):
  if len(nlist)>1:
    mid = len(nlist)//2
    lefthalf = nlist[:mid]
    righthalf = nlist[mid:]

    mergeSort(lefthalf)
    mergeSort(righthalf)
    i=j=k=0
    while i < len(lefthalf) and j < len(righthalf):
        if lefthalf[i] < righthalf[j]:
            nlist[k]=lefthalf[i]
            i=i+1
        else:
            nlist[k]=righthalf[j]
            j=j+1
        k=k+1

    while i < len(lefthalf):
        nlist[k]=lefthalf[i]
        i=i+1
        k=k+1

    while j < len(righthalf):
        nlist[k]=righthalf[j]
        j=j+1
        k=k+1
  return nlist
`,
      functionName: 'mergeSort',
      javascriptTestFile: `
const chai = require('chai')
let expect = chai.expect

describe('Merge Sort(Top-Down Implemention)', function() {

  it('Test Case #1', function() {
    let result = mergeSort([])
    expect(result).to.deep.equal([])
  })

  it('Test Case #2', function () {
    let result = mergeSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8])
    expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('Test Case #3', function () {
    let result = mergeSort([8, 7, 6, 5, 4])
    expect(result).to.deep.equal([4, 5, 6, 7, 8])
  })

  it('Test Case #4', function () {
    let result = mergeSort([8, -7, 6, -5, 4])
    expect(result).to.deep.equal([-7, -5, 4, 6, 8])
  })

  it('Test Case #5', function () {
    let result = mergeSort([-1, -5, -22, -11, -7])
    expect(result).to.deep.equal([-22, -11, -7, -5, -1])
  })
})
`,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.mergeSort([3, 1, 6, 3, 7, 4, 9]), [1, 3, 3, 4, 6, 7, 9])

	def test_case_2(self):
		self.assertEqual(program.mergeSort([3, 1, -6, 3, -7, 4, 9, 2, -1, 3, 0]), [-7, -6, -1, 0, 1, 2, 3, 3, 3, 4, 9])

	def test_case_3(self):
	    self.assertEqual(program.mergeSort([3.0, 111, -6, 53, -7.3, 4, 9, 2, -10, 3, 2, 1, 2, 2,  0]), [-10, -7.3, -6, 0, 1, 2, 2, 2, 2, 3, 3.0, 4, 9, 53, 111])

	def test_case_4(self):
	    self.assertEqual(program.mergeSort([-9.00, 1, -336, 153, -7.3, 4, 2, 0, 2, 0, 2, -120, 13, 112, 111, 33332, 33332, 10]), [-336, -120, -9.0, -7.3, 0, 0, 1, 2, 2, 2, 4, 10, 13, 111, 112, 153, 33332, 33332])

	def test_case_5(self):
	    self.assertEqual(program.mergeSort([-9.00, 1, -336, 1753, -7.13, 14, 62, 150, 12, 0, 2, -1120, 13, 1412, 111, 333232, 333232, 10]), [-1120, -336, -9.0, -7.13, 0, 1, 2, 10, 12, 13, 14, 62, 111, 150, 1412, 1753, 333232, 333232])

if __name__ == "__main__":
	unittest.main(verbosity=2)
`,
      categoryId: categoryIdsObj.Sorting,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Selection Sort',
      published: true,
      description:
        'Write a function named "selectionSort" that takes in an array of integers and returns a sorted version of that array. Use the Selection Sort algorithm to sort the array.',
      javascriptSolution: `
function selectionSort(array) {
  for (let i = 0; i < array.length; i++) {
    let min = i;
    for(let j = i + 1; j < array.length; j++) {
      if(array[j] < array[min]) {
        min = j;
      }
    }
    if(i !== min) {
      [array[i], array[min]] = [array[min], array[i]];
    }
  }
  return array;
}
`,
      pythonSolution: `
def selectionSort(array):
  currentIdx = 0
  while currentIdx < len(array) - 1:
    smallestIdx = currentIdx
    for i in range(currentIdx + 1, len(array)):
        if array[smallestIdx] > array[i]:
            smallestIdx = i
    swap(currentIdx, smallestIdx, array)
    currentIdx += 1
  return array

def swap(i, j, array):
  array[i], array[j] = array[j], array[i]
`,
      functionName: 'selectionSort',
      javascriptTestFile: `
const chai = require('chai')
  let expect = chai.expect

  describe('Selection Sort', () => {

    it('Test Case #1', function() {
      let result = selectionSort([])
      expect(result).to.deep.equal([])
    })

    it('Test Case #2', function () {
      let result = selectionSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8])
      expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })

    it('Test Case #3', function () {
      let result = selectionSort([8, 7, 6, 5, 4])
      expect(result).to.deep.equal([4, 5, 6, 7, 8])
    })

    it('Test Case #4', function () {
      let result = selectionSort([8, -7, 6, -5, 4])
      expect(result).to.deep.equal([-7, -5, 4, 6, 8])
    })

    it('Test Case #5', function () {
      let result = selectionSort([-1, -5, -22, -11, -7])
      expect(result).to.deep.equal([-22, -11, -7, -5, -1])
    })
})
`,
      pythonTestFile: `
import program
import unittest


class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.selectionSort([1]), [1])

	def test_case_2(self):
		self.assertEqual(program.selectionSort([1, 2]), [1, 2])

	def test_case_3(self):
		self.assertEqual(program.selectionSort([2, 1]), [1, 2])

	def test_case_4(self):
		self.assertEqual(program.selectionSort([1, 3, 2]), [1, 2, 3])

	def test_case_5(self):
		self.assertEqual(program.selectionSort([3, 1, 2]), [1, 2, 3])

	def test_case_6(self):
		self.assertEqual(program.selectionSort([1, 2, 3]), [1, 2, 3])

	def test_case_7(self):
		self.assertEqual(program.selectionSort([-4, 5, 10, 8, -10, -6, -4, -2, -5, 3, 5, -4, -5, -1, 1, 6, -7, -6, -7, 8]), [-10, -7, -7, -6, -6, -5, -5, -4, -4, -4, -2, -1, 1, 3, 5, 5, 6, 8, 8, 10])

	def test_case_8(self):
		self.assertEqual(program.selectionSort([-7, 2, 3, 8, -10, 4, -6, -10, -2, -7, 10, 5, 2, 9, -9, -5, 3, 8]), [-10, -10, -9, -7, -7, -6, -5, -2, 2, 2, 3, 3, 4, 5, 8, 8, 9, 10])

	def test_case_9(self):
		self.assertEqual(program.selectionSort([8, -6, 7, 10, 8, -1, 6, 2, 4, -5, 1, 10, 8, -10, -9, -10, 8, 9, -2, 7, -2, 4]), [-10, -10, -9, -6, -5, -2, -2, -1, 1, 2, 4, 4, 6, 7, 7, 8, 8, 8, 8, 9, 10, 10])

	def test_case_10(self):
		self.assertEqual(program.selectionSort([5, -2, 2, -8, 3, -10, -6, -1, 2, -2, 9, 1, 1]), [-10, -8, -6, -2, -2, -1, 1, 1, 2, 2, 3, 5, 9])

	def test_case_11(self):
		self.assertEqual(program.selectionSort([2, -2, -6, -10, 10, 4, -8, -1, -8, -4, 7, -4, 0, 9, -9, 0, -9, -9, 8, 1, -4, 4, 8, 5, 1, 5, 0, 0, 2, -10]), [-10, -10, -9, -9, -9, -8, -8, -6, -4, -4, -4, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 4, 4, 5, 5, 7, 8, 8, 9, 10])

	def test_case_12(self):
		self.assertEqual(program.selectionSort([4, 1, 5, 0, -9, -3, -3, 9, 3, -4, -9, 8, 1, -3, -7, -4, -9, -1, -7, -2, -7, 4]), [-9, -9, -9, -7, -7, -7, -4, -4, -3, -3, -3, -2, -1, 0, 1, 1, 3, 4, 4, 5, 8, 9])

	def test_case_13(self):
		self.assertEqual(program.selectionSort([427, 787, 222, 996, -359, -614, 246, 230, 107, -706, 568, 9, -246, 12, -764, -212, -484, 603, 934, -848, -646, -991, 661, -32, -348, -474, -439, -56, 507, 736, 635, -171, -215, 564, -710, 710, 565, 892, 970, -755, 55, 821, -3, -153, 240, -160, -610, -583, -27, 131]), [-991, -848, -764, -755, -710, -706, -646, -614, -610, -583, -484, -474, -439, -359, -348, -246, -215, -212, -171, -160, -153, -56, -32, -27, -3, 9, 12, 55, 107, 131, 222, 230, 240, 246, 427, 507, 564, 565, 568, 603, 635, 661, 710, 736, 787, 821, 892, 934, 970, 996])

	def test_case_14(self):
		self.assertEqual(program.selectionSort([991, -731, -882, 100, 280, -43, 432, 771, -581, 180, -382, -998, 847, 80, -220, 680, 769, -75, -817, 366, 956, 749, 471, 228, -435, -269, 652, -331, -387, -657, -255, 382, -216, -6, -163, -681, 980, 913, -169, 972, -523, 354, 747, 805, 382, -827, -796, 372, 753, 519, 906]), [-998, -882, -827, -817, -796, -731, -681, -657, -581, -523, -435, -387, -382, -331, -269, -255, -220, -216, -169, -163, -75, -43, -6, 80, 100, 180, 228, 280, 354, 366, 372, 382, 382, 432, 471, 519, 652, 680, 747, 749, 753, 769, 771, 805, 847, 906, 913, 956, 972, 980, 991])

	def test_case_15(self):
		self.assertEqual(program.selectionSort([384, -67, 120, 759, 697, 232, -7, -557, -772, -987, 687, 397, -763, -86, -491, 947, 921, 421, 825, -679, 946, -562, -626, -898, 204, 776, -343, 393, 51, -796, -425, 31, 165, 975, -720, 878, -785, -367, -609, 662, -79, -112, -313, -94, 187, 260, 43, 85, -746, 612, 67, -389, 508, 777, 624, 993, -581, 34, 444, -544, 243, -995, 432, -755, -978, 515, -68, -559, 489, 732, -19, -489, 737, 924]), [-995, -987, -978, -898, -796, -785, -772, -763, -755, -746, -720, -679, -626, -609, -581, -562, -559, -557, -544, -491, -489, -425, -389, -367, -343, -313, -112, -94, -86, -79, -68, -67, -19, -7, 31, 34, 43, 51, 67, 85, 120, 165, 187, 204, 232, 243, 260, 384, 393, 397, 421, 432, 444, 489, 508, 515, 612, 624, 662, 687, 697, 732, 737, 759, 776, 777, 825, 878, 921, 924, 946, 947, 975, 993])

	def test_case_16(self):
		self.assertEqual(program.selectionSort([544, -578, 556, 713, -655, -359, -810, -731, 194, -531, -685, 689, -279, -738, 886, -54, -320, -500, 738, 445, -401, 993, -753, 329, -396, -924, -975, 376, 748, -356, 972, 459, 399, 669, -488, 568, -702, 551, 763, -90, -249, -45, 452, -917, 394, 195, -877, 153, 153, 788, 844, 867, 266, -739, 904, -154, -947, 464, 343, -312, 150, -656, 528, 61, 94, -581]), [-975, -947, -924, -917, -877, -810, -753, -739, -738, -731, -702, -685, -656, -655, -581, -578, -531, -500, -488, -401, -396, -359, -356, -320, -312, -279, -249, -154, -90, -54, -45, 61, 94, 150, 153, 153, 194, 195, 266, 329, 343, 376, 394, 399, 445, 452, 459, 464, 528, 544, 551, 556, 568, 669, 689, 713, 738, 748, 763, 788, 844, 867, 886, 904, 972, 993])

	def test_case_17(self):
		self.assertEqual(program.selectionSort([-19, 759, 168, 306, 270, -602, 558, -821, -599, 328, 753, -50, -568, 268, -92, 381, -96, 730, 629, 678, -837, 351, 896, 63, -85, 437, -453, -991, 294, -384, -628, -529, 518, 613, -319, -519, -220, -67, 834, 619, 802, 207, 946, -904, 295, 718, -740, -557, -560, 80, 296, -90, 401, 407, 798, 254, 154, 387, 434, 491, 228, 307, 268, 505, -415, -976, 676, -917, 937, -609, 593, -36, 881, 607, 121, -373, 915, -885, 879, 391, -158, 588, -641, -937, 986, 949, -321]), [-991, -976, -937, -917, -904, -885, -837, -821, -740, -641, -628, -609, -602, -599, -568, -560, -557, -529, -519, -453, -415, -384, -373, -321, -319, -220, -158, -96, -92, -90, -85, -67, -50, -36, -19, 63, 80, 121, 154, 168, 207, 228, 254, 268, 268, 270, 294, 295, 296, 306, 307, 328, 351, 381, 387, 391, 401, 407, 434, 437, 491, 505, 518, 558, 588, 593, 607, 613, 619, 629, 676, 678, 718, 730, 753, 759, 798, 802, 834, 879, 881, 896, 915, 937, 946, 949, 986])

	def test_case_18(self):
		self.assertEqual(program.selectionSort([-823, 164, 48, -987, 323, 399, -293, 183, -908, -376, 14, 980, 965, 842, 422, 829, 59, 724, -415, -733, 356, -855, -155, 52, 328, -544, -371, -160, -942, -51, 700, -363, -353, -359, 238, 892, -730, -575, 892, 490, 490, 995, 572, 888, -935, 919, -191, 646, -120, 125, -817, 341, -575, 372, -874, 243, 610, -36, -685, -337, -13, 295, 800, -950, -949, -257, 631, -542, 201, -796, 157, 950, 540, -846, -265, 746, 355, -578, -441, -254, -941, -738, -469, -167, -420, -126, -410, 59]), [-987, -950, -949, -942, -941, -935, -908, -874, -855, -846, -823, -817, -796, -738, -733, -730, -685, -578, -575, -575, -544, -542, -469, -441, -420, -415, -410, -376, -371, -363, -359, -353, -337, -293, -265, -257, -254, -191, -167, -160, -155, -126, -120, -51, -36, -13, 14, 48, 52, 59, 59, 125, 157, 164, 183, 201, 238, 243, 295, 323, 328, 341, 355, 356, 372, 399, 422, 490, 490, 540, 572, 610, 631, 646, 700, 724, 746, 800, 829, 842, 888, 892, 892, 919, 950, 965, 980, 995])

if __name__ == "__main__":
	unittest.main(verbosity=2)
`,
      categoryId: categoryIdsObj.Sorting,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Queue',
      published: true,
      description: `Write a class function named 'Queue' to implement the Queue Data Structure. It contains the following methods: enqueue(), dequeue(), peek(), and print(). enqueue adds elements to the data structure, dequeue removes elements from the data structure, peek shows the first values in the queue but doesn't remove it, and print will just log all of the values.`,
      javascriptSolution: `
class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(value) {
    this.queue.push(value);
  }

  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  length() {
    return this.queue.length;
  }

  print() {
    console.log(this.queue.join(' '));
  }
}
`,
      pythonSolution: `
`,
      functionName: 'Queue',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('Queue', function () {

        let queue
        beforeEach(function () {
          queue = new Queue()
        })

        describe('Enqueue Method', () => {
          beforeEach(() => {
            queue.enqueue(1)
            queue.enqueue(3)
            queue.enqueue(5)
            queue.enqueue(7)
          })

          it('Test Case #1', () => {
            expect(queue.queue.length).to.deep.equal(4)
          })

          it('Test Case #2', () => {
            const dequeued = queue.dequeue()

            expect(dequeued).to.deep.equal(1)
            expect(queue.queue[0]).to.deep.equal(3)
            expect(queue.queue[2]).to.deep.equal(7)
          })
        })

        describe('Dequeue Method', () => {
          beforeEach(() => {
            queue.enqueue(1)
            queue.enqueue(3)
            queue.enqueue(5)
          })

          it('Test Case #3', () => {
            expect(queue.dequeue()).to.deep.equal(1)
          })

          it('Test Case #4', () => {
            queue.dequeue()
            expect(queue.queue[0]).to.deep.equal(3)
            queue.dequeue()
            expect(queue.queue[0]).to.deep.equal(5)
          })

          it('Test Case #5', () => {
            queue.dequeue()
            queue.dequeue()
            queue.dequeue()
            expect(queue.dequeue()).to.deep.equal(undefined)
            expect(queue[0]).to.deep.equal(undefined)
          })
        })

        describe('Peek Method', () => {

          it('Test Case #6', () => {
            queue.enqueue(1)
            queue.enqueue(3)
            queue.enqueue(5)
            expect(queue.peek()).to.deep.equal(1)
            expect(queue.queue[0]).to.deep.equal(1)
          })

          it('Test Case #7', () => {
            expect(queue.peek()).to.deep.equal(undefined)
          })
        })

        describe('Length Method', () => {

          beforeEach(() => {
            queue.enqueue(1)
            queue.enqueue(3)
            queue.enqueue(5)
          })

          it('Test Case #8', () => {
            expect(queue.length()).to.deep.equal(3)
          })

          it('Test Case #9', () => {
            queue.dequeue()
            queue.dequeue()
            expect(queue.length()).to.deep.equal(1)
          })

          it('Test Case #10', () => {
            queue.dequeue()
            queue.dequeue()
            queue.dequeue()
            expect(queue.length()).to.deep.equal(0)
          })
        })

        describe('Print Method', () => {
          it('Test Case #11', () => {
            queue.enqueue(1)
            queue.enqueue(3)
            queue.enqueue(5)
            queue.enqueue(7)
            queue.print();
            expect(queue.queue).to.deep.equal([1, 3, 5, 7])
          })
        })
      })
      `,
      pythonTestFile: '',
      categoryId: categoryIdsObj.Queue,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Counting Steps',
      published: true,
      description:
        'Write a function named "countSteps" that will count the total number of ways someone can climb a particular set of stairs.  The function will take the total number of steps as a parameter.  In this situation the climber only moves up the steps and can climb 1 step or 2 steps at a time.  The function will return the total number of ways that they can climb the staircase.  For example, a staircase with only 3 steps can be climbed 3 different ways.  They can climb 1 step at a time.  They can climb 1 step and then 2 steps or they can climb 2 steps and then 2 step.',
      javascriptSolution: `function countSteps(N) {
        if (N === 1) {
          return 1
        }
        if (N === 2) {
          return 2
        }
        return countSteps(N - 1) + countSteps(N - 2)
      }`,
      pythonSolution: `
def countSteps(N):

    # just as in our solution explanation above, we know that to climb 1 step
    # there is only 1 solution, and for 2 steps there are 2 solutions
    if N == 1:
        return 1

    if N == 2:
        return 2

    # for all N > 2, we add the previous (N - 1) + (N - 2) steps to get
    # an answer recursively
    return countSteps(N - 1) + countSteps(N - 2)
      `,
      functionName: 'countSteps',
      javascriptTestFile: `const chai = require('chai')
      let expect = chai.expect

      describe('Power Set Solution', function() {
        it('Test Case #1', function() {
          let result = countSteps(6)
          expect(result).to.deep.equal(13)
        })

        it('Test Case #2', function() {
          let result = countSteps(13)
          expect(result).to.deep.equal(377)
        })

        it('Test Case #3', function() {
          let result = countSteps(1)
          expect(result).to.deep.equal(1)
        })

        it('Test Case #4', function() {
          let result = countSteps(23)
          expect(result).to.deep.equal(46368)
        })

        it('Test Case #5', function() {
          let result = countSteps(3)
          expect(result).to.deep.equal(3)
        })

        it('Test Case #6', function() {
          let result = countSteps(4)
          expect(result).to.deep.equal(5)
        })

        it('Test Case #7', function() {
          let result = countSteps(10)
          expect(result).to.deep.equal(89)
        })

        it('Test Case #8', function() {
          let result = countSteps(17)
          expect(result).to.deep.equal(2584)
        })

        it('Test Case #9', function() {
          let result = countSteps(15)
          expect(result).to.deep.equal(987)
        })

        it('Test Case #10', function() {
          let result = countSteps(20)
          expect(result).to.deep.equal(10946)
        })
      })
      `,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(program.countSteps(29), 832040)

    def test_case_2(self):
        self.assertEqual(program.countSteps(1), 1)

    def test_case_3(self):
        self.assertEqual(program.countSteps(32), 3524578)

    def test_case_4(self):
        self.assertEqual(program.countSteps(10), 89)

    def test_case_5(self):
        self.assertEqual(program.countSteps(18), 4181)

if __name__ == "__main__":
    unittest.main(verbosity=2)
          `,
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Google
    }),
    Question.create({
      name: 'Insert Interval',
      published: true,
      description:
        'Create a function named "instertInterval".  The input is a sorted list of disjoint intervals, and your goal is to insert a new interval and merge all necessary intervals returning a final new list. For example, if the interval list is [[1,5], [10,15], [20,25]] and you need to insert the interval [12,27], then your program should return the new list: [[1,5], [10,27]].',
      javascriptSolution: `function insertInterval(arr, interval) {
        var newSet = []
        var endSet = []
        var i = 0
        while (i < arr.length && arr[i][1] < interval[0]) {
          newSet.push(arr[i])
          i++
        }
        newSet.push(interval)
        while (i < arr.length) {
          var last = newSet[newSet.length - 1]
          if (arr[i][0] < last[1]) {
            var newInterval = [
              Math.min.apply(null, [last[0], arr[i][0]]),
              Math.max.apply(null, [last[1], arr[i][1]])
            ]
            newSet[newSet.length - 1] = newInterval
          } else {
            endSet.push(arr[i])
          }
          i++
        }
        return newSet.concat(endSet)
      }`,
      pythonSolution: `
def insertInterval(arr, interval):

    newSet = []
    endSet = []
    i = 0

    # add intervals that come before the new interval
    while i < len(arr) and arr[i][1] < interval[0]:
        newSet.append(arr[i])
        i += 1

    # add our new interval to this final list
    newSet.append(interval)

    # check each interval that comes after the new interval to determine if we can merge
    # if no merges are required then populate a list of the remaining intervals
    while i < len(arr):
        last = newSet[-1]
        if arr[i][0] < last[1]:
            newInterval = [min([last[0], arr[i][0]]), max([last[1], arr[i][1]])]
            newSet[-1] = newInterval
        else:
            endSet.append(arr[i])
        i += 1

    return newSet + endSet
      `,
      functionName: 'insertInterval',
      javascriptTestFile: `const chai = require('chai')
      let expect = chai.expect

      describe('Insert Interval Solution', function() {
        it('Test Case #1', function() {
          let result = insertInterval([[1, 5], [10, 15], [20, 25]], [12, 27])
          expect(result.length).to.deep.equal(2)
          expect(result).to.deep.equal([[1, 5], [10, 27]])
        })

        it('Test Case #2', function() {
          let result = insertInterval([[11, 55], [10, 15], [20, 55]], [11, 27])
          expect(result.length).to.deep.equal(1)
          expect(result).to.deep.equal([[10, 55]])
        })

        it('Test Case #3', function() {
          let result = insertInterval(
            [
              [13293602354, 99112002293553],
              [299321555, 3562903],
              [12493364, 62679651],
              [1926042, 261],
              [262923685, 112482],
              [20865, 86806],
              [6048, 86296942]
            ],
            [272, 8354]
          )
          expect(result.length).to.deep.equal(7)
          expect(result).to.deep.equal([
            [272, 86296942],
            [13293602354, 99112002293553],
            [299321555, 3562903],
            [12493364, 62679651],
            [1926042, 261],
            [262923685, 112482],
            [20865, 86806]
          ])
        })

        it('Test Case #4', function() {
          let result = insertInterval([[100, 54], [100, 15], [200, 250]], [12, 54])
          expect(result.length).to.deep.equal(4)
          expect(result).to.deep.equal([[12, 54], [100, 54], [100, 15], [200, 250]])
        })

        it('Test Case #5', function() {
          let result = insertInterval([[1, 5], [1, 5], [2, 2]], [2, 54])
          expect(result.length).to.deep.equal(1)
          expect(result).to.deep.equal([[1, 54]])
        })

        it('Test Case #6', function() {
          let result = insertInterval([[-100, -54], [-100, 15], [200, 250]], [12, 54])
          expect(result.length).to.deep.equal(3)
          expect(result).to.deep.equal([[-100, -54], [-100, 54], [200, 250]])
        })

        it('Test Case #7', function() {
          let result = insertInterval(
            [
              [132354, 1123553],
              [321555, 33],
              [13364, 679651],
              [1042, 61],
              [23685, 112482],
              [20865, 86806],
              [6048, 8642]
            ],
            [2, 54]
          )
          expect(result.length).to.deep.equal(8)
          expect(result).to.deep.equal([
            [2, 54],
            [132354, 1123553],
            [321555, 33],
            [13364, 679651],
            [1042, 61],
            [23685, 112482],
            [20865, 86806],
            [6048, 8642]
          ])
        })

        it('Test Case #8', function() {
          let result = insertInterval(
            [
              [134, 153],
              [325, 33],
              [134, 651],
              [162, 61],
              [235, 1122],
              [25, 86],
              [68, 862]
            ],
            [2, 54]
          )
          expect(result.length).to.deep.equal(6)
          expect(result).to.deep.equal([
            [2, 862],
            [134, 153],
            [325, 33],
            [134, 651],
            [162, 61],
            [235, 1122]
          ])
        })
      })
      `,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(program.insertInterval([[1,5],[10,15],[20,25]], [12,27]), [[1, 5], [10, 27]])

    def test_case_2(self):
        self.assertEqual(program.insertInterval([[6,7]], [1,9]), [[1, 9]])

    def test_case_3(self):
        self.assertEqual(program.insertInterval([[6,7]], [1,5]), [[1, 5], [6, 7]])

    def test_case_4(self):
        self.assertEqual(program.insertInterval([[1,5]], [6,7]), [[1, 5], [6, 7]])

    def test_case_5(self):
        self.assertEqual(program.insertInterval([[1,5],[6,11],[13,20],[40,50]], [12,19]), [[1, 5], [6, 11], [12, 20], [40, 50]])

    def test_case_6(self):
        self.assertEqual(program.insertInterval([[1,5],[6,11],[13,20],[25,30],[32,55]], [12,45]), [[1, 5], [6, 11], [12, 55]])

    def test_case_7(self):
        self.assertEqual(program.insertInterval([[1,5],[6,11],[20,22]], [24,45]), [[1, 5], [6, 11], [20, 22], [24, 45]])

if __name__ == "__main__":
    unittest.main(verbosity=2)
          `,
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Google
    }),
    Question.create({
      name: 'Power Set',
      published: true,
      description: `Create a function called powerSet.  The input for this function will be an array of numbers representing a set, which only contains unique numbers, and your goal is to print every possible set combination, otherwise known as the power set. For example:

      input set = [1, 2, 3]
      power set = [[], [1], [2], [3], [1, 2], [2, 3], [1, 3] [1, 2, 3]]

      The power set contains every possible combination of numbers. It also includes the empty set which contains no numbers from the original set.
      `,
      javascriptSolution: `function powerSet(arr) {
        var powers = []
        var total = Math.pow(2, arr.length)
        for (var i = 0; i < total; i++) {
          var tempSet = []
          var num = i.toString(2)
          while (num.length < arr.length) {
            num = '0' + num
          }
          for (var b = 0; b < num.length; b++) {
            if (num[b] === '1') {
              tempSet.push(arr[b])
            }
          }
          powers.push(tempSet)
        }
        return powers
      }`,
      pythonSolution: `
import math

def powerSet(arr):

    # the final power set
    powers = []

    # the total number of sets that the power set will contain
    total = int(math.pow(2, len(arr)))

    # loop through each value from 0 to 2^n
    for i in range(0, total):

        # our set that we add to the power set
        tempSet = []

        # convert the integer to binary
        num = "{0:b}".format(i)

        # pad the binary number so 1 becomes 001 for example
        while len(num) < len(arr):
            num = '0' + num

        # build the set that matches the 1's in the binary number
            for b in range(0, len(num)):
                if num[b] == '1':
                    tempSet.append(arr[b])
        # add this set to the final power set
        powers.append(tempSet)
    return powers
      `,
      functionName: 'powerSet',
      javascriptTestFile: `const chai = require('chai')
      let expect = chai.expect

      describe('Power Set Solution', function() {
        it('Test Case #1', function() {
          let result = powerSet([1, 2, 3])
          expect(result.length).to.deep.equal(8)
        })

        it('Test Case #2', function() {
          let result = powerSet([1, 1])
          expect(result.length).to.deep.equal(4)
          expect(result).to.deep.equal([[], [1], [1], [1, 1]])
        })

        it('Test Case #3', function() {
          let result = powerSet([21, 24, 3])
          expect(result.length).to.deep.equal(8)
          expect(result).to.deep.equal([
            [],
            [3],
            [24],
            [24, 3],
            [21],
            [21, 3],
            [21, 24],
            [21, 24, 3]
          ])
        })

        it('Test Case #4', function() {
          let result = powerSet([221, 2144, 31414])
          expect(result.length).to.deep.equal(8)
          expect(result).to.deep.equal([
            [],
            [31414],
            [2144],
            [2144, 31414],
            [221],
            [221, 31414],
            [221, 2144],
            [221, 2144, 31414]
          ])
        })

        it('Test Case #5', function() {
          let result = powerSet([28180505040421, 2123728144, 9999369396])
          expect(result.length).to.deep.equal(8)
          expect(result).to.deep.equal([
            [],
            [9999369396],
            [2123728144],
            [2123728144, 9999369396],
            [28180505040421],
            [28180505040421, 9999369396],
            [28180505040421, 2123728144],
            [28180505040421, 2123728144, 9999369396]
          ])
        })

        it('Test Case #6', function() {
          let result = powerSet([
            28180505040421,
            2123728144,
            9999369396,
            4824824,
            29249249185258
          ])
          expect(result.length).to.deep.equal(32)
          expect(result).to.deep.equal([
            [],
            [29249249185258],
            [4824824],
            [4824824, 29249249185258],
            [9999369396],
            [9999369396, 29249249185258],
            [9999369396, 4824824],
            [9999369396, 4824824, 29249249185258],
            [2123728144],
            [2123728144, 29249249185258],
            [2123728144, 4824824],
            [2123728144, 4824824, 29249249185258],
            [2123728144, 9999369396],
            [2123728144, 9999369396, 29249249185258],
            [2123728144, 9999369396, 4824824],
            [2123728144, 9999369396, 4824824, 29249249185258],
            [28180505040421],
            [28180505040421, 29249249185258],
            [28180505040421, 4824824],
            [28180505040421, 4824824, 29249249185258],
            [28180505040421, 9999369396],
            [28180505040421, 9999369396, 29249249185258],
            [28180505040421, 9999369396, 4824824],
            [28180505040421, 9999369396, 4824824, 29249249185258],
            [28180505040421, 2123728144],
            [28180505040421, 2123728144, 29249249185258],
            [28180505040421, 2123728144, 4824824],
            [28180505040421, 2123728144, 4824824, 29249249185258],
            [28180505040421, 2123728144, 9999369396],
            [28180505040421, 2123728144, 9999369396, 29249249185258],
            [28180505040421, 2123728144, 9999369396, 4824824],
            [28180505040421, 2123728144, 9999369396, 4824824, 29249249185258]
          ])
        })

        it('Test Case #7', function() {
          let result = powerSet([
            28180505040421,
            2123728144,
            9999369396,
            4824824,
            29249249185258
          ])
          expect(result.length).to.deep.equal(32)
          expect(result).to.deep.equal([
            [],
            [29249249185258],
            [4824824],
            [4824824, 29249249185258],
            [9999369396],
            [9999369396, 29249249185258],
            [9999369396, 4824824],
            [9999369396, 4824824, 29249249185258],
            [2123728144],
            [2123728144, 29249249185258],
            [2123728144, 4824824],
            [2123728144, 4824824, 29249249185258],
            [2123728144, 9999369396],
            [2123728144, 9999369396, 29249249185258],
            [2123728144, 9999369396, 4824824],
            [2123728144, 9999369396, 4824824, 29249249185258],
            [28180505040421],
            [28180505040421, 29249249185258],
            [28180505040421, 4824824],
            [28180505040421, 4824824, 29249249185258],
            [28180505040421, 9999369396],
            [28180505040421, 9999369396, 29249249185258],
            [28180505040421, 9999369396, 4824824],
            [28180505040421, 9999369396, 4824824, 29249249185258],
            [28180505040421, 2123728144],
            [28180505040421, 2123728144, 29249249185258],
            [28180505040421, 2123728144, 4824824],
            [28180505040421, 2123728144, 4824824, 29249249185258],
            [28180505040421, 2123728144, 9999369396],
            [28180505040421, 2123728144, 9999369396, 29249249185258],
            [28180505040421, 2123728144, 9999369396, 4824824],
            [28180505040421, 2123728144, 9999369396, 4824824, 29249249185258]
          ])
        })
      })
      `,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

    def test_case_1(self):
        self.assertEqual(program.powerSet([1, 2, 3]), [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]])

    def test_case_2(self):
        self.assertEqual(program.powerSet([1, 2, 3, 8, 16, 100, 25]), [[], [25], [100], [100, 25], [16], [16, 25], [16, 100], [16, 100, 25], [8], [8, 25], [8, 100], [8, 100, 25], [8, 16], [8, 16, 25], [8, 16, 100], [8, 16, 100, 25], [3], [3, 25], [3, 100], [3, 100, 25], [3, 16], [3, 16, 25], [3, 16, 100], [3, 16, 100, 25], [3, 8], [3, 8, 25], [3, 8, 100], [3, 8, 100, 25], [3, 8, 16], [3, 8, 16, 25], [3, 8, 16, 100], [3, 8, 16, 100, 25], [2], [2, 25], [2, 100], [2, 100, 25], [2, 16], [2, 16, 25], [2, 16, 100], [2, 16, 100, 25], [2, 8], [2, 8, 25], [2, 8, 100], [2, 8, 100, 25], [2, 8, 16], [2, 8, 16, 25], [2, 8, 16, 100], [2, 8, 16, 100, 25], [2, 3], [2, 3, 25], [2, 3, 100], [2, 3, 100, 25], [2, 3, 16], [2, 3, 16, 25], [2, 3, 16, 100], [2, 3, 16, 100, 25], [2, 3, 8], [2, 3, 8, 25], [2, 3, 8, 100], [2, 3, 8, 100, 25], [2, 3, 8, 16], [2, 3, 8, 16, 25], [2, 3, 8, 16, 100], [2, 3, 8, 16, 100, 25], [1], [1, 25], [1, 100], [1, 100, 25], [1, 16], [1, 16, 25], [1, 16, 100], [1, 16, 100, 25], [1, 8], [1, 8, 25], [1, 8, 100], [1, 8, 100, 25], [1, 8, 16], [1, 8, 16, 25], [1, 8, 16, 100], [1, 8, 16, 100, 25], [1, 3], [1, 3, 25], [1, 3, 100], [1, 3, 100, 25], [1, 3, 16], [1, 3, 16, 25], [1, 3, 16, 100], [1, 3, 16, 100, 25], [1, 3, 8], [1, 3, 8, 25], [1, 3, 8, 100], [1, 3, 8, 100, 25], [1, 3, 8, 16], [1, 3, 8, 16, 25], [1, 3, 8, 16, 100], [1, 3, 8, 16, 100, 25], [1, 2], [1, 2, 25], [1, 2, 100], [1, 2, 100, 25], [1, 2, 16], [1, 2, 16, 25], [1, 2, 16, 100], [1, 2, 16, 100, 25], [1, 2, 8], [1, 2, 8, 25], [1, 2, 8, 100], [1, 2, 8, 100, 25], [1, 2, 8, 16], [1, 2, 8, 16, 25], [1, 2, 8, 16, 100], [1, 2, 8, 16, 100, 25], [1, 2, 3], [1, 2, 3, 25], [1, 2, 3, 100], [1, 2, 3, 100, 25], [1, 2, 3, 16], [1, 2, 3, 16, 25], [1, 2, 3, 16, 100], [1, 2, 3, 16, 100, 25], [1, 2, 3, 8], [1, 2, 3, 8, 25], [1, 2, 3, 8, 100], [1, 2, 3, 8, 100, 25], [1, 2, 3, 8, 16], [1, 2, 3, 8, 16, 25], [1, 2, 3, 8, 16, 100], [1, 2, 3, 8, 16, 100, 25]])

    def test_case_3(self):
        self.assertEqual(program.powerSet([-2, 2, -3, 8, 16, 62]), [[], [62], [16], [16, 62], [8], [8, 62], [8, 16], [8, 16, 62], [-3], [-3, 62], [-3, 16], [-3, 16, 62], [-3, 8], [-3, 8, 62], [-3, 8, 16], [-3, 8, 16, 62], [2], [2, 62], [2, 16], [2, 16, 62], [2, 8], [2, 8, 62], [2, 8, 16], [2, 8, 16, 62], [2, -3], [2, -3, 62], [2, -3, 16], [2, -3, 16, 62], [2, -3, 8], [2, -3, 8, 62], [2, -3, 8, 16], [2, -3, 8, 16, 62], [-2], [-2, 62], [-2, 16], [-2, 16, 62], [-2, 8], [-2, 8, 62], [-2, 8, 16], [-2, 8, 16, 62], [-2, -3], [-2, -3, 62], [-2, -3, 16], [-2, -3, 16, 62], [-2, -3, 8], [-2, -3, 8, 62], [-2, -3, 8, 16], [-2, -3, 8, 16, 62], [-2, 2], [-2, 2, 62], [-2, 2, 16], [-2, 2, 16, 62], [-2, 2, 8], [-2, 2, 8, 62], [-2, 2, 8, 16], [-2, 2, 8, 16, 62], [-2, 2, -3], [-2, 2, -3, 62], [-2, 2, -3, 16], [-2, 2, -3, 16, 62], [-2, 2, -3, 8], [-2, 2, -3, 8, 62], [-2, 2, -3, 8, 16], [-2, 2, -3, 8, 16, 62]])

    def test_case_4(self):
        self.assertEqual(program.powerSet([-2, 0, -3, 8, 16, 62, 1, 0]), [[], [0], [1], [1, 0], [62], [62, 0], [62, 1], [62, 1, 0], [16], [16, 0], [16, 1], [16, 1, 0], [16, 62], [16, 62, 0], [16, 62, 1], [16, 62, 1, 0], [8], [8, 0], [8, 1], [8, 1, 0], [8, 62], [8, 62, 0], [8, 62, 1], [8, 62, 1, 0], [8, 16], [8, 16, 0], [8, 16, 1], [8, 16, 1, 0], [8, 16, 62], [8, 16, 62, 0], [8, 16, 62, 1], [8, 16, 62, 1, 0], [-3], [-3, 0], [-3, 1], [-3, 1, 0], [-3, 62], [-3, 62, 0], [-3, 62, 1], [-3, 62, 1, 0], [-3, 16], [-3, 16, 0], [-3, 16, 1], [-3, 16, 1, 0], [-3, 16, 62], [-3, 16, 62, 0], [-3, 16, 62, 1], [-3, 16, 62, 1, 0], [-3, 8], [-3, 8, 0], [-3, 8, 1], [-3, 8, 1, 0], [-3, 8, 62], [-3, 8, 62, 0], [-3, 8, 62, 1], [-3, 8, 62, 1, 0], [-3, 8, 16], [-3, 8, 16, 0], [-3, 8, 16, 1], [-3, 8, 16, 1, 0], [-3, 8, 16, 62], [-3, 8, 16, 62, 0], [-3, 8, 16, 62, 1], [-3, 8, 16, 62, 1, 0], [0], [0, 0], [0, 1], [0, 1, 0], [0, 62], [0, 62, 0], [0, 62, 1], [0, 62, 1, 0], [0, 16], [0, 16, 0], [0, 16, 1], [0, 16, 1, 0], [0, 16, 62], [0, 16, 62, 0], [0, 16, 62, 1], [0, 16, 62, 1, 0], [0, 8], [0, 8, 0], [0, 8, 1], [0, 8, 1, 0], [0, 8, 62], [0, 8, 62, 0], [0, 8, 62, 1], [0, 8, 62, 1, 0], [0, 8, 16], [0, 8, 16, 0], [0, 8, 16, 1], [0, 8, 16, 1, 0], [0, 8, 16, 62], [0, 8, 16, 62, 0], [0, 8, 16, 62, 1], [0, 8, 16, 62, 1, 0], [0, -3], [0, -3, 0], [0, -3, 1], [0, -3, 1, 0], [0, -3, 62], [0, -3, 62, 0], [0, -3, 62, 1], [0, -3, 62, 1, 0], [0, -3, 16], [0, -3, 16, 0], [0, -3, 16, 1], [0, -3, 16, 1, 0], [0, -3, 16, 62], [0, -3, 16, 62, 0], [0, -3, 16, 62, 1], [0, -3, 16, 62, 1, 0], [0, -3, 8], [0, -3, 8, 0], [0, -3, 8, 1], [0, -3, 8, 1, 0], [0, -3, 8, 62], [0, -3, 8, 62, 0], [0, -3, 8, 62, 1], [0, -3, 8, 62, 1, 0], [0, -3, 8, 16], [0, -3, 8, 16, 0], [0, -3, 8, 16, 1], [0, -3, 8, 16, 1, 0], [0, -3, 8, 16, 62], [0, -3, 8, 16, 62, 0], [0, -3, 8, 16, 62, 1], [0, -3, 8, 16, 62, 1, 0], [-2], [-2, 0], [-2, 1], [-2, 1, 0], [-2, 62], [-2, 62, 0], [-2, 62, 1], [-2, 62, 1, 0], [-2, 16], [-2, 16, 0], [-2, 16, 1], [-2, 16, 1, 0], [-2, 16, 62], [-2, 16, 62, 0], [-2, 16, 62, 1], [-2, 16, 62, 1, 0], [-2, 8], [-2, 8, 0], [-2, 8, 1], [-2, 8, 1, 0], [-2, 8, 62], [-2, 8, 62, 0], [-2, 8, 62, 1], [-2, 8, 62, 1, 0], [-2, 8, 16], [-2, 8, 16, 0], [-2, 8, 16, 1], [-2, 8, 16, 1, 0], [-2, 8, 16, 62], [-2, 8, 16, 62, 0], [-2, 8, 16, 62, 1], [-2, 8, 16, 62, 1, 0], [-2, -3], [-2, -3, 0], [-2, -3, 1], [-2, -3, 1, 0], [-2, -3, 62], [-2, -3, 62, 0], [-2, -3, 62, 1], [-2, -3, 62, 1, 0], [-2, -3, 16], [-2, -3, 16, 0], [-2, -3, 16, 1], [-2, -3, 16, 1, 0], [-2, -3, 16, 62], [-2, -3, 16, 62, 0], [-2, -3, 16, 62, 1], [-2, -3, 16, 62, 1, 0], [-2, -3, 8], [-2, -3, 8, 0], [-2, -3, 8, 1], [-2, -3, 8, 1, 0], [-2, -3, 8, 62], [-2, -3, 8, 62, 0], [-2, -3, 8, 62, 1], [-2, -3, 8, 62, 1, 0], [-2, -3, 8, 16], [-2, -3, 8, 16, 0], [-2, -3, 8, 16, 1], [-2, -3, 8, 16, 1, 0], [-2, -3, 8, 16, 62], [-2, -3, 8, 16, 62, 0], [-2, -3, 8, 16, 62, 1], [-2, -3, 8, 16, 62, 1, 0], [-2, 0], [-2, 0, 0], [-2, 0, 1], [-2, 0, 1, 0], [-2, 0, 62], [-2, 0, 62, 0], [-2, 0, 62, 1], [-2, 0, 62, 1, 0], [-2, 0, 16], [-2, 0, 16, 0], [-2, 0, 16, 1], [-2, 0, 16, 1, 0], [-2, 0, 16, 62], [-2, 0, 16, 62, 0], [-2, 0, 16, 62, 1], [-2, 0, 16, 62, 1, 0], [-2, 0, 8], [-2, 0, 8, 0], [-2, 0, 8, 1], [-2, 0, 8, 1, 0], [-2, 0, 8, 62], [-2, 0, 8, 62, 0], [-2, 0, 8, 62, 1], [-2, 0, 8, 62, 1, 0], [-2, 0, 8, 16], [-2, 0, 8, 16, 0], [-2, 0, 8, 16, 1], [-2, 0, 8, 16, 1, 0], [-2, 0, 8, 16, 62], [-2, 0, 8, 16, 62, 0], [-2, 0, 8, 16, 62, 1], [-2, 0, 8, 16, 62, 1, 0], [-2, 0, -3], [-2, 0, -3, 0], [-2, 0, -3, 1], [-2, 0, -3, 1, 0], [-2, 0, -3, 62], [-2, 0, -3, 62, 0], [-2, 0, -3, 62, 1], [-2, 0, -3, 62, 1, 0], [-2, 0, -3, 16], [-2, 0, -3, 16, 0], [-2, 0, -3, 16, 1], [-2, 0, -3, 16, 1, 0], [-2, 0, -3, 16, 62], [-2, 0, -3, 16, 62, 0], [-2, 0, -3, 16, 62, 1], [-2, 0, -3, 16, 62, 1, 0], [-2, 0, -3, 8], [-2, 0, -3, 8, 0], [-2, 0, -3, 8, 1], [-2, 0, -3, 8, 1, 0], [-2, 0, -3, 8, 62], [-2, 0, -3, 8, 62, 0], [-2, 0, -3, 8, 62, 1], [-2, 0, -3, 8, 62, 1, 0], [-2, 0, -3, 8, 16], [-2, 0, -3, 8, 16, 0], [-2, 0, -3, 8, 16, 1], [-2, 0, -3, 8, 16, 1, 0], [-2, 0, -3, 8, 16, 62], [-2, 0, -3, 8, 16, 62, 0], [-2, 0, -3, 8, 16, 62, 1], [-2, 0, -3, 8, 16, 62, 1, 0]])

    def test_case_5(self):
        self.assertEqual(program.powerSet([-2, -2, -2, 8, -0]), [[], [0], [8], [8, 0], [-2], [-2, 0], [-2, 8], [-2, 8, 0], [-2], [-2, 0], [-2, 8], [-2, 8, 0], [-2, -2], [-2, -2, 0], [-2, -2, 8], [-2, -2, 8, 0], [-2], [-2, 0], [-2, 8], [-2, 8, 0], [-2, -2], [-2, -2, 0], [-2, -2, 8], [-2, -2, 8, 0], [-2, -2], [-2, -2, 0], [-2, -2, 8], [-2, -2, 8, 0], [-2, -2, -2], [-2, -2, -2, 0], [-2, -2, -2, 8], [-2, -2, -2, 8, 0]])

if __name__ == "__main__":
    unittest.main(verbosity=2)
          `,
      categoryId: categoryIdsObj.Array,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Google
    }),
    Question.create({
      name: 'Bubble Sort',
      published: true,
      description: `Write a function named "bubbleSort" that takes in an unsorted array and return a sorted array. Use the Selection Sort algorithm to sort the array.`,
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
      pythonSolution: `
def bubbleSort(array):
    # Write your code here.
    isSorted = False
    counter = len(array)
    while not isSorted:
        isSorted = True
        for i in range(counter - 1):
            if array[i] > array[i+1]:
                isSorted = False
                array[i], array[i+1] = array[i+1], array[i]
        counter -= 1
    return array
`,
      functionName: 'bubbleSort',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect;

      describe('Solution for bubble sort', () => {
          let bubble_sort_func

          beforeEach(() => {
              bubble_sort_func = bubbleSort
          })

          it('Test Case #1', () => {
              let result = bubble_sort_func([3, 7, 2, 1, 8])
              expect(result).to.deep.equal([1,2,3,7,8])
          })

          it('Test Case #2', () => {
              let result = bubble_sort_func([1,2,3])
              expect(result).to.deep.equal([1,2,3])
          })

          it('Test Case #3', () => {
            let result = bubble_sort_func([5, -6, 9, -2])
            expect(result).to.deep.equal([-6, -2, 5, 9])
          })

          it('Test Case #4', () => {
            let result = bubble_sort_func([-3, -5, -2, -8])
            expect(result).to.deep.equal([-8, -5, -3, -2])
          })

          it('Test Case #5', () => {
            let result = bubble_sort_func([2, 5, 5, 3, 8, 3])
            expect(result).to.deep.equal([2, 3, 3, 5, 5, 8])
          })
      })`,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.bubbleSort([1]), [1])

	def test_case_2(self):
		self.assertEqual(program.bubbleSort([1, 2]), [1, 2])

	def test_case_3(self):
		self.assertEqual(program.bubbleSort([2, 1]), [1, 2])

	def test_case_4(self):
		self.assertEqual(program.bubbleSort([1, 3, 2]), [1, 2, 3])

	def test_case_5(self):
		self.assertEqual(program.bubbleSort([3, 1, 2]), [1, 2, 3])

	def test_case_6(self):
		self.assertEqual(program.bubbleSort([1, 2, 3]), [1, 2, 3])

	def test_case_7(self):
		self.assertEqual(program.bubbleSort([-4, 5, 10, 8, -10, -6, -4, -2, -5, 3, 5, -4, -5, -1, 1, 6, -7, -6, -7, 8]), [-10, -7, -7, -6, -6, -5, -5, -4, -4, -4, -2, -1, 1, 3, 5, 5, 6, 8, 8, 10])

	def test_case_8(self):
		self.assertEqual(program.bubbleSort([-7, 2, 3, 8, -10, 4, -6, -10, -2, -7, 10, 5, 2, 9, -9, -5, 3, 8]), [-10, -10, -9, -7, -7, -6, -5, -2, 2, 2, 3, 3, 4, 5, 8, 8, 9, 10])

	def test_case_9(self):
		self.assertEqual(program.bubbleSort([8, -6, 7, 10, 8, -1, 6, 2, 4, -5, 1, 10, 8, -10, -9, -10, 8, 9, -2, 7, -2, 4]), [-10, -10, -9, -6, -5, -2, -2, -1, 1, 2, 4, 4, 6, 7, 7, 8, 8, 8, 8, 9, 10, 10])

	def test_case_10(self):
		self.assertEqual(program.bubbleSort([5, -2, 2, -8, 3, -10, -6, -1, 2, -2, 9, 1, 1]), [-10, -8, -6, -2, -2, -1, 1, 1, 2, 2, 3, 5, 9])

	def test_case_11(self):
		self.assertEqual(program.bubbleSort([2, -2, -6, -10, 10, 4, -8, -1, -8, -4, 7, -4, 0, 9, -9, 0, -9, -9, 8, 1, -4, 4, 8, 5, 1, 5, 0, 0, 2, -10]), [-10, -10, -9, -9, -9, -8, -8, -6, -4, -4, -4, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 4, 4, 5, 5, 7, 8, 8, 9, 10])

	def test_case_12(self):
		self.assertEqual(program.bubbleSort([4, 1, 5, 0, -9, -3, -3, 9, 3, -4, -9, 8, 1, -3, -7, -4, -9, -1, -7, -2, -7, 4]), [-9, -9, -9, -7, -7, -7, -4, -4, -3, -3, -3, -2, -1, 0, 1, 1, 3, 4, 4, 5, 8, 9])

	def test_case_13(self):
		self.assertEqual(program.bubbleSort([427, 787, 222, 996, -359, -614, 246, 230, 107, -706, 568, 9, -246, 12, -764, -212, -484, 603, 934, -848, -646, -991, 661, -32, -348, -474, -439, -56, 507, 736, 635, -171, -215, 564, -710, 710, 565, 892, 970, -755, 55, 821, -3, -153, 240, -160, -610, -583, -27, 131]), [-991, -848, -764, -755, -710, -706, -646, -614, -610, -583, -484, -474, -439, -359, -348, -246, -215, -212, -171, -160, -153, -56, -32, -27, -3, 9, 12, 55, 107, 131, 222, 230, 240, 246, 427, 507, 564, 565, 568, 603, 635, 661, 710, 736, 787, 821, 892, 934, 970, 996])

	def test_case_14(self):
		self.assertEqual(program.bubbleSort([991, -731, -882, 100, 280, -43, 432, 771, -581, 180, -382, -998, 847, 80, -220, 680, 769, -75, -817, 366, 956, 749, 471, 228, -435, -269, 652, -331, -387, -657, -255, 382, -216, -6, -163, -681, 980, 913, -169, 972, -523, 354, 747, 805, 382, -827, -796, 372, 753, 519, 906]), [-998, -882, -827, -817, -796, -731, -681, -657, -581, -523, -435, -387, -382, -331, -269, -255, -220, -216, -169, -163, -75, -43, -6, 80, 100, 180, 228, 280, 354, 366, 372, 382, 382, 432, 471, 519, 652, 680, 747, 749, 753, 769, 771, 805, 847, 906, 913, 956, 972, 980, 991])

	def test_case_15(self):
		self.assertEqual(program.bubbleSort([384, -67, 120, 759, 697, 232, -7, -557, -772, -987, 687, 397, -763, -86, -491, 947, 921, 421, 825, -679, 946, -562, -626, -898, 204, 776, -343, 393, 51, -796, -425, 31, 165, 975, -720, 878, -785, -367, -609, 662, -79, -112, -313, -94, 187, 260, 43, 85, -746, 612, 67, -389, 508, 777, 624, 993, -581, 34, 444, -544, 243, -995, 432, -755, -978, 515, -68, -559, 489, 732, -19, -489, 737, 924]), [-995, -987, -978, -898, -796, -785, -772, -763, -755, -746, -720, -679, -626, -609, -581, -562, -559, -557, -544, -491, -489, -425, -389, -367, -343, -313, -112, -94, -86, -79, -68, -67, -19, -7, 31, 34, 43, 51, 67, 85, 120, 165, 187, 204, 232, 243, 260, 384, 393, 397, 421, 432, 444, 489, 508, 515, 612, 624, 662, 687, 697, 732, 737, 759, 776, 777, 825, 878, 921, 924, 946, 947, 975, 993])

	def test_case_16(self):
		self.assertEqual(program.bubbleSort([544, -578, 556, 713, -655, -359, -810, -731, 194, -531, -685, 689, -279, -738, 886, -54, -320, -500, 738, 445, -401, 993, -753, 329, -396, -924, -975, 376, 748, -356, 972, 459, 399, 669, -488, 568, -702, 551, 763, -90, -249, -45, 452, -917, 394, 195, -877, 153, 153, 788, 844, 867, 266, -739, 904, -154, -947, 464, 343, -312, 150, -656, 528, 61, 94, -581]), [-975, -947, -924, -917, -877, -810, -753, -739, -738, -731, -702, -685, -656, -655, -581, -578, -531, -500, -488, -401, -396, -359, -356, -320, -312, -279, -249, -154, -90, -54, -45, 61, 94, 150, 153, 153, 194, 195, 266, 329, 343, 376, 394, 399, 445, 452, 459, 464, 528, 544, 551, 556, 568, 669, 689, 713, 738, 748, 763, 788, 844, 867, 886, 904, 972, 993])

	def test_case_17(self):
		self.assertEqual(program.bubbleSort([-19, 759, 168, 306, 270, -602, 558, -821, -599, 328, 753, -50, -568, 268, -92, 381, -96, 730, 629, 678, -837, 351, 896, 63, -85, 437, -453, -991, 294, -384, -628, -529, 518, 613, -319, -519, -220, -67, 834, 619, 802, 207, 946, -904, 295, 718, -740, -557, -560, 80, 296, -90, 401, 407, 798, 254, 154, 387, 434, 491, 228, 307, 268, 505, -415, -976, 676, -917, 937, -609, 593, -36, 881, 607, 121, -373, 915, -885, 879, 391, -158, 588, -641, -937, 986, 949, -321]), [-991, -976, -937, -917, -904, -885, -837, -821, -740, -641, -628, -609, -602, -599, -568, -560, -557, -529, -519, -453, -415, -384, -373, -321, -319, -220, -158, -96, -92, -90, -85, -67, -50, -36, -19, 63, 80, 121, 154, 168, 207, 228, 254, 268, 268, 270, 294, 295, 296, 306, 307, 328, 351, 381, 387, 391, 401, 407, 434, 437, 491, 505, 518, 558, 588, 593, 607, 613, 619, 629, 676, 678, 718, 730, 753, 759, 798, 802, 834, 879, 881, 896, 915, 937, 946, 949, 986])

	def test_case_18(self):
		self.assertEqual(program.bubbleSort([-823, 164, 48, -987, 323, 399, -293, 183, -908, -376, 14, 980, 965, 842, 422, 829, 59, 724, -415, -733, 356, -855, -155, 52, 328, -544, -371, -160, -942, -51, 700, -363, -353, -359, 238, 892, -730, -575, 892, 490, 490, 995, 572, 888, -935, 919, -191, 646, -120, 125, -817, 341, -575, 372, -874, 243, 610, -36, -685, -337, -13, 295, 800, -950, -949, -257, 631, -542, 201, -796, 157, 950, 540, -846, -265, 746, 355, -578, -441, -254, -941, -738, -469, -167, -420, -126, -410, 59]), [-987, -950, -949, -942, -941, -935, -908, -874, -855, -846, -823, -817, -796, -738, -733, -730, -685, -578, -575, -575, -544, -542, -469, -441, -420, -415, -410, -376, -371, -363, -359, -353, -337, -293, -265, -257, -254, -191, -167, -160, -155, -126, -120, -51, -36, -13, 14, 48, 52, 59, 59, 125, 157, 164, 183, 201, 238, 243, 295, 323, 328, 341, 355, 356, 372, 399, 422, 490, 490, 540, 572, 610, 631, 646, 700, 724, 746, 800, 829, 842, 888, 892, 892, 919, 950, 965, 980, 995])


if __name__ == "__main__":
	unittest.main(verbosity=2)
`,
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
        `,
        `
        function bubbleSort(array) {
          do {
            swapped = false;
            // more stuff
          } while(swapped);
          return array
        }
        `,
        `
        function bubbleSort(array) {
          do {
            swapped = false;
            for (let i = 0; i < array.length; i++) {
              // set up conditional at this point
            }
          } while(swapped);
          return array
        }
        `,
        `
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
        }`,
        `
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
      categoryId: categoryIdsObj.Sorting,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Insertion Sort',
      published: true,
      description:
        'Write a function called "insertionSort" that takes in an unsorted array and return a sorted array. Use the Insertion Sort algorithm to sort the array.',
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
      `,
      pythonSolution: `
def insertionSort(array):
    # Write your code here.
    for i in range(len(array)):
        idx = 0
        swap = array[i]
        while array[i] > array[idx]:
            idx += 1
        for x in range(i, idx, -1):
            array[x] = array[x-1]
        array[idx] = swap
    return array
`,
      functionName: 'insertionSort',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('Insertion Sort', function () {

        it('Test Case #1', function () {
          let result = insertionSort([9, 2, 5, 6, 4, 3, 7, 10, 1, 8])
          expect(result).to.deep.equal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        })

        it('Test Case #2', function () {
          let result = insertionSort([8, 7, 6, 5, 4])
          expect(result).to.deep.equal([4, 5, 6, 7, 8])
        })

        it('Test Case #3', function () {
          let result = insertionSort([8, -7, 6, -5, 4])
          expect(result).to.deep.equal([-7, -5, 4, 6, 8])
        })

        it('Test Case #4', function () {
          let result = insertionSort([-1, -5, -22, -11, -7])
          expect(result).to.deep.equal([-22, -11, -7, -5, -1])
        })

        it('Test Case #5', function () {
          let result = insertionSort([])
          expect(result).to.deep.equal([])
        })
      })
      `,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.insertionSort([1]), [1])

	def test_case_2(self):
		self.assertEqual(program.insertionSort([1, 2]), [1, 2])

	def test_case_3(self):
		self.assertEqual(program.insertionSort([2, 1]), [1, 2])

	def test_case_4(self):
		self.assertEqual(program.insertionSort([1, 3, 2]), [1, 2, 3])

	def test_case_5(self):
		self.assertEqual(program.insertionSort([3, 1, 2]), [1, 2, 3])

	def test_case_6(self):
		self.assertEqual(program.insertionSort([1, 2, 3]), [1, 2, 3])

	def test_case_7(self):
		self.assertEqual(program.insertionSort([-4, 5, 10, 8, -10, -6, -4, -2, -5, 3, 5, -4, -5, -1, 1, 6, -7, -6, -7, 8]), [-10, -7, -7, -6, -6, -5, -5, -4, -4, -4, -2, -1, 1, 3, 5, 5, 6, 8, 8, 10])

	def test_case_8(self):
		self.assertEqual(program.insertionSort([-7, 2, 3, 8, -10, 4, -6, -10, -2, -7, 10, 5, 2, 9, -9, -5, 3, 8]), [-10, -10, -9, -7, -7, -6, -5, -2, 2, 2, 3, 3, 4, 5, 8, 8, 9, 10])

	def test_case_9(self):
		self.assertEqual(program.insertionSort([8, -6, 7, 10, 8, -1, 6, 2, 4, -5, 1, 10, 8, -10, -9, -10, 8, 9, -2, 7, -2, 4]), [-10, -10, -9, -6, -5, -2, -2, -1, 1, 2, 4, 4, 6, 7, 7, 8, 8, 8, 8, 9, 10, 10])

	def test_case_10(self):
		self.assertEqual(program.insertionSort([5, -2, 2, -8, 3, -10, -6, -1, 2, -2, 9, 1, 1]), [-10, -8, -6, -2, -2, -1, 1, 1, 2, 2, 3, 5, 9])

	def test_case_11(self):
		self.assertEqual(program.insertionSort([2, -2, -6, -10, 10, 4, -8, -1, -8, -4, 7, -4, 0, 9, -9, 0, -9, -9, 8, 1, -4, 4, 8, 5, 1, 5, 0, 0, 2, -10]), [-10, -10, -9, -9, -9, -8, -8, -6, -4, -4, -4, -2, -1, 0, 0, 0, 0, 1, 1, 2, 2, 4, 4, 5, 5, 7, 8, 8, 9, 10])

	def test_case_12(self):
		self.assertEqual(program.insertionSort([4, 1, 5, 0, -9, -3, -3, 9, 3, -4, -9, 8, 1, -3, -7, -4, -9, -1, -7, -2, -7, 4]), [-9, -9, -9, -7, -7, -7, -4, -4, -3, -3, -3, -2, -1, 0, 1, 1, 3, 4, 4, 5, 8, 9])

	def test_case_13(self):
		self.assertEqual(program.insertionSort([427, 787, 222, 996, -359, -614, 246, 230, 107, -706, 568, 9, -246, 12, -764, -212, -484, 603, 934, -848, -646, -991, 661, -32, -348, -474, -439, -56, 507, 736, 635, -171, -215, 564, -710, 710, 565, 892, 970, -755, 55, 821, -3, -153, 240, -160, -610, -583, -27, 131]), [-991, -848, -764, -755, -710, -706, -646, -614, -610, -583, -484, -474, -439, -359, -348, -246, -215, -212, -171, -160, -153, -56, -32, -27, -3, 9, 12, 55, 107, 131, 222, 230, 240, 246, 427, 507, 564, 565, 568, 603, 635, 661, 710, 736, 787, 821, 892, 934, 970, 996])

	def test_case_14(self):
		self.assertEqual(program.insertionSort([991, -731, -882, 100, 280, -43, 432, 771, -581, 180, -382, -998, 847, 80, -220, 680, 769, -75, -817, 366, 956, 749, 471, 228, -435, -269, 652, -331, -387, -657, -255, 382, -216, -6, -163, -681, 980, 913, -169, 972, -523, 354, 747, 805, 382, -827, -796, 372, 753, 519, 906]), [-998, -882, -827, -817, -796, -731, -681, -657, -581, -523, -435, -387, -382, -331, -269, -255, -220, -216, -169, -163, -75, -43, -6, 80, 100, 180, 228, 280, 354, 366, 372, 382, 382, 432, 471, 519, 652, 680, 747, 749, 753, 769, 771, 805, 847, 906, 913, 956, 972, 980, 991])

	def test_case_15(self):
		self.assertEqual(program.insertionSort([384, -67, 120, 759, 697, 232, -7, -557, -772, -987, 687, 397, -763, -86, -491, 947, 921, 421, 825, -679, 946, -562, -626, -898, 204, 776, -343, 393, 51, -796, -425, 31, 165, 975, -720, 878, -785, -367, -609, 662, -79, -112, -313, -94, 187, 260, 43, 85, -746, 612, 67, -389, 508, 777, 624, 993, -581, 34, 444, -544, 243, -995, 432, -755, -978, 515, -68, -559, 489, 732, -19, -489, 737, 924]), [-995, -987, -978, -898, -796, -785, -772, -763, -755, -746, -720, -679, -626, -609, -581, -562, -559, -557, -544, -491, -489, -425, -389, -367, -343, -313, -112, -94, -86, -79, -68, -67, -19, -7, 31, 34, 43, 51, 67, 85, 120, 165, 187, 204, 232, 243, 260, 384, 393, 397, 421, 432, 444, 489, 508, 515, 612, 624, 662, 687, 697, 732, 737, 759, 776, 777, 825, 878, 921, 924, 946, 947, 975, 993])

	def test_case_16(self):
		self.assertEqual(program.insertionSort([544, -578, 556, 713, -655, -359, -810, -731, 194, -531, -685, 689, -279, -738, 886, -54, -320, -500, 738, 445, -401, 993, -753, 329, -396, -924, -975, 376, 748, -356, 972, 459, 399, 669, -488, 568, -702, 551, 763, -90, -249, -45, 452, -917, 394, 195, -877, 153, 153, 788, 844, 867, 266, -739, 904, -154, -947, 464, 343, -312, 150, -656, 528, 61, 94, -581]), [-975, -947, -924, -917, -877, -810, -753, -739, -738, -731, -702, -685, -656, -655, -581, -578, -531, -500, -488, -401, -396, -359, -356, -320, -312, -279, -249, -154, -90, -54, -45, 61, 94, 150, 153, 153, 194, 195, 266, 329, 343, 376, 394, 399, 445, 452, 459, 464, 528, 544, 551, 556, 568, 669, 689, 713, 738, 748, 763, 788, 844, 867, 886, 904, 972, 993])

	def test_case_17(self):
		self.assertEqual(program.insertionSort([-19, 759, 168, 306, 270, -602, 558, -821, -599, 328, 753, -50, -568, 268, -92, 381, -96, 730, 629, 678, -837, 351, 896, 63, -85, 437, -453, -991, 294, -384, -628, -529, 518, 613, -319, -519, -220, -67, 834, 619, 802, 207, 946, -904, 295, 718, -740, -557, -560, 80, 296, -90, 401, 407, 798, 254, 154, 387, 434, 491, 228, 307, 268, 505, -415, -976, 676, -917, 937, -609, 593, -36, 881, 607, 121, -373, 915, -885, 879, 391, -158, 588, -641, -937, 986, 949, -321]), [-991, -976, -937, -917, -904, -885, -837, -821, -740, -641, -628, -609, -602, -599, -568, -560, -557, -529, -519, -453, -415, -384, -373, -321, -319, -220, -158, -96, -92, -90, -85, -67, -50, -36, -19, 63, 80, 121, 154, 168, 207, 228, 254, 268, 268, 270, 294, 295, 296, 306, 307, 328, 351, 381, 387, 391, 401, 407, 434, 437, 491, 505, 518, 558, 588, 593, 607, 613, 619, 629, 676, 678, 718, 730, 753, 759, 798, 802, 834, 879, 881, 896, 915, 937, 946, 949, 986])

	def test_case_18(self):
		self.assertEqual(program.insertionSort([-823, 164, 48, -987, 323, 399, -293, 183, -908, -376, 14, 980, 965, 842, 422, 829, 59, 724, -415, -733, 356, -855, -155, 52, 328, -544, -371, -160, -942, -51, 700, -363, -353, -359, 238, 892, -730, -575, 892, 490, 490, 995, 572, 888, -935, 919, -191, 646, -120, 125, -817, 341, -575, 372, -874, 243, 610, -36, -685, -337, -13, 295, 800, -950, -949, -257, 631, -542, 201, -796, 157, 950, 540, -846, -265, 746, 355, -578, -441, -254, -941, -738, -469, -167, -420, -126, -410, 59]), [-987, -950, -949, -942, -941, -935, -908, -874, -855, -846, -823, -817, -796, -738, -733, -730, -685, -578, -575, -575, -544, -542, -469, -441, -420, -415, -410, -376, -371, -363, -359, -353, -337, -293, -265, -257, -254, -191, -167, -160, -155, -126, -120, -51, -36, -13, 14, 48, 52, 59, 59, 125, 157, 164, 183, 201, 238, 243, 295, 323, 328, 341, 355, 356, 372, 399, 422, 490, 490, 540, 572, 610, 631, 646, 700, 724, 746, 800, 829, 842, 888, 892, 892, 919, 950, 965, 980, 995])


if __name__ == "__main__":
	unittest.main(verbosity=2)
`,
      categoryId: categoryIdsObj.Sorting,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Even Or Odd',
      published: true,
      description:
        'Write a function called "evenOrOdd" that takes an integer as an argument and returns "even" for even numbers, or "odd" for odd numbers.',
      javascriptSolution: `
        function evenOrOdd(number) {
          if (number % 2 === 0) {
            return 'even'
          } else {
            return 'odd'
          }
        }
      `,
      pythonSolution: `
def evenOrOdd(number):
    if number % 2 == 0:
        return 'even'
    else:
        return 'odd'
`,
      functionName: 'evenOrOdd',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect;

      describe('Solution for evenOrOdd', () => {

        it('Test Case #1', function () {
          let result = evenOrOdd(5)
          expect(result).to.deep.equal('odd');
        });

        it('Test Case #2', function () {
          let result = evenOrOdd(6)
          expect(result).to.deep.equal('even');
        });

        it('Test Case #3', function () {
          let result = evenOrOdd(-6)
          expect(result).to.deep.equal('even');
        });

        it('Test Case #4', function () {
          let result = evenOrOdd(99)
          expect(result).to.deep.equal('odd');
        });

        it('Test Case #5', function () {
          let result = evenOrOdd(0)
          expect(result).to.deep.equal('even');
        });

        it('Test Case #6', function() {
          let result = evenOrOdd(33)
          expect(result).to.deep.equal('odd');
        })
      })
      `,
      pythonTestFile: `
import program
import unittest

class TestProgram(unittest.TestCase):

	def test_case_1(self):
		self.assertEqual(program.evenOrOdd(0), 'even')

	def test_case_2(self):
		self.assertEqual(program.evenOrOdd(-55), 'odd')

	def test_case_3(self):
		self.assertEqual(program.evenOrOdd(-556), 'even')

	def test_case_4(self):
		self.assertEqual(program.evenOrOdd(9.00), 'odd')

	def test_case_5(self):
		self.assertEqual(program.evenOrOdd(9.99), 'odd')

if __name__ == "__main__":
	unittest.main(verbosity=2)
`,
      jsWalkThrough: [
        `
      Step One: Create a function named "evenOrOdd" that takes an a variable called number.
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
      function evenOrOdd(number) {
        // Your logic goes here...
      }
      `,
        `
      function evenOrOdd(number) {
        if (number % 2 === 0) {
          return 'even'
        }
      }
      `,
        `
      function evenOrOdd(number) {
        if (number % 2 === 0) {
          return 'even'
        } else {
          return 'odd'
        }
      }
      `
      ],
      categoryId: categoryIdsObj.Puzzle,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Find Duplicates',
      published: true,
      description:
        'Create a function called duplicates.  This function should find all the duplicates in an array where the numbers in the array are in the range of 0 to n-1 where n is the size of the array. For example: [1, 2, 3, 3] is okay but [1, 2, 6, 3] is not. In this version of the challenge there can be multiple duplicate numbers as well.',
      javascriptSolution: `
      function duplicates(arr) {
        var dups = []
        for (var i = 0; i < arr.length; i++) {
          var el = arr[Math.abs(arr[i])]
          if (el > 0) {
            arr[Math.abs(arr[i])] = -arr[Math.abs(arr[i])]
          } else if (el === 0) {
            arr[Math.abs(arr[i])] = -arr.length
          } else {
            if (Math.abs(arr[i]) === arr.length) {
              dups.push(0)
            } else {
              dups.push(Math.abs(arr[i]))
            }
          }
        }
        return dups
      }`,
      pythonSolution: '',
      functionName: 'duplicates',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('Find Duplicate', function() {
        it('Test Case #1', function() {
          let result = duplicates([0, 2, 0, 1, 3, 3])
          expect(result).to.deep.equal([0, 3])
        })

        it('Test Case #2', function() {
          let result = duplicates([35, 31])
          expect(result).to.deep.equal([35, 31])
        })

        it('Test Case #3', function() {
          let result = duplicates([0, 1, 0, 1, 35, 31])
          expect(result).to.deep.equal([0, 1, 35, 31])
        })

        it('Test Case #4', function() {
          let result = duplicates([4, 5, 634, 63, 7, 7, 2, 74, 37, 45, 72, 2])
          expect(result).to.deep.equal([634, 63, 7, 74, 37, 45, 72, 2])
        })

        it('Test Case #5', function() {
          let result = duplicates([4, 11, 2422, 61, 100, -25, 15, -1255, 127])
          expect(result).to.deep.equal([11, 2422, 61, 100, 25, 15, 1255, 127])
        })
      })
    `,
      pythonTestFile: '',
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.difficult,
      userId: userIdsObj.admin
    }),

    Question.create({
      name: 'Max Profit',
      published: true,
      description:
        'You will be given a list of stock prices for a given day and your goal is to return the maximum profit that could have been made by buying a stock at the given price and then selling the stock later on. For example if the input is: [45, 24, 35, 31, 40, 38, 11] then your program should return 16 because if you bought the stock at $24 and sold it at $40, a profit of $16 was made and this is the largest profit that could be made. If no profit could have been made, return -1.',
      javascriptSolution: `function maxProfit(arr) {
        var max_profit = -1;
        var buy_price = 0;
        var sell_price = 0;
        var change_buy_index = true;

        for (var i = 0; i < arr.length-1; i++) {

          sell_price = arr[i+1];

          if (change_buy_index) { buy_price = arr[i]; }

          if (sell_price < buy_price) {
            change_buy_index = true;
            continue;
          }

          else {
            var temp_profit = sell_price - buy_price;
            if (temp_profit > max_profit) { max_profit = temp_profit; }
            change_buy_index = false;
          }

        }

        return max_profit;
      }`,
      pythonSolution: '',
      functionName: 'maxProfit',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('Max Profit ', function() {

        it('Test Case #1', function() {
          let result = maxProfit([44, 30, 24, 32, 35, 30, 40, 38, 15])
          expect(result).to.deep.equal(16)
        })

        it('Test Case #2', function() {
          let result = maxProfit([50, 45, 40, 30])
          expect(result).to.deep.equal(-1)
        })

        it('Test Case #3', function() {
          let result = maxProfit([50, 45, 40, 30, 30])
          expect(result).to.deep.equal(0)
        })
      })
      `,
      pythonTestFile: '',
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.difficult,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Move Positions',
      published: true,
      description:
        'Write a JavaScript function to move an array element from one position to another.',
      javascriptSolution: `
      function movePosition(arr, old_index, new_index) {
        while (old_index < 0) {
            old_index += arr.length;
        }
        while (new_index < 0) {
            new_index += arr.length;
        }
        if (new_index >= arr.length) {
            var k = new_index - arr.length;
            while ((k--) + 1) {
                arr.push(undefined);
            }
        }
         arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
       return arr;
      }`,
      pythonSolution: '',
      functionName: 'movePosition',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('Move Position', function() {

        it('Test Case #1', function() {
          let result = movePosition([10, 20, 30, 40, 50], 0, 2)
          expect(result).to.deep.equal([20, 30, 10, 40, 50])
        })

        it('Test Case #2', function() {
          let result = movePosition([10, 20, 30, 40, 50], -1, -2)
          expect(result).to.deep.equal([10, 20, 30, 50, 40])
        })
      })`,
      pythonTestFile: '',
      categoryId: categoryIdsObj.Arrays,
      difficultyId: difficultyIdsObj.easy,
      userId: userIdsObj.admin
    }),
    Question.create({
      name: 'Nth Largest',
      published: true,
      description:
        'Write a JavaScript function to get nth largest element from an unsorted arry.',
      javascriptSolution: `
      function nthLargest(arr, n) {
        var x = 0,
          y = 0,
          z = 0,
          temp = 0,
          tnum = arr.length,
          flag = false,
          result = false;

        while (x < tnum) {
          y = x + 1;

          if (y < tnum) {
            for (z = y; z < tnum; z++) {

              if (arr[x] < arr[z]) {
                temp = arr[z];
                arr[z] = arr[x];
                arr[x] = temp;
                flag = true;
              } else {
                continue;
              }
            }
          }

          if (flag) {
            flag = false;
          } else {
            x++;
            if (x === n) {

              result = true;
            }
          }
          if (result) {
            break;
          }
        }

        return (arr[(n - 1)]);

      }`,
      pythonSolution: '',
      functionName: 'nthLargest',
      javascriptTestFile: `
      const chai = require('chai')
      let expect = chai.expect

      describe('nth Largest ', function() {

        it('Test Case #1', function() {
          let result = nthLargest([ 43, 56, 23, 89, 88, 90, 99, 652], 4)
          expect(result).to.deep.equal(89)
        })

        it('Test Case #2', function() {
          let result = nthLargest([10, 20, 30, 40, 50], 5)
          expect(result).to.deep.equal(10)
        })
      })
      `,
      pythonTestFile: '',
      categoryId: categoryIdsObj.Sorting,
      difficultyId: difficultyIdsObj.medium,
      userId: userIdsObj.admin,
      companyId: companyIdsObj.Microsoft
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
