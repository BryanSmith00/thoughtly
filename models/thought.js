const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    },
    reposts: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model('thought', thoughtSchema);