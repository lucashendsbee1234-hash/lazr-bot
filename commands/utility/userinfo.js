const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('User info')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User')
                .setRequired(true)
        ),

    async execute(interaction) {

        const user = interaction.options.getUser('user');

        const embed = new EmbedBuilder()
            .setTitle(user.tag)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                { name: 'ID', value: user.id },
                { name: 'Created', value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>` }
            )
            .setColor('#8b5cf6');

        await interaction.reply({
            embeds: [embed]
        });
    }
};
