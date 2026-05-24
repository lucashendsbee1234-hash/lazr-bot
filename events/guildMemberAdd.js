const {
    Events
} = require('discord.js');

module.exports = {

    name: Events.GuildMemberAdd,

    async execute(member) {

        try {

            // AUTO ROLE
            if (global.autoRole) {

                await member.roles
                    .add(global.autoRole)
                    .catch(() => {});
            }

            // WELCOME MESSAGE
            if (global.welcomeChannel) {

                const channel = member.guild.channels.cache.get(
                    global.welcomeChannel
                );

                if (channel) {

                    channel.send(
                        `👋 Welcome ${member} to ${member.guild.name}`
                    );
                }
            }

        } catch (error) {

            console.error(error);
        }
    }
};