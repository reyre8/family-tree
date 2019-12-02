const Person = require('./src/person');
const Tree = require('./src/tree');

/**
 * Initialises a tree with default data
 *
 * @return {Tree} familyTree
 */
function loadTree() {
  var familyTree = new Tree(new Person('King Arthur', 'Male'), new Person('Queen Margret', 'Female'));
  familyTree.add('Queen Margret', new Person('Bill', 'Male'), new Person('Flora', 'Female'));
  familyTree.add('Queen Margret', new Person('Charlie', 'Male'));
  familyTree.add('Queen Margret', new Person('Percy', 'Male'), new Person('Audrey', 'Female'));
  familyTree.add('Queen Margret', new Person('Ronald', 'Male'), new Person('Helen', 'Female'));
  familyTree.add('Queen Margret', new Person('Ginevra', 'Female'), new Person('Harry', 'Male'));
  familyTree.add('Flora', new Person('Victorie', 'Female'), new Person('Ted', 'Male'));
  familyTree.add('Flora', new Person('Dominique', 'Female'));
  familyTree.add('Flora', new Person('Louis', 'Male'));
  familyTree.add('Audrey', new Person('Molly', 'Female'));
  familyTree.add('Audrey', new Person('Lucy', 'Female'));
  familyTree.add('Helen', new Person('Hugo', 'Male'));
  familyTree.add('Helen', new Person('Rose', 'Female'), new Person('Malfoy', 'Male'));
  familyTree.add('Ginevra', new Person('James', 'Male'), new Person('Darcy', 'Female'));
  familyTree.add('Ginevra', new Person('Albus', 'Male'), new Person('Alice', 'Female'));
  familyTree.add('Ginevra', new Person('Lily', 'Female'));
  familyTree.add('Victorie', new Person('Remus', 'Male'));
  familyTree.add('Rose', new Person('Draco', 'Male'));
  familyTree.add('Rose', new Person('Aster', 'Female'));
  familyTree.add('Darcy', new Person('William', 'Male'));
  familyTree.add('Alice', new Person('Ron', 'Male'));
  familyTree.add('Alice', new Person('Ginny', 'Female'));
  return familyTree;
}

module.exports = { loadTree: loadTree }
