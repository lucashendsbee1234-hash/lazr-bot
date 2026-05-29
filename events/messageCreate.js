const { Events } = require('discord.js');
const fs = require("fs");

global.stickyMessages = new Map();

module.exports = {
    name: Events.MessageCreate,

    async execute(message) {

        if (message.author.bot) return;

        // XP SYSTEM
        const xpFile = "./data/xp.json";

        let data = {};

        if (fs.existsSync(xpFile)) {
            data = JSON.parse(fs.readFileSync(xpFile));
        }

        if (!data[message.author.id]) {
            data[message.author.id] = {
                xp: 0,
                level: 1
            };
        }

        data[message.author.id].xp += 5;

        const needed =
            data[message.author.id].level * 100;

        if (data[message.author.id].xp >= needed) {

            data[message.author.id].level++;

            data[message.author.id].xp = 0;

            message.channel.send(
                `🎉 ${message.author} reached level ${data[message.author.id].level}!`
            );
        }

        fs.writeFileSync(
            xpFile,
            JSON.stringify(data, null, 2)
        );

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
        const stickyData =
            global.stickyMessages.get(message.channel.id);

        if (!stickyData) return;

        try {

            if (stickyData.lastMessageId) {

                const oldMessage =
                    await message.channel.messages
                        .fetch(stickyData.lastMessageId)
                        .catch(() => null);

                if (oldMessage) {
                    await oldMessage.delete().catch(() => {});
                }
            }

            const newSticky =
                await message.channel.send(
                    `${stickyData.content}`
                );

            stickyData.lastMessageId =
                newSticky.id;

        } catch (error) {

            console.error(error);
        }
    }
};