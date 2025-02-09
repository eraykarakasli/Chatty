const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    status: {
      type: String,
      default: "Tanımsız",
      required: true,
    },
    category: {
      type: String,
      default: "Yok",
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword= async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){
  if (!this.isModified) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

module.exports = User;