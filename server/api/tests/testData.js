/* The purpose of this file to fill the test files with data. Simply place all test data in this file
 * and export what you need from here by destructuring. */

const Categories = [
  {
    name: 'Arrays',
    description:
      'An array is a collection of items stored at continuous memory locations. Each item (element) is accessible by their index.'
  },
  {
    name: 'Binary Search Trees',
    description:
      "This is a special kind of Binary Tree where each node has a Comparable key (and an associated value) and satisfies the restriction that the key in any node is larger than the keys in all nodes in that node's left subtree and smaller than the keys in all nodes in that node's right subtree."
  },
  {
    name: 'Dynamic Programming',
    description:
      'A method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions.'
  },
  {
    name: 'Graphs',
    description:
      'An abstract data type which consists of a finite set of nodes together with a set of unordered pairs of these nodes for an undirected graph or a set of ordered pairs for a directed graph'
  },
  {
    name: 'Heaps',
    description:
      'Heap is a special case of balanced binary tree data structure where the root-node key is compared with its children and arranged accordingly. If X is the parent node of Y, then the value of X follows a specific order with respect to the value of Y and the same order is followed across the tree.'
  },
  {
    name: 'Recursion',
    description:
      'This is where a function being defined is applied in its own definition. Recursive functions must contain at least one or more test case(s) to prevent infinite calls to itself.'
  },
  {
    name: 'Searching',
    description:
      'Given any data-structure or abstract data type, this involves implementing an algorithm which finds a specified target.'
  },
  {
    name: 'Sorting',
    description:
      'A series of algoritms made up with a set of instructions which tell an array how to order its elements.'
  },
  {
    name: 'Stacks',
    description:
      'A stack is a "Last In First Out"(LIFO) data structure used to store a collection of objects. Individual items can be added and stored in a stack using a push operation. Objects can be retrieved using a pop operation, which removes an item from the stack.'
  },
  {
    name: 'Queue',
    description:
      'A queue is a "First In First Out"(FIFO) data structure used to store a collection of objects. Individual items can be added and stored in a queue using a push operation. Unlike a stack, the pop operation will remove the item from the front of the array.'
  },
  {
    name: 'Strings',
    description:
      'Just some fun problems which revolve around manipulating the content of a body of text.'
  }
]

const Question = [
  {
    name: 'Is Unique',
    description:
      'Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?',
    difficulty: 'easy',
    categoryId: 1 // Arrays
  }
]

module.exports = { Categories, Question }
