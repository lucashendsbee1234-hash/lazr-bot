const { Events } = require('discord.js');
const fs = require("fs");

global.stickyMessages = new Map();

module.exports = {
    name: Events.MessageCreate,

    async execute(message) {

        if (message.author.bot) return;
        if (!message.guild) return;

       // XP COOLDOWN MAP
global.xpCooldowns ??= new Map();

const xpFile = "./data/xp.json";

let data = {};

if (fs.existsSync(xpFile)) {
    data = JSON.parse(fs.readFileSync(xpFile));
}

if (!data[message.author.id]) {
    data[message.author.id] = {
        xp: 0,
        totalXp: 0,
        level: 1
    };
}

const user = data[message.author.id];

// 60 second cooldown
const cooldown = 60000;

const lastXp =
    global.xpCooldowns.get(
        message.author.id
    );

if (
    !lastXp ||
    Date.now() - lastXp >= cooldown
) {

    global.xpCooldowns.set(
        message.author.id,
        Date.now()
    );

    // Random XP gain
    const xpGain =
        Math.floor(
            Math.random() * 6
        ) + 5; // 5-10 XP

    user.xp += xpGain;
    user.totalXp += xpGain;

    const needed =
        Math.floor(
            100 *
            Math.pow(
                user.level,
                1.5
            )
        );

    if (user.xp >= needed) {

        user.level++;
        user.xp = 0;

        // Level-up channel
        if (
            fs.existsSync(
                "./data/rankchannel.json"
            )
        ) {

            const rankData =
                JSON.parse(
                    fs.readFileSync(
                        "./data/rankchannel.json"
                    )
                );

            const levelChannel =
                message.guild.channels.cache.get(
                    rankData.channelId
                );

            if (levelChannel) {

                levelChannel.send(
                    `🎉 ${message.author} reached **Level ${user.level}**!`
                );
            }
        }

        // Rank roles
        if (
            fs.existsSync(
                "./data/rankroles.json"
            )
        ) {

            const rankRoles =
                JSON.parse(
                    fs.readFileSync(
                        "./data/rankroles.json"
                    )
                );

            const rewardRoleId =
                rankRoles[user.level];

            if (rewardRoleId) {

                const role =
                    message.guild.roles.cache.get(
                        rewardRoleId
                    );

                if (role) {

                    await message.member.roles
                        .add(role)
                        .catch(() => {});

                    message.channel.send(
                        `🏆 ${message.author} earned the ${role} role!`
                    );
                }
            }
        }
    }

    fs.writeFileSync(
        xpFile,
        JSON.stringify(data, null, 2)
    );
}
        //////////////////////////////////////////////////
        // AUTOMOD
        //////////////////////////////////////////////////

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

                    await message.delete()
                        .catch(() => {});

                    await message.channel.send(
                        `${message.author}, that message was blocked.`
                    );

                    return;
                }
            }
        }

        //////////////////////////////////////////////////
        // STICKY MESSAGES
        //////////////////////////////////////////////////

        const stickyData =
            global.stickyMessages.get(
                message.channel.id
            );

        if (!stickyData) return;

        try {

            if (stickyData.lastMessageId) {

                const oldMessage =
                    await message.channel.messages
                        .fetch(
                            stickyData.lastMessageId
                        )
                        .catch(() => null);

                if (oldMessage) {

                    await oldMessage.delete()
                        .catch(() => {});
                }
            }

            const newSticky =
                await message.channel.send(
                    stickyData.content
                );

            stickyData.lastMessageId =
                newSticky.id;

        } catch (error) {

            console.error(error);
        }
    }
};