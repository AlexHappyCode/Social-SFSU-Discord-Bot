import { SlashCommandBuilder } from "@discordjs/builders";
import { AutocompleteInteraction } from "discord.js";


//comment
module.exports = {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with Hello!"),

  async execute(interaction: any) {
    await interaction.deferReply();
    return interaction.editReply({
      content: `Hello ${interaction.user.username}!`,
      ephemeral: true,
    });
  },

  async autocomplete(interaction : AutocompleteInteraction) {
    interaction.respond(
      [{
          name: "test",
          value: "test",
        },
        {
          name: "test2",
          value: "test2",
        },
    ])}
}

export {}
