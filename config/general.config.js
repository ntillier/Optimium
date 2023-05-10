module.exports = {
    settings: {
        keys: {
            badWords: 'badwords',
            spotifyToken: 'spotity_token'
        }
    },
    dms: {
        guild: '1075514214984196231',
        channel: '1105155371393359872'
    },
    logs: {
        guild: '1075514214984196231',
        channel: '1077701418422636657'
    },
    filter: {
        enabled: true,
        message: '<@{{ message.author.id }}> sent a message with some profane language\n{{ cleaned }}',
        placeholder: '\\*'
    },
    sentences: {
        hello: [
            'Hello world!',
            'Yo!',
            'Bonjour!',
            'Nice to meet you!',
            'Hello!',
            'Ciao!',
            'Hola!',
            'How\'re you doing?',
            'Hi!',
            'Nice to see you!',
            'What\'s up?',
            'Hello, I am Optimium',
            'What do you need?',
            'Need somthing?',
            'Ho hi :sleeping:',
            'It\'s me!'
        ]
    }
};