const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;


const UserSchema = Schema({
    username: String,
    password: {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique: true,
        required : true
    },
    location: String,
    bio: String,
    githubUsername: String,
    picture: String,
    website: String,
    githubId: Number,
    hireable: Number
}, { timestamps: { createdAt: 'created_at' }, strict: true });


const User = mongoose.model('User', UserSchema);

module.exports = User;