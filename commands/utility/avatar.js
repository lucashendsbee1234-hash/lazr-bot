const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get avatar')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User')
                .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('user');

        await interaction.reply(
            user.displayAvatarURL({ size: 4096 })
        );
    }
};