import React, { Component } from 'react'
import { connect } from 'react-redux'

const testArr = [
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
]

const code = [
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

class InstructionMode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      codeView: false
    }
    this.toggleUp = this.toggleUp.bind(this)
    this.toggleDown = this.toggleDown.bind(this)
    this.toggleCodeView = this.toggleCodeView.bind(this)
  }

  toggleUp() {
    if (this.state.index < this.props.currentQuestion.jsWalkThrough.length - 1) this.setState({ index: this.state.index + 1 })
    this.setState({ codeView: false })
  }

  toggleDown() {
    if (this.state.index > 0) this.setState({ index: this.state.index - 1 })
    this.setState({ codeView: false })
  }

  toggleCodeView() {
    this.setState({ codeView: !this.state.codeView })
  }

  render() {
    return (
      <div className="instructions-shell">
        <div>
          <div>
            {this.state.index > 0 ? (
              <button onClick={this.toggleDown}>See Previous Hint</button>
            ) : (
              ''
            )}
            <button onClick={this.toggleCodeView}>See Code</button>
            {this.state.index <
            this.props.currentQuestion.jsWalkThrough.length - 1 ? (
              <button onClick={this.toggleUp}>See Next Hint</button>
            ) : (
              ''
            )}
          </div>
          {this.state.codeView ? (
            ''
          ) : (
            <p>{this.props.currentQuestion.jsWalkThrough[this.state.index]}</p>
          )}
          {this.state.codeView ? (
            <pre>
              {this.props.currentQuestion.jsSolutionWT[this.state.index]}
            </pre>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    questions: state.questions
  }
}

export default connect(mapState)(InstructionMode)
