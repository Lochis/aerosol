import mongoose from "mongoose";
import type { IUser } from "../config/interfaces.js";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exists"],
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: [true, "Email is required"],
  },
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },
  tag: {
    type: String,
    trim: true,
    required: [true, "Tag is required"],
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

// On utilise un champ interne _plainPassword pour éviter la récursion
UserSchema.virtual("password")
  .set(function (this: IUser & { _plainPassword?: string }, password: string) {
    // garder le mot de passe brut juste pour la validation
    this._plainPassword = password;

    if (password) {
      // 10 rounds of hashing avec Bun
      this.passwordHash = Bun.password.hashSync(password, {
        algorithm: "argon2id",
        timeCost: 10,
      });
    }
  })
  .get(function (this: IUser & { _plainPassword?: string }) {
    return this._plainPassword;
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
