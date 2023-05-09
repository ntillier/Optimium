const Queue = require('./queue')
const { Dms } = require('../database');
const config = require('../config');

const transfers = new Queue();

/*
Dms data scheme:
{
    blocked: boolean,
    threadId: string,
}
*/

transfers.process(async (data, client) => {

    if (data.type === 'from-dms') {
        var userThread = await Dms.get(data.user.id);

        if (!userThread) {
            userThread = {
                blocked: false,
                threadId: null
            };
            await Dms.set(data.user.id, userThread);
        }

        // we do nothing if the user is blocked
        if (userThread.blocked) {
            return true;
        }

        // if there is already a thread
        if (userThread.threadId) {

            // we fetch the thread
            const channel = await client
                .guilds.cache.get(config.dms.guild)
                .channels.fetch(userThread.threadId);

            // if the thread exists, we send the message copy
            if (channel) {
                await channel.send(data.message);
            } else {

                // otherwise we remove the previous thread id from the database, and we repeat the job
                await Dms.set(data.user.id, {
                    threadId: null
                });
                transfers.createJob(data);
            }
        
        // if we don't have a thread for the user
        } else {

            // we send a new message
            const msg = await client.guilds.cache.get(config.dms.guild)
                .channels.cache.get(config.dms.channel)
                .send({
                    content: `${data.user.username}#${data.user.discriminator} sent \n\n${data.message.content}`,
                    fetchReply: true
                });

            // we start a new thread
            const thread = await msg.startThread({
                name: `${data.user.username}#${data.user.discriminator}'s direct messages ${data.user.id}`
            });

            // we save the thread id to the database
            Dms.set(data.user.id, {
                threadId: thread.id
            });
        }


    } else if (data.type === 'to-dms') {
        client.users.cache.get(data.user.id).send(data.message);
    }

    return true;
});

module.exports = transfers;