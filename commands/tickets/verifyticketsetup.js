const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('verifyticketsetup')
        .setDescription('🔒 Owner Only • Create verify ticket panel'),

    async execute(interaction) {

        const button = new ButtonBuilder()
            .setCustomId('verify_ticket')
            .setLabel('Open Verify Ticket')
            .setStyle(ButtonStyle.Success);

        const row =
            new ActionRowBuilder()
                .addComponents(button);

        await interaction.channel.send({
            content:
`✅ **Verification Support**

Having trouble getting verified?

Click the button below and a verification support ticket will be created.`,
            components: [row]
        });

        await interaction.reply({
            content: '✅ Verify ticket panel created.',
            ephemeral: true
        });
    }
};