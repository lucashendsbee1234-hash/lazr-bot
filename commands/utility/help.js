const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View bot commands"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setTitle("🤖 LazR Verify Help")
            .setDescription("Available commands")
            .addFields(
                {
                    name: "/serverinfo",
                    value: "See info on server"
                },
                {
                    name: "/avatar",
                    value: "Get a user's PFP"
                },
                {
                    name: "/ping",
                    value: "Shows bot ping"
                },
                {
                    name: "/userinfo",
                    value: "Get info on a user"
                }
            );

        await interaction.reply({
            embeds: [embed]
        });
    }
};