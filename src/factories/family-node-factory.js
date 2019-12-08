const PersonFactory = require('./person-factory');
const FamilyNode = require('./../entities/family-node');

/**
 * Generates an instance of FamilyNode. If the partner is
 * provided, the FamilyNode partner is set. Otherwise the
 * key partner in the FamilyNode is null
 *
 * @param {String} memberName - The name of the member
 * @param {String} memberGender - The gender of the member
 * @param {String} memberName - The name of the partner
 * @param {String} memberGender - The gender of the partner
 * @return {Object} Returns an instance of FamilyNode.
 */
module.exports = (
  memberName,
  memberGender,
  partnerName = null,
  partnerGender = null
) => {
  const member = PersonFactory(memberName, memberGender);
  let partner = null;
  if (partnerName && partnerGender) {
    partner = PersonFactory(partnerName, partnerGender);
  }

  return new FamilyNode(member, partner);
};
