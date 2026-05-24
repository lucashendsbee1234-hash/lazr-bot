const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Server info'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle(interaction.guild.name)
            .addFields(
                { name: 'Members', value: `${interaction.guild.memberCount}` },
                { name: 'Server ID', value: interaction.guild.id }
            )
            .setThumbnail(interaction.guild.iconURL())
            .setColor('#8b5cf6');

        await interaction.reply({
            embeds: [embed]
        });
    }
};