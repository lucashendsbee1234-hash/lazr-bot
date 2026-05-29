const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Admin Only - Enable automod'),

    async execute(interaction) {

        global.automodEnabled = true;

        await interaction.reply({
            content: 'Automod enabled.',
            ephemeral: true
        });
    }
};