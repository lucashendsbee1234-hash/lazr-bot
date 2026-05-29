const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Admin Only - Close ticket'),

    async execute(interaction) {

        await interaction.reply('Closing ticket...');

        setTimeout(() => {

            interaction.channel.delete().catch(() => {});

        }, 3000);
    }
};