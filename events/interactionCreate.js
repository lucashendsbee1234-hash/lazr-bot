const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction, client) {

        // SLASH COMMANDS
        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;
const OWNER_ID = "1325169208581030010";

const ownerCommands = [
    "verifysetup",
    "ticketsetup",
    "automod",
    "close",
    "stick",
    "unstick",
    "status",
    "say",
    "embed",
    "lock",
    "unlock",
    "ranksetup",
    "setlevel",
    "givexp",
    "resetlevel",
    "rankrole",
    "welcomesetup",
    "verifyticketsetup"
];

if (
    ownerCommands.includes(interaction.commandName) &&
    interaction.user.id !== OWNER_ID
) {
    return interaction.reply({
        content: "❌ This command is owner only.",
        ephemeral: true
    });
}

            try {

                await command.execute(interaction, client);

            } catch (error) {

                console.error(error);

                if (interaction.replied || interaction.deferred) {

                    await interaction.followUp({
                        content: 'There was an error.',
                        ephemeral: true
                    });

                } else {

                    await interaction.reply({
                        content: 'There was an error.',
                        ephemeral: true
                    });
                }
            }
        }
if (interaction.isStringSelectMenu()) {

    if (interaction.customId.startsWith("ticket_reason_")) {

        const reason = interaction.values[0];

        const supportRoleId =
            interaction.customId.split("_")[2];

        const existingChannel =
            interaction.guild.channels.cache.find(
                c =>
                    c.name ===
                    `ticket-${interaction.user.username.toLowerCase()}`
            );

        if (existingChannel) {

            return interaction.reply({
                content: "You already have a ticket open.",
                ephemeral: true
            });
        }

        const channel =
            await interaction.guild.channels.create({

                name: `ticket-${interaction.user.username}`,

                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages']
                    },
                    {
                        id: supportRoleId,
                        allow: ['ViewChannel', 'SendMessages']
                    }
                ]
            });

        const {
            ActionRowBuilder,
            ButtonBuilder,
            ButtonStyle
        } = require('discord.js');

        const closeButton = new ButtonBuilder()
            .setCustomId('close_ticket')
            .setLabel('Close Ticket')
            .setStyle(ButtonStyle.Danger);

        const row =
            new ActionRowBuilder()
                .addComponents(closeButton);

        const reasons = {
            purchase: "💰 Purchase Support",
            bot: "🤖 Bot Support",
            website: "🌐 Website Support",
            help: "❓ General Help",
            other: "📝 Other"
        };

        await channel.send({
            content:
`📋 **Ticket Information**

👤 User: ${interaction.user}

📂 Reason:
${reasons[reason]}

Please explain your issue below and a staff member will assist you shortly.`,
            components: [row]
        });

        return interaction.reply({
            content: `✅ Ticket created: ${channel}`,
            ephemeral: true
        });
    }
}
        // BUTTONS
        if (interaction.isButton()) {

            // VERIFY BUTTON
            if (interaction.customId.startsWith('verify_')) {

                const roleId = interaction.customId.split('_')[1];

                await interaction.member.roles.add(roleId);

                return interaction.reply({
                    content: 'You are now verified.',
                    ephemeral: true
                });
            }


            // VERIFY TICKET BUTTON
if (interaction.customId === 'verify_ticket') {

    const existingChannel =
        interaction.guild.channels.cache.find(
            c =>
                c.name ===
                `verify-${interaction.user.username.toLowerCase()}`
        );

    if (existingChannel) {

        return interaction.reply({
            content: 'You already have a verification ticket open.',
            ephemeral: true
        });
    }

    const channel =
        await interaction.guild.channels.create({

            name: `verify-${interaction.user.username}`,

            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['ViewChannel']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages']
                }
            ]
        });

    const {
        ActionRowBuilder,
        ButtonBuilder,
        ButtonStyle
    } = require('discord.js');

    const closeButton = new ButtonBuilder()
        .setCustomId('close_ticket')
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Danger);

    const row =
        new ActionRowBuilder()
            .addComponents(closeButton);

    await channel.send({
        content:
`✅ **Verification Support Ticket**

Welcome ${interaction.user}!

Please explain:
• What happened?
• What verification step failed?
• Include screenshots if possible.

A staff member will help you shortly.`,
        components: [row]
    });

    return interaction.reply({
        content: `Verification ticket created: ${channel}`,
        ephemeral: true
    });
}
            // CLOSE BUTTON
            if (interaction.customId === 'close_ticket') {

                await interaction.reply('Closing ticket...');

                setTimeout(() => {

                    interaction.channel.delete().catch(() => {});

                }, 3000);
            }
        }
    }
};