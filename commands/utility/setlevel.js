const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("setlevel")
        .setDescription("Admin Only - Set a user's level")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("User")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("level")
                .setDescription("Level")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.Administrator
        ),

    async execute(interaction) {

        const user =
            interaction.options.getUser("user");

        const level =
            interaction.options.getInteger("level");

        const xpFile = "./data/xp.json";

        let data = {};

        if (fs.existsSync(xpFile)) {
            data = JSON.parse(
                fs.readFileSync(xpFile)
            );
        }

        data[user.id] = {
            level: level,
            xp: 0
        };

        fs.writeFileSync(
            xpFile,
            JSON.stringify(data, null, 2)
        );

        await interaction.reply({
            content:
                `✅ Set ${user}'s level to **${level}**`,
            ephemeral: true
        });
    }
};