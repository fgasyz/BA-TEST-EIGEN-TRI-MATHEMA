const express = require('express');
const membersRouter = express.Router();
const MemberService = require('../domain/services/member.service');

membersRouter.get('/', async (req, res, next) => {
  try {
    const members = await MemberService.getAllMembers();
    res.json({ data: { members: members } });
  } catch (error) {
    next(error);
  }
});

module.exports = membersRouter;
