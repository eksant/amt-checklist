const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers } = require('graphql-resolvers')

const { gqlValidateTokenUser } = require('../../middlewares/auth')
const { create, read, readId, update, destroy } = require('../../models/checklist')

module.exports = {
  Query: {
    checklists: combineResolvers(gqlValidateTokenUser, async () => {
      try {
        return await read()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),

    checklist: combineResolvers(gqlValidateTokenUser, async (parent, { id }) => {
      try {
        return await readId(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),
  },

  Mutation: {
    createCheckList: combineResolvers(
      gqlValidateTokenUser,
      async (parent, { checklist }, { authUser }) => {
        try {
          return await create({
            ...checklist,
            createdBy: authUser,
          })
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    updateCheckList: combineResolvers(gqlValidateTokenUser, async (parent, { id, checklist }) => {
      try {
        return await update(id, checklist)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    deleteCheckList: combineResolvers(gqlValidateTokenUser, async (parent, { id }) => {
      try {
        return await destroy(id)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),
  },
}
