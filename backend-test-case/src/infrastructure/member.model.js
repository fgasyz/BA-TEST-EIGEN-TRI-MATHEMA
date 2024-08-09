const prismaClient = require('../config/database.config');

class MemberModel {
  async getAllMembers() {
    const members = await prismaClient.member.findMany();
    return members;
  }

  async checkMemberIsExistAndNotPenalty(code) {
    const member = await prismaClient.member.findUnique({
      where: { code: code, is_penalty: false },
    });
    return member;
  }

  async setMemberIsPinalty(code, is_penalty) {
    const member = await prismaClient.member.update({
      where: { code: code },
      data: {
        is_penalty: is_penalty,
      },
    });
    return member;
  }

  createMemberIsPenalty(lan) {
    const penaltyDays = 7;
    const insertDate = lan.insert_at;
    const returnDate = lan.return_at;
    const daysLate = Math.ceil(
      (returnDate.getTime() - insertDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysLate > penaltyDays) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = MemberModel;
