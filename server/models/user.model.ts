import mongoose from "mongoose";
import type { IUser } from "../config/interfaces.js";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: [true, 'Email already exists'],
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: [true, 'Email is required'],
    maxLength: 64,
  },
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    maxLength: 32,
  },
  tag: {
    type: String,
    trim: true,
    required: [true, 'Tag is required'],
    maxLength: 32,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // ⚠️ important : plus de Buffer ici → string (URL) si un jour tu l’utilises
  avatar_url: {
    type: String,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, "Password is required"],
  },
});

UserSchema.virtual('password')
  .set(function (this: IUser, password: string) {
    this._password = password;
    if (password) {
      // 10 rounds of hashing
      this.passwordHash = Bun.password.hashSync(password, { algorithm: "argon2id", timeCost: 10 });
    }

    if (password) {
      // 10 rounds of hashing avec Bun
      this.passwordHash = Bun.password.hashSync(password, {
        algorithm: "argon2id",
        timeCost: 10,
      });
    }
  })
  .get(function (this: IUser) {
    return this._password;
  });

// Validation sur le mot de passe
UserSchema.path("passwordHash").validate(function (this: any) {
  const password: string | undefined = this._plainPassword;

  if (password && password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !password) {
    this.invalidate("password", "Password is required");
  }
}, undefined);

// Méthodes d'instance
UserSchema.methods = {
  authenticate: function (plainText: string): boolean {
    if (!this.passwordHash) return false;
    return Bun.password.verifySync(plainText, this.passwordHash);
  },
};

// ⚠️ IMPORTANT : éviter OverwriteModelError avec bun --hot
export default mongoose.models.User || mongoose.model("User", UserSchema);
