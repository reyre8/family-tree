const PersonFactory = require('./person-factory');
const FamilyNode = require('./../entities/family-node');

module.exports = (memberName, memberGender, partnerName=null, partnerGender=null) => {
  member = PersonFactory(memberName, memberGender);
  partner = null;
  if (partnerName && partnerGender)
    partner = PersonFactory(partnerName, partnerGender);
  return new FamilyNode(member, partner);
}
