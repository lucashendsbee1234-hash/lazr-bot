const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('🔒 Owner Only • Setup ticket system')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Ticket channel')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('supportrole')
                .setDescription('Support role')
                .setRequired(true)
        ),

    async execute(interaction) {

        const channel =
            interaction.options.getChannel('channel');

        const supportRole =
            interaction.options.getRole('supportrole');

        const embed = new EmbedBuilder()
            .setTitle('🎟️ Support Tickets')
            .setDescription(
`Need help?

Choose a reason from the menu below and a ticket will be created automatically.

💰 Purchase Support
🤖 Bot Support
🌐 Website Support
❓ General Help
📝 Other`
            )
            .setColor('#8b5cf6');

        const menu =
            new StringSelectMenuBuilder()
                .setCustomId(`ticket_reason_${supportRole.id}`)
                .setPlaceholder('Select a reason')
                .addOptions(
                    {
                        label: 'Purchase Support',
                        value: 'purchase',
                        emoji: '💰'
                    },
                    {
                        label: 'Bot Support',
                        value: 'bot',
                        emoji: '🤖'
                    },
                    {
                        label: 'Website Support',
                        value: 'website',
                        emoji: '🌐'
                    },
                    {
                        label: 'General Help',
                        value: 'help',
                        emoji: '❓'
                    },
                    {
                        label: 'Other',
                        value: 'other',
                        emoji: '📝'
                    }
                );

        const row =
            new ActionRowBuilder()
                .addComponents(menu);

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: '✅ Ticket system setup complete.',
            ephemeral: true
        });
    }
};