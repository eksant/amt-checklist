const bcrypt = require('bcryptjs')
const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers } = require('graphql-resolvers')

const {
  createToken,
  gqlValidateTokenSuperadmin,
  gqlValidateTokenAdmin,
} = require('../../middlewares/auth')

const {
  User,
  createAdmin,
  createUser,
  readAdmin,
  readAdminId,
  readUser,
  readUserId,
  update,
  destroy,
} = require('../../models/users')

module.exports = {
  Query: {
    admins: combineResolvers(gqlValidateTokenSuperadmin, async () => {
      try {
        return await readAdmin()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),

    admin: combineResolvers(gqlValidateTokenSuperadmin, async (parent, { id }) => {
      try {
        return await readAdminId(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),

    users: combineResolvers(gqlValidateTokenAdmin, async () => {
      try {
        return await readUser()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),

    user: combineResolvers(gqlValidateTokenAdmin, async (parent, { id }) => {
      try {
        return await readUserId(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    }),
  },

  Mutation: {
    signIn: async (parent, { username, password }) => {
      const user = await User.findOne({ username })
      if (!user) {
        throw new UserInputError('Username not found!')
      }

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        throw new UserInputError('Invalid username or password!')
      }

      return {
        user,
        token: await createToken(user),
      }
    },

    createAdmin: combineResolvers(
      gqlValidateTokenSuperadmin,
      async (parent, { admin }, { authUser }) => {
        try {
          return await createAdmin({
            ...admin,
            password: bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10)),
            createdBy: authUser,
          })
        } catch (error) {
          throw new ForbiddenError(error)
        }
      }
    ),

    createUser: combineResolvers(gqlValidateTokenAdmin, async (parent, { user }, { authUser }) => {
      try {
        return await createUser({
          ...user,
          password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
          createdBy: authUser,
        })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    updateAdmin: combineResolvers(gqlValidateTokenSuperadmin, async (parent, { id, admin }) => {
      try {
        const { password } = admin
        var data = { ...admin }

        if (password) {
          data = {
            ...admin,
            password: bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10)),
          }
        }

        return await update(id, data)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    updateUser: combineResolvers(gqlValidateTokenAdmin, async (parent, { id, user }) => {
      try {
        const { password } = user
        var data = { ...user }

        if (password) {
          data = {
            ...user,
            password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
          }
        }

        return await update(id, data)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    deleteAdmin: combineResolvers(gqlValidateTokenSuperadmin, async (parent, { id }) => {
      try {
        return await destroy(id)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    deleteUser: combineResolvers(gqlValidateTokenAdmin, async (parent, { id }) => {
      try {
        return await destroy(id)
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),
  },
}
