const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Admin Only - Change bot status')
        .addStringOption(option =>
            option
                .setName('text')
                .setDescription('Status')
                .setRequired(true)
        ),

    async execute(interaction, client) {

        const text = interaction.options.getString('text');

        client.user.setActivity(text);

        await interaction.reply({
            content: `Status changed to: ${text}`,
            ephemeral: true
        });
    }
};