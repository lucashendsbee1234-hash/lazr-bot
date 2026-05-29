const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Admin Only - Bot says message')
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Message')
                .setRequired(true)
        ),

    async execute(interaction) {

        const message = interaction.options.getString('message');

        await interaction.channel.send(message);

        await interaction.reply({
            content: 'Message sent.',
            ephemeral: true
        });
    }
};