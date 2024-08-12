const express = require('express');
const membersRouter = express.Router();
const MemberService = require('../domain/services/member.service');

/**
 * @openapi
 * /api/members:
 *   get:
 *     summary: Shows all existing members
 *     responses:
 *       200:
 *         description: Shows all existing members
 */
membersRouter.get('/', async (req, res, next) => {
  try {
    const members = await MemberService.getAllMembers();
    res.json({ data: { members: members } });
  } catch (error) {
    next(error);
  }
});

module.exports = membersRouter;
