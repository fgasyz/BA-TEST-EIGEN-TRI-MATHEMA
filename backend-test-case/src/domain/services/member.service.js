const MemberRepository = require('../repositories/member.repository');

class MemberService {
  constructor() {
    this.memberRepository = new MemberRepository();
  }
  async getAllMembers() {
    const members = await this.memberRepository.getAllMembers();
    return members;
  }
}

module.exports = new MemberService();
