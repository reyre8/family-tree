// Object with properties for each relation
module.exports = {
  Siblings: {
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
  Son: {
    parentLevel: 0,
    gender: 'Male',
  },
  Daughter: {
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
