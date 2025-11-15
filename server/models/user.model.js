import mongoose from 'mongoose'
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  tag: {
    type: String,
    trim: true,
    required: 'Tag is required'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  avatar_url: {
    type: Buffer,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: 'Password is required'
  },
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    if (password) {
      // 10 rounds of hashing with bcrypt
      this.passwordHash = bcrypt.hashSync(password, 10);
    }

  })
  .get(function () {
    return this._password;
  });

UserSchema.path('passwordHash').validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);

UserSchema.methods = {
  authenticate: function (plainText) {
    if(!this.passwordHash) return false;
    return bcrypt.compareSync(plainText, this.passwordHash);
  },
}
export default mongoose.model('User', UserSchema);


