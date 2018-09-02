const bcrypt = require('bcryptjs')
const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

const { createToken, isSuperAdmin, isAdmin } = require('../../middlewares/auth')
const { User } = require('../../models/users')

const isDataOwner = async (parent, { id }, { authUser }) => {
  var dataUser = await User.findById(id)

  if (dataUser._id !== authUser._id) {
    throw new ForbiddenError('You dont have authorized as owner!')
  }

  return skip
}

module.exports = {
  Query: {
    users: async () => {
      try {
        return await User.find()
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    },
    user: async (parent, { id }) => {
      try {
        return await User.findById(id)
      } catch (error) {
        throw new UserInputError('Data not found!')
      }
    },
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

    createAdmin: combineResolvers(isSuperAdmin, async (parent, { admin }, { authUser }) => {
      try {
        return await User.create({
          ...admin,
          password: bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10)),
          createdBy: authUser,
        })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    createUser: combineResolvers(isAdmin, async (parent, { user }, { authUser }) => {
      try {
        return await User.create({
          ...user,
          password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
          createdBy: authUser,
        })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    updateUser: combineResolvers(isAdmin || isDataOwner, async (parent, { id, user }) => {
      try {
        const { password } = user
        var data = { ...user }

        if (password) {
          data = {
            ...user,
            password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
          }
        }

        return await User.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),

    deleteUser: combineResolvers(isAdmin || isDataOwner, async (parent, { id }) => {
      try {
        return await User.findOneAndDelete({ _id: id })
      } catch (error) {
        throw new ForbiddenError(error)
      }
    }),
  },
}
