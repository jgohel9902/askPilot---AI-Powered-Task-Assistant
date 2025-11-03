import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Guest' },
    email: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', UserSchema);
