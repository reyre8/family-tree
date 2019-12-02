FamilyNode = require('./family-node');

/**
 * Class that controls the tree structure
 *
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 */
function FamilyTree(member, partner=null) {
    var node = new FamilyNode(member, partner);
    this._root = node;
}

/**
 * Routine defined to traverse the tree
 *
 * @param {function} callback Callback to be executed for every node that
 * is visited
 */
FamilyTree.prototype.traverse = function(callback) {
  (function recurse(currentNode) {
    for (var i = 0, length = currentNode.children.length; i < length; i++) {
      recurse(currentNode.children[i]);
    }
      callback(currentNode);
  })(this._root);
};

/**
 * Searches for a node that matches the given name, with either
 * member.name or partner.name
 *
 * @param {String} name Name to be used in the search
 * @return {FamilyNode} Returns the node if it's found. Otherwise returns null
 */
FamilyTree.prototype.find = function(name) {
  var nodeToFind = null;
  this.traverse.call(this, function(node) {
    if((node.member.name === name) || ((node.partner) && (node.partner.name === name))) {
      nodeToFind = node;
    }
  });
  return nodeToFind;
}


/**
 * Adds a new node (created with member and partner), to a node that matches the
 * given parent name
 *
 * @param {String} parentName Name of the parentNode
 * @param {Person} member The direct member of the family
 * @param {Person} partner If provided, the members partner
 * @return {String} Result of the operation
 */
FamilyTree.prototype.add = function(parentName, member, partner=null) {
  let parent = this.find(parentName);
  if (!parent)
    return 'PERSON_NOT_FOUND';

  let targetType = (parent.member.name === parentName)?'member':'partner';
  if (!parent[targetType].isFemale()) 
    return 'CHILD_ADDITION_FAILED';

  let child = new FamilyNode(member, partner);
  child.parent = parent;
  parent.children.push(child);
  return 'CHILD_ADDITION_SUCCEEDED';
};

/**
 * Searches for all relatives of the provided name,
 * according to the relation provided
 *
 * @param {String} name Name of the person to search the relatives for
 * @param {Person} relation Type of relation (defined on const relationships)
 * @return {String} Result of the operation
 */
FamilyTree.prototype.search = function(name, relation) {
  if (!relationships.hasOwnProperty(relation))
    return 'INVALID_RELATION';

  let targetNode = this.find(name);
  if (!targetNode)
    return 'PERSON_NOT_FOUND';

  let targetType = (targetNode.member.name === name)?'partner':'member';
  let targetParent = targetNode.findAncestor(relationships[relation].parentLevel); 
  let result = this.findRelatives(relation, targetNode, targetParent, targetType);
  return (result.length>0)?result.join(' '):'NONE';
};

/**
 * Find relatives for a given targetNode according and to the relation provided
 * @param {String} name Name of the person to search the relatives for
 * @param {Person} relation Type of relation (defined on const relationships)
 * @return {String} Result of the operation
 */
FamilyTree.prototype.findRelatives = function (relation, targetNode, targetParent, targetType) {
  var result = [];
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
  return result;
}

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

module.exports = FamilyTree;