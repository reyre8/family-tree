const Person = require('./src/person');
const FamilyTree = require('./src/family-tree');
const FamilyNode = require('./src/family-node');

/**
 * Initialises a tree with default data
 *
 * @return {FamilyTree} familyTree
 */
function loadTree() {
  var familyTree = new FamilyTree(new FamilyNode(new Person('King Arthur', 'Male'), new Person('Queen Margret', 'Female')));
  familyTree.add('Queen Margret', new FamilyNode(new Person('Bill', 'Male'), new Person('Flora', 'Female')));
  familyTree.add('Queen Margret', new FamilyNode(new Person('Charlie', 'Male')));
  familyTree.add('Queen Margret', new FamilyNode(new Person('Percy', 'Male'), new Person('Audrey', 'Female')));
  familyTree.add('Queen Margret', new FamilyNode(new Person('Ronald', 'Male'), new Person('Helen', 'Female')));
  familyTree.add('Queen Margret', new FamilyNode(new Person('Ginevra', 'Female'), new Person('Harry', 'Male')));
  familyTree.add('Flora', new FamilyNode(new Person('Victorie', 'Female'), new Person('Ted', 'Male')));
  familyTree.add('Flora', new FamilyNode(new Person('Dominique', 'Female')));
  familyTree.add('Flora', new FamilyNode(new Person('Louis', 'Male')));
  familyTree.add('Audrey', new FamilyNode(new Person('Molly', 'Female')));
  familyTree.add('Audrey', new FamilyNode(new Person('Lucy', 'Female')));
  familyTree.add('Helen', new FamilyNode(new Person('Hugo', 'Male')));
  familyTree.add('Helen', new FamilyNode(new Person('Rose', 'Female'), new Person('Malfoy', 'Male')));
  familyTree.add('Ginevra', new FamilyNode(new Person('James', 'Male'), new Person('Darcy', 'Female')));
  familyTree.add('Ginevra', new FamilyNode(new Person('Albus', 'Male'), new Person('Alice', 'Female')));
  familyTree.add('Ginevra', new FamilyNode(new Person('Lily', 'Female')));
  familyTree.add('Victorie', new FamilyNode(new Person('Remus', 'Male')));
  familyTree.add('Rose', new FamilyNode(new Person('Draco', 'Male')));
  familyTree.add('Rose', new FamilyNode(new Person('Aster', 'Female')));
  familyTree.add('Darcy', new FamilyNode(new Person('William', 'Male')));
  familyTree.add('Alice', new FamilyNode(new Person('Ron', 'Male')));
  familyTree.add('Alice', new FamilyNode(new Person('Ginny', 'Female')));
  return familyTree;
}

module.exports = { loadTree: loadTree }
