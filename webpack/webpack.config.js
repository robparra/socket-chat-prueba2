const path = require('path');

module.exports = {
    entry: {
        event: './client/js/event.js',
        socketChat: './client/js/socket-chat.js',
        emojionearea: './client/js/emojionearea.min.js',
        //socketChatJquery: './client/js/socket-chat-jquery.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./client/public/js', ''),
    },
}; 