import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('users', UserSchema);

export default User;
