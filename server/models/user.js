import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fprofile&psig=AOvVaw2zbLPT4Ba0v5mswU2L1b2y&ust=1706465828139000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLDx3uGW_oMDFQAAAAAdAAAAABAD",
    },
  },
  { timestamps: true }
);

const USER = mongoose.model("USER", userSchema);

export default USER;
