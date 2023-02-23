const ytdl = require('ytdl-core');
const { Player } = require("discord-player");
const config = require('../config');

class MusicPlayer {
    constructor (config) {
        this.max = config.max;
        this.player = null;

        this.queue = [];
    }

    setClient (client) {
        this.client = client;
        this.player = new Player(client);

        this.player.on('trackStart', (queue, trak) => {
            client.channels.cache.get(config.logs.channel).send(`:microphone: Now playing **${track.title}**.`);
        });

        this.player.on('tracksAdd', (queue, track) => {
            client.channels.cache.get(config.logs.channel).send(`:bookmark_tabs: **${track.title}** has been added to the queue.`);
        });
        this.player.on('queueEnd', () => {
            client.channels.cache.get(config.logs.channel).send('The music queue is empty.');
        });
    }

    createQueue (...args) {
        return this.player.createQueue(...args);
    }

    search (...args) {
        return this.player.search(...args);
    }

    connect () {

    }

    isPlaying () {
        return this.playing;
    }

    play (...args) {
        return this.player.play(...args);
    }

    pause () {

    }

    addToQueue () {

    }
}

module.exports = new MusicPlayer({
    max: 50
});