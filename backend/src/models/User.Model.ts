import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/Env";  // Make sure to import JWT_SECRET from your environment

// Interface for the user document
interface IUser extends Document {
  email: string;
  password: string;
  isValidPassword(password: string): Promise<boolean>;
  generateJWT(): string;
}

// Schema definition
const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [5, "Email must be at least 5 characters"],
      maxlength: [50, "Email must be at most 50 characters"],
    },
    password: {
      type: String,
      required: true,
      select: false, // Do not return the password by default in queries
    },
  },
  { timestamps: true }
);

// Hash the password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Validate password
UserSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token
UserSchema.methods.generateJWT = function (): string {
  const token = jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET!,  // Make sure you have JWT_SECRET defined in your environment
    { expiresIn: '1h' }
  );
  return token;
};

// Model definition
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
