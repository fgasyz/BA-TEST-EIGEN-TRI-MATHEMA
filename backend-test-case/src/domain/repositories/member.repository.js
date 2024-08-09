const MemberModel = require('../../infrastructure/member.model');

class MemberRepository {
  constructor() {
    this.memberModel = new MemberModel();
  }
  async getAllMembers() {
    return await this.memberModel.getAllMembers();
  }
}

module.exports = MemberRepository;
