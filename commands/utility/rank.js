const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("View your rank"),

    async execute(interaction) {

        const data = JSON.parse(
            fs.readFileSync("./data/xp.json")
        );

        const user = data[interaction.user.id];

        if (!user) {

            return interaction.reply({
                content: "❌ You don't have any XP yet.",
                ephemeral: true
            });
        }

        const needed =
            Math.floor(
                100 * Math.pow(user.level, 1.5)
            );

        const xpPerMessage =
            Math.max(
                2,
                5 - Math.floor(user.level / 10)
            );

        const progress =
            Math.min(
                10,
                Math.floor((user.xp / needed) * 10)
            );

        const bar =
            "🟪".repeat(progress) +
            "⬛".repeat(10 - progress);

        const messagesLeft =
            Math.ceil(
                (needed - user.xp) / xpPerMessage
            );

        const embed = new EmbedBuilder()
            .setColor("#a855f7")
            .setTitle(`🏆 ${interaction.user.username}'s Rank`)
            .setThumbnail(
                interaction.user.displayAvatarURL()
            )
            .addFields(
                {
                    name: "⭐ Level",
                    value: `${user.level}`,
                    inline: true
                },
                {
                    name: "✨ XP",
                    value: `${user.xp}/${needed}`,
                    inline: true
                },
                {
                    name: "💬 XP Per Message",
                    value: `${xpPerMessage}`,
                    inline: true
                },
                {
                    name: "📈 Progress",
                    value: `${bar}\n${Math.floor((user.xp / needed) * 100)}%`,
                    inline: false
                },
                {
                    name: "🎯 Messages Until Level Up",
                    value: `${messagesLeft}`,
                    inline: false
                },
                {
                    name: "💎 Total XP",
                    value: `${user.totalXp || 0}`,
                    inline: true
                }
            )
            .setFooter({
                text: "Keep chatting to earn XP!"
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};