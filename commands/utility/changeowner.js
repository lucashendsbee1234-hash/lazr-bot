const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("changeowner")
        .setDescription("Admin Only - Transfer bot ownership")
        .addStringOption(option =>
            option
                .setName("userid")
                .setDescription("New owner's user ID")
                .setRequired(true)
        ),

    async execute(interaction) {

        const config =
            JSON.parse(
                fs.readFileSync("./data/config.json")
            );

        if (
            interaction.user.id !== config.ownerId
        ) {
            return interaction.reply({
                content: "❌ Only the current owner can do this.",
                ephemeral: true
            });
        }

      const newOwnerId =
    interaction.options.getString("userid");

const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`confirm_owner_${newOwnerId}`)
            .setLabel("Confirm")
            .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
            .setCustomId("cancel_owner")
            .setLabel("Cancel")
            .setStyle(ButtonStyle.Danger)
    );

await interaction.reply({
    content:
`⚠️ Transfer ownership to <@${newOwnerId}>?`,
    components: [row],
    ephemeral: true
});
    }
};