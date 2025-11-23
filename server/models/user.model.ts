import mongoose from 'mongoose'

import type { IUser } from '../config/interfaces.js';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email already exists'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: [true, 'Email is required']
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required']
  },
  tag: {
    type: String,
    trim: true,
    required: [true, 'Tag is required']
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
    required: [true, 'Password is required']
  }
});

UserSchema.virtual('password')
  .set(function (this: IUser, password: string) {
    this.password = password;
    if (password) {
      // 10 rounds of hashing
      this.passwordHash = Bun.password.hashSync(password, { algorithm: "argon2id", timeCost: 10 });
    }

  })
  .get(function (this: IUser) {
    return this.password;
  });

UserSchema.path('passwordHash').validate(function (this: any) {
  if (this.password && this.password.toString().length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if (this.isNew && !this.password) {
    this.invalidate('password', 'Password is required');
  }
}, undefined);

UserSchema.methods = {
  authenticate: function (plainText: string): boolean {
    if (!this.passwordHash) return false;
    return Bun.password.verifySync(plainText, this.passwordHash);
  },
}
export default mongoose.model('User', UserSchema);
