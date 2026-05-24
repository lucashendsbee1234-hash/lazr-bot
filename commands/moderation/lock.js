const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Lock channel'),

    async execute(interaction) {

        await interaction.channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: false }
        );

        await interaction.reply('🔒 Channel locked.');
    }
};