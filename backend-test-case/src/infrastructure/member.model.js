const prismaClient = require('../config/database.config');

class MemberModel {
  async getAllMembers() {
    const members = await prismaClient.member.findMany();
    return members;
  }

  async checkMemberIsExist(code) {
    const member = await prismaClient.member.findUnique({
      where: { code: code },
    });
    return member;
  }
  async checkMemberIsNotPenalty(code) {
    const member = await prismaClient.member.findUnique({
      where: { code: code, is_penalty: false },
    });
    return member;
  }

  async setMemberIsPinalty(code, is_penalty, finalty_date) {
    const member = await prismaClient.member.update({
      where: { code: code },
      data: {
        is_penalty: is_penalty,
        finalty_date: finalty_date ?? null,
      },
    });
    return member;
  }

  checkMemberIsPenalty(lan) {
    const penaltyDays = 7;
    const insertDate = lan.insert_at;
    const returnDate = lan.return_at;
    const daysLate = Math.ceil(
      (returnDate.getTime() - insertDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysLate > penaltyDays) {
      let dateObj = new Date(returnDate);
      dateObj.setDate(dateObj.getDate() + 2);
      let newIsoDate = dateObj.toISOString();
      return { is_penalty: true, penaltyDaysFinish: newIsoDate };
    } else {
      return { is_penalty: false, penaltyDaysFinish: null };
    }
  }
}

module.exports = MemberModel;
