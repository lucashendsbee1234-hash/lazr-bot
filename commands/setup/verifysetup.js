const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('verifysetup')
        .setDescription('Setup verification')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Verification channel')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('Role to give')
                .setRequired(true)
        ),

    async execute(interaction) {

        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('role');

        const embed = new EmbedBuilder()
            .setTitle('Verification')
            .setDescription('Click the button below to verify.')
            .setColor('#8b5cf6');

        const button = new ButtonBuilder()
            .setCustomId(`verify_${role.id}`)
            .setLabel('Verify')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: 'Verification setup complete.',
            ephemeral: true
        });
    }
};