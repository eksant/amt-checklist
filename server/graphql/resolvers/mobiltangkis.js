const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers } = require('graphql-resolvers')

const { isAdmin } = require('../../middlewares/auth')
const { create, read, readId, update, destroy } = require('../../models/mobiltangkis')

module.exports = {
  Query: {
    mobiltangkis: async () => {
      try {
        return await read()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    },
    mobiltangki: async (parent, { id }) => {
      try {
        return await readId(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    },
  },

  Mutation: {
    createMobilTangki: combineResolvers(isAdmin, async (parent, { mobiltangki }, { authUser }) => {
      try {
        return await create({
          ...mobiltangki,
          createdBy: authUser,
        })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    updateMobilTangki: combineResolvers(isAdmin, async (parent, { id, mobiltangki }) => {
      try {
        const data = await readId(id)

        if (data) {
          return await update(id, mobiltangki)
        } else {
          throw new UserInputError('Data not found!')
        }
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    deleteMobilTangki: combineResolvers(isAdmin, async (parent, { id }) => {
      try {
        return await destroy(id)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),
  },
}
