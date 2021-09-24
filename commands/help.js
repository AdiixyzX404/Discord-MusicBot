const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "menu",
  description: "Pimtur botz:v",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "menu"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `[ ${client.user.username} ]`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `woi. mau dapatin ingfo pimtur? ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }menu [command]`
            ).setDescription(`${Commands.join("\n")}
  
  versi : ${require("../package.json").version}
  [Itsuki Bot Server](${
    client.botconfig.SupportServer
  }) | [Esce](https://xnxx.com/) | Created by [Itsuki](https://github.com/Adiixyz)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | nggk bisa cari command itu:v`);

      let embed = new MessageEmbed()
        .setAuthor(`pimtur: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Pemrifix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "menu",
        description: "Pimtur bot lah:/",
        value: "menu",
        type: 3,
        required: false
      },
    ],
    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `- [ ${client.user.username} ] -`,
              client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
              `mendapatkan ingfo pimtur : ${
                GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
              }menu [command]`
            ).setDescription(`${Commands.join("\n")}
  
  versi : v${require("../package.json").version}
  [Itsuki Botz Server](${
    client.botconfig.SupportServer
  }) | [Esce bot](https://xnxx.com) | Created by [Itsuki](https://github.com/Adiixyz)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | yo ndak tau kok tanya saya.`);
  
        let embed = new MessageEmbed()
          .setAuthor(`pimtur: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Pemrifix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};
