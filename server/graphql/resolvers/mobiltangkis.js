const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers } = require('graphql-resolvers')

const { gqlValidateTokenAdmin } = require('../../middlewares/auth')
const { create, read, readId, update, destroy } = require('../../models/mobiltangkis')

module.exports = {
  Query: {
    mobiltangkis: combineResolvers(gqlValidateTokenAdmin, async () => {
      try {
        return await read()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),

    mobiltangki: combineResolvers(gqlValidateTokenAdmin, async (parent, { id }) => {
      try {
        return await readId(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),
  },

  Mutation: {
    createMobilTangki: combineResolvers(
      gqlValidateTokenAdmin,
      async (parent, { mobiltangki }, { authUser }) => {
        try {
          return await create({
            ...mobiltangki,
            createdBy: authUser,
          })
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    updateMobilTangki: combineResolvers(
      gqlValidateTokenAdmin,
      async (parent, { id, mobiltangki }) => {
        try {
          return await update(id, mobiltangki)
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    deleteMobilTangki: combineResolvers(gqlValidateTokenAdmin, async (parent, { id }) => {
      try {
        return await destroy(id)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),
  },
}
