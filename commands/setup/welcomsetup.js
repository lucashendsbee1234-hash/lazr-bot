const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('welcomesetup')
        .setDescription('Setup welcome system')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Welcome channel')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('autorole')
                .setDescription('Auto role')
                .setRequired(true)
        ),

    async execute(interaction) {

        global.welcomeChannel = interaction
            .options
            .getChannel('channel')
            .id;

        global.autoRole = interaction
            .options
            .getRole('autorole')
            .id;

        await interaction.reply({
            content: 'Welcome system setup complete.',
            ephemeral: true
        });
    }
};