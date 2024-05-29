const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
    },
    name: {
        type: String,
        require: [true, "Please enter your name"],
    },
    phone: {
        type: String,
        require: [true, "Please enter your phone number"],
        maxLength: [10, "Phone number length is 10 characters"],
    },
    country: {
        type: String,
        require: [true, "Please enter your country"],
    },
    city: {
        type: String,
        require: [true, "Please enter your city"],
    },
    address: {
        type: String,
        require: [true, "Please enter your address"],
    },
    avatar:{
        type: String,
        default:"https://sme.hust.edu.vn/wp-content/uploads/2022/02/Avatar-Facebook-trang.jpg"
    },
    admin:{
        type: Boolean,
        default: false
    }
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error("incorrect password");
    }
    throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
