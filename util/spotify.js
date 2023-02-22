/* REQUEST */
const https = require('https');
const config = require('../config');

function request(options, body = '') {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let data = '';

            res.on('data', chunk => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    resolve({ error: null, body: JSON.parse(data) });
                } catch (err) {
                    reject({ error: err, body: data });
                }
            })
        });

        req.write(body);
        req.end();
    });
}

/* TOKEN */
const { Settings } = require('../database');

let obj = {
    token: null,
    last: 0
};

function getToken(id, secret) {
    return new Promise((resolve, reject) => {
        if (!id || !secret) {
            throw new Error('You need to specify an id and a secret, in order to access to a secret token.')
        }

        if (new Date().getTime() - obj.last <= 3600000) {
            resolve(obj.token);
        } else {
            const infos = {
                host: 'accounts.spotify.com',
                path: '/api/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64')
                }
            };

            request(infos, 'grant_type=client_credentials')
                .then(dts => {

                    if (!dts.err) {
                        obj = {
                            token: dts.body.access_token,
                            last: new Date().getTime()
                        }
                        Settings.set(config.settings.keys.spotifyToken, obj)
                            .then(() => {
                                console.log('You have a new token!');
                            });
                        resolve(dts.body.access_token);
                    } else {
                        reject(dts.err);
                    }
                });
        }
    });
}

Settings.get(config.settings.keys.spotifyToken)
    .then((o) => {
        if (o) {
            obj = o;
        } else {
            getToken(process.env.SPOTIFY_ID, process.env.SPOTIFY_SECRET).then((t) => obj.token = t);
        }
    });


setInterval(() => {
    getToken(process.env.SPOTIFY_ID, process.env.SPOTIFY_SECRET)
        .then((t) => obj.token = t);
}, 4560000)

exports.search = function (query, type) {
    return new Promise((resolve, reject) => {
        request({
            host: 'api.spotify.com',
            path: `/v1/search?q=${encodeURI(query)}&type=${type || 'track'}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${obj.token}`
            }
        })
            .then((dts) => {
                resolve(dts?.body || dts);
            })
    })
}