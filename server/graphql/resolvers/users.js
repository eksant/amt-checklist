const bcrypt = require('bcryptjs')
const { UserInputError, ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

const { createToken, isAuthenticated, isSuperAdmin, isAdmin } = require('../../middlewares/auth')
const { User } = require('../../models/users')

const isDataOwner = async (parent, { id }, { authUser }) => {
  console.log('id:', id)
  const dataUser = await User.findById(id)
  console.log('data user:', dataUser._id)
  console.log('authUser:', authUser)

  if (dataUser._id !== authUser._id) {
    throw new ForbiddenError('You dont have authorized as owner!')
  }

  return skip
}

module.exports = {
  Query: {
    users: async () => {
      return await User.find()
    },
    user: async (parent, { id }) => {
      return await User.findById(id)
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
      return await User.create({
        ...admin,
        password: bcrypt.hashSync(admin.password, bcrypt.genSaltSync(10)),
        createdBy: authUser,
      })
    }),

    createUser: combineResolvers(isAdmin, async (parent, { user }, { authUser }) => {
      return await User.create({
        ...user,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
        createdBy: authUser,
      })
    }),

    updateUser: combineResolvers(isAuthenticated, isDataOwner, async (parent, { id, user }) => {
      const { password } = user
      var data = { ...user }

      if (password) {
        data = {
          ...user,
          password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
        }
      }

      return await User.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true })
    }),

    updateUserByAdmin: combineResolvers(isAdmin, async (parent, { id, user }) => {
      const { password } = user
      var data = { ...user }

      if (password) {
        data = {
          ...user,
          password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
        }
      }

      return await User.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, new: true })
    }),

    deleteUser: combineResolvers(isAuthenticated, isDataOwner, async (parent, { id }) => {
      return await User.findOneAndDelete({ _id: id })
    }),

    deleteUserByAdmin: combineResolvers(isAdmin, async (parent, { id }) => {
      return await User.findOneAndDelete({ _id: id })
    }),
  },
}
