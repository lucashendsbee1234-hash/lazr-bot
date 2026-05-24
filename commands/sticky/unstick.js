const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('unstick')
        .setDescription('Remove sticky'),

    async execute(interaction) {

        global.stickyMessages.delete(interaction.channel.id);

        await interaction.reply({
            content: 'Sticky removed.',
            ephemeral: true
        });
    }
};