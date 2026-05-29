const { SlashCommandBuilder } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Admin Only - Delete messages')
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('Amount')
                .setRequired(true)
        ),

    async execute(interaction) {

        const amount = interaction.options.getInteger('amount');

        await interaction.channel.bulkDelete(amount, true);

        await interaction.reply({
            content: `Deleted ${amount} messages.`,
            ephemeral: true
        });
    }
};

