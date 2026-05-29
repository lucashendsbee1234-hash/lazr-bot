const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("rankrole")
        .setDescription("Set a role reward")
        .addIntegerOption(option =>
            option
                .setName("level")
                .setDescription("Level")
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName("role")
                .setDescription("Role")
                .setRequired(true)
        ),

    async execute(interaction) {

        const level =
            interaction.options.getInteger("level");

        const role =
            interaction.options.getRole("role");

        let data = {};

        if (
            fs.existsSync(
                "./data/rankroles.json"
            )
        ) {

            data = JSON.parse(
                fs.readFileSync(
                    "./data/rankroles.json"
                )
            );
        }

        data[level] = role.id;

        fs.writeFileSync(
            "./data/rankroles.json",
            JSON.stringify(data, null, 2)
        );

        interaction.reply(
            `🏆 Level ${level} now gives ${role}`
        );
    }
};