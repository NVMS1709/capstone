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
const { User, Question, Category } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' })
  ])

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

  console.log(`seeded ${users.length} users`)

  const questions = await Promise.all([
    Question.create({
      name: 'BST Construction',
      description:
        'Write a Binary Search Tree (BST) class named "BST". The BST class should have a "value" property set to be an integer, as well as "left" and "right" properties, both of which should point to either the None (null) value or to another BST. A node is said to be a BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and both of its children nodes are either BST nodes themselves or None (null) values. The BST class should support three methods, viz., "insert", "contains", and "remove". The "contains" method return a boolean value indicating whether the value is contained in the BST tree or not. The "remove" method should only remove the first instance of the target value.',
      solution: `
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
      categoryId: 2,
      difficulty: 'medium',
      functionName: `BST`,
      testSpec: `Test Spec Placeholder`
    }),

    Question.create({
      name: 'BST Traversal',
      description:
        'Write three functions, viz., "inOrderTraverse", "preOrderTraverse", and "postOrderTraverse", that take in an empty array, traverse the BST, add its nodes\' values to the input array, and return that array. The three functions should traverse the BST using the in-order traversal, pre-order traversal, and post-order traversal techniques, respectively. You are given a BST data structure consisting of BST nodes. Each BST node has an integer value stored in a property called "value" and two children nodes stored in properties called "left" ani "right," respectively. A node is said to be a BST node if and only if it satisfies the BST property: its value is strictly greater than the values of every node to its left; its value is less than or equal to the values of every node to its right; and both of its children nodes are either BST nodes themselves or None (null) values.',
      solution: `
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
      categoryId: 2,
      difficulty: 'medium',
      functionName: `inOrderTraverse`,
      testSpec: `Test Spec Placeholder`
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
