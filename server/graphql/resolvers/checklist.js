const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers } = require('graphql-resolvers')

const { gqlValidateTokenAdmin, gqlValidateTokenUser } = require('../../middlewares/auth')
const { create, read, readId, readSelf, update, destroy } = require('../../models/checklist')

module.exports = {
  Query: {
    checklists: combineResolvers(gqlValidateTokenUser, async (parent, args, { authUser }) => {
      try {
        return (await authUser.roles) === 'Sopir' || authUser.roles === 'Kernet'
          ? readSelf(authUser)
          : read()
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
          if (authUser.roles === 'Superadmin' || authUser.roles === 'Admin') {
            throw new ForbiddenError('You dont have authentication!')
          } else {
            return await create({
              ...checklist,
              createdBy: { ...authUser },
            })
          }
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    updateCheckList: combineResolvers(
      gqlValidateTokenUser,
      async (parent, { id, checklist }, { authUser }) => {
        try {
          if (authUser.roles === 'Superadmin' || authUser.roles === 'Admin') {
            throw new ForbiddenError('You dont have authentication!')
          } else {
            return await update(id, checklist)
          }
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    approvalCheckList: combineResolvers(
      gqlValidateTokenAdmin,
      async (parent, { id, approval }, { authUser }) => {
        const approvalAdmin = {
          ...approval,
          approvedBy: authUser,
        }

        try {
          if (authUser.roles === 'Sopir' || authUser.roles === 'Kernet') {
            new ForbiddenError('You dont have authentication!')
          } else {
            return await update(id, approvalAdmin)
          }
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    deleteCheckList: combineResolvers(
      gqlValidateTokenUser,
      async (parent, { id }, { authUser }) => {
        try {
          if (authUser.roles === 'Superadmin' || authUser.roles === 'Admin') {
            new ForbiddenError('You dont have authentication!')
          } else {
            return await destroy(id)
          }
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),
  },
}
