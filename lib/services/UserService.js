const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });

    console.log(user);

    return user;
  }

  static async signIn({ email, password }) {
    try {
      const user = await User.getByEmail(email);

      console.log('!!!!1!!', user);

      if (!user) throw new Error('Invalid email');

      const compare = bcrypt.compareSync(password, user.passwordHash);
      if (compare === false) {
        throw new Error('Invalid Password');
      }

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      console.log('8t283g213v218vc381f');
      error.status = 401;
      throw error;
    }
  }
};
