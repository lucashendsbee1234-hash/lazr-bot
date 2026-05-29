const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ranksetup")
        .setDescription("Admin Only - Set the level-up channel")
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("Channel for level-up messages")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),

    async execute(interaction) {

        const channel =
            interaction.options.getChannel("channel");

        const data = {
            channelId: channel.id
        };

        fs.writeFileSync(
            "./data/rankchannel.json",
            JSON.stringify(data, null, 2)
        );

        await interaction.reply({
            content: `✅ Rank-up messages will now be sent in ${channel}`,
            ephemeral: true
        });
    }
};