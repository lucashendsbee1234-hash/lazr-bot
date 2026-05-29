const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("View all bot commands"),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#a855f7")
            .setTitle("🤖 LazR Hub Help")
            .setDescription(
                "Here are all available community commands."
            )
            .addFields(
                {
                    name: "👤 User Commands",
                    value:
                        "`/avatar` - View a user's avatar\n" +
                        "`/userinfo` - View user information\n" +
                        "`/serverinfo` - View server information"
                },
                {
                    name: "📊 Levels",
                    value:
                        "`/rank` - View your level\n" +
                        "`/leaderboard` - View top members"
                },
                {
                    name: "⚙️ Utility",
                    value:
                        "`/ping` - View bot latency\n" +
                        "`/help` - View this menu"
                }
            )
            .setFooter({
                text: "LazR Hub • Community Bot"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};