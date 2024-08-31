const discord = require('discord.js')
const welcomergenerator = require('../utils/canvas/welcomeImage')

module.exports = async (member) => {
    const { client } = member;
    const welcomechannelid = "1278839472838017197"
    const channel = await client.channels.fetch(welcomechannelid)

    const buffer = await welcomergenerator(member)
    const attachment = new discord.AttachmentBuilder(buffer, {
        name: "generated-image.png"
    })

    const embed = new discord.EmbedBuilder()
        .setTitle(`${member.user.displayName} bienvenido a la comunidad`)
        .setColor("Blurple")
        .setDescription(`Nos alegramos de recivirte en la comunidad, recuerda ir a <#1275174728742469824> para verificarte`)
        .setImage("attachment://generated-image.png")

    await channel.send({
        content: `<@${member.user.id}>`,
        embeds: [embed],
        files: [attachment]
    })
}