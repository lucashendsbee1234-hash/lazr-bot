const {
    Events
} = require('discord.js');

global.stickyMessages = new Map();

module.exports = {

    name: Events.MessageCreate,

    async execute(message) {

        if (message.author.bot) return;

        // AUTOMOD
        if (global.automodEnabled) {

            const blocked = [
                '@everyone',
                'discord.gg/',
                'free nitro',
                'bit.ly'
            ];

            for (const word of blocked) {

                if (
                    message.content
                        .toLowerCase()
                        .includes(word)
                ) {

                    await message.delete().catch(() => {});

                    await message.channel.send(
                        `${message.author}, that message was blocked.`
                    );

                    return;
                }
            }
        }

        // STICKY MESSAGES
        const stickyData = global.stickyMessages.get(message.channel.id);

        if (!stickyData) return;

        try {

            if (stickyData.lastMessageId) {

                const oldMessage = await message.channel.messages
                    .fetch(stickyData.lastMessageId)
                    .catch(() => null);

                if (oldMessage) {
                    await oldMessage.delete().catch(() => {});
                }
            }

            const newSticky = await message.channel.send(
                ` ${stickyData.content}`
            );

            stickyData.lastMessageId = newSticky.id;

        } catch (error) {

            console.error(error);
        }
    }
};