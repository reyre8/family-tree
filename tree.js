/**
 * Class that controls the nodes added to a tree
 *
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 */
function Node(member, partner=null) {
    this.member = member;
    this.partner = partner;
    this.parent = null;
    this.children = [];
}

/**
 * Finds in the node, the parent ancestor indicated on level.
 * If the level provided is 0, the function returns the same
 * node.
 *
 * @param {Integer} Level of the ancestor to find
 * @return {Object} The parent found, otherwise, it returns null
 */
Node.prototype.findAncestor = function(level) {
  let parent = this;
  for(let i=0; i<level; i++) {
    if (parent.hasOwnProperty('parent')) {
      parent = parent.parent;
    } else {
      return null;
    }
  }
  return parent;
}

/**
 * Class that controls the tree structure
 *
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 */
function Tree(member, partner=null) {
    var node = new Node(member, partner);
    this._root = node;
}

/**
 * Routine defined to traverse the tree
 *
 * @param {function} callback Callback to be executed for every node that
 * is visited
 */
Tree.prototype.traverse = function(callback) {
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
      callback(currentNode);
  })(this._root);
};

/**
 * Adds a new node (created with member and partner), to a node that matches the
 * given parent name
 *
 * @param {String} parentName Name of the parentNode
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 * @return {String} Result of the operation
 */
Tree.prototype.add = function(parentName, member, partner=null) {
  var child = new Node(member, partner),
      result = null,
      parent = null,
      callback = function(node) {
        if((node.member.name === parentName) || ((node.partner) && (node.partner.name === parentName))) {
          let targetType = (node.member.name === parentName)?'member':'partner';
          if(node[targetType] && node[targetType].isFemale()) {
            parent = node;
          } else {
            result = 'CHILD_ADDITION_FAILED';
          }
        }
      };
  this.traverse.call(this, callback);
  if (parent) {
    parent.children.push(child);
    child.parent = parent;
    result = 'CHILD_ADDED';
  } else {
    result = result || 'PERSON_NOT_FOUND';
  }
  return result;
};

/**
 * Searches for all relatives of the provided name,
 * according to the relation provided
 *
 * @param {String} name Name of the person to search the relatives for
 * @param {Person} relation Type of relation (defined on const relationships)
 * @return {String} Result of the operation
 */
Tree.prototype.search = function(name, relation) {
  if (!relationships.hasOwnProperty(relation)) {
    return 'INVALID_RELATION';
  }
  var result = [],
      targetParent = null,
      targetNode = null,
      targetType = null,
      callback = function(node) {
        if ((node.member.name  === name) || (node.partner && node.partner.name === name)) {
          targetNode = node;
          targetType = (node.member.name === name)?'partner':'member';
          targetParent = node.findAncestor(relationships[relation].parentLevel); 
        }
      };
  this.traverse.call(this, callback);
  if (targetNode) {
    this.traverse.call(this, function(node) {
      if ((node !== targetNode) && (targetParent === node.parent)) {
        switch(relation) {
          case 'Siblings':
            if (targetType === 'partner') {
              result.push(node.member.name);
            }
            break;
          case 'Sister-In-Law':
          case 'Brother-In-Law':
            if ((node[targetType]) && (node[targetType].gender === relationships[relation].gender)) {
              result.push(node[targetType].name);
            }
            break;
          case 'Son':
          case 'Daughter':
            if (node.member.gender === relationships[relation].gender) {
              result.push(node.member.name);
            }
            break;
          case 'Maternal-Aunt':
          case 'Paternal-Aunt':  
          case 'Maternal-Uncle':
          case 'Paternal-Uncle':
            if ((targetNode.parent.member.gender === relationships[relation].parentGender) && 
                (node !== targetNode.parent) && 
                (node.member.gender === relationships[relation].gender)) {
                result.push(node.member.name);
              }
            break;
          default:
            throw Error('INVALID_RELATION');
            break;
        }
      }
    });
  } else {
    result.push('PERSON_NOT_FOUND');
  }
  return (result.length>0)?result.join(' '):'NONE';
};

// Object of properties for each relation
const relationships = {
  'Siblings': {
    parentLevel: 1,
    gender: null,
  },
  'Sister-In-Law': {
    parentLevel: 1,
    gender: 'Female',
  },
  'Brother-In-Law': {
    parentLevel: 1,
    gender: 'Male',
  },
  'Son': {
    parentLevel: 0,
    gender: 'Male',
  },
  'Daughter': {
    parentLevel: 0,
    gender: 'Female',
  },
  'Paternal-Uncle': {
    parentLevel: 2,
    gender: 'Male',
    parentGender: 'Male',
  },
  'Maternal-Uncle': {
    parentLevel: 2,
    gender: 'Male',
    parentGender: 'Female',
  },
  'Paternal-Aunt': {
    parentLevel: 2,
    gender: 'Female',
    parentGender: 'Male',
  },
  'Maternal-Aunt': {
    parentLevel: 2,
    gender: 'Female',
    parentGender: 'Female',
  },
};

module.exports = Tree;