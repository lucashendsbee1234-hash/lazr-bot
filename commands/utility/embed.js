const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Create embed')
        .addStringOption(option =>
            option
                .setName('title')
                .setDescription('Title')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Description')
                .setRequired(true)
        ),

    async execute(interaction) {

        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor('#8b5cf6');

        await interaction.channel.send({
            embeds: [embed]
        });

        await interaction.reply({
            content: 'Embed created.',
            ephemeral: true
        });
    }
};