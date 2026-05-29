const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('stick')
        .setDescription('Admin Only - Sticky message')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Message')
                .setRequired(true)
        ),

    async execute(interaction) {

        global.stickyMessages.set(interaction.channel.id, {
            content: interaction.options.getString('message'),
            lastMessageId: null
        });

        await interaction.reply({
            content: 'Sticky enabled.',
            ephemeral: true
        });
    }
};