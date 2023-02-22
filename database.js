const { open } = require('lmdb');
const LRU = require('lru-cache');

/* CACHES */
const usersCache = new LRU({
    maxSize: 500,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60,
});

const guildsCache = new LRU({
    maxSize: 100,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60,
});

const settingsCache = new LRU({
    maxSize: 100,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60,
});

const messagesCache = new LRU({
    maxSize: 200,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60,
});

/* DATABASES */
const database = open({
    path: './database',
    compression: true,
});

const settings = database.openDB('settings');
const guilds = database.openDB('guilds');
const users = database.openDB('users');
const messages = database.openDB('messages');

/* DATA WRAPPER CLASS */
class DataWrapper {
    constructor(db, cache) {
        this.db = db;
        this.cache = cache;
    }

    async get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const val = await this.db.get(key);
        if (val) {
            this.cache.set(key, val);
        }
        return val;
    }

    async set(key, data) {
        const item = Object.assign(await this.get(key) || {}, data);
        this.db.putSync(key, item);
        this.cache.set(key, item);
        return item;
    }

    clear() {
        return this.db.clearSync();
    }
}

/* DATA WRAPPER INSTANCES */
const guildsWrapper = new DataWrapper(guilds, guildsCache);
const usersWrapper = new DataWrapper(users, usersCache);
const messagesWrapper = new DataWrapper(messages, messagesCache);
const settingsWrapper = new DataWrapper(settings, settingsCache);

/* EXPORTS */
exports.Guilds = guildsWrapper;
exports.Users = usersWrapper;
exports.Messages = messagesWrapper;
exports.Settings = settingsWrapper;