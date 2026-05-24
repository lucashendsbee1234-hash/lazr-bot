const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('Setup ticket system')
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

        const channel = interaction.options.getChannel('channel');
        const supportRole = interaction.options.getRole('supportrole');

        const embed = new EmbedBuilder()
            .setTitle('Support Tickets')
            .setDescription('Click below to open a ticket.')
            .setColor('#8b5cf6');

        const button = new ButtonBuilder()
            .setCustomId(`ticket_${supportRole.id}`)
            .setLabel('Open Ticket')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(button);

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: 'Ticket system setup complete.',
            ephemeral: true
        });
    }
};