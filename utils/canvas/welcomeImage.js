const { GuildMember } = require('discord.js')
const { createCanvas, registerFont, loadImage} = require('canvas')
const defaulticon = "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-0.png"
const backgroundpath = "./assets/images/background.png"
const fontpath = "./assets/fonts/Quicksand_Bold.ttf"
const subtitle = "Bienvenid@ a Barcelona RP!"
const avatarRadius = 150

registerFont(fontpath, {family: "Quicksand"})

/**
* Retorna un buffer de la imagen de bienvenida
* @param {GuildMember} member
*/

module.exports = async (member) => {
    const username = member.user.username
    const avatar = member.user.avatarURL({size: 256, extension: "png"})

    const canvas = createCanvas(1200, 600)
    const ctx = canvas.getContext('2d')

    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
    ctx.shadowBlur = 15
    ctx.shadowOffsetX = 5
    ctx.shadowOffsetY = 5

    const margin = 20
    const background = await loadImage(backgroundpath)
    
    ctx.drawImage(background, margin, margin, canvas.width - margin * 2, canvas.height - margin * 2 );
    
    ctx.font = "80px Quicksand"
    ctx.fillStyle = "white"

    ctx.shadowColor = "rgba(0, 0, 0, 0.8)"
    ctx.shadowBlur = 5

    const usernameMetrics = ctx.measureText(username)
    ctx.fillText(username, canvas.width / 2 - usernameMetrics.width / 2, (canvas.height * 3) / 4); 

    ctx.font = "50px Quicksand"
    ctx.fillStyle = "white"

    const subtitlemetrics = ctx.measureText(subtitle)

    ctx.fillText(
        subtitle,
        canvas.width / 2 - subtitlemetrics.width / 2,
        (canvas.height * 3 ) / 4 + 60 
    )

    const avatarimage = await loadImage(avatar)

    ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
    ctx.shadowBlur = 15

    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 3, avatarRadius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    
    ctx.shadowColor = "transparent"


    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 3, avatarRadius - 5, 0, Math.PI * 2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(
        avatarimage,
        canvas.width / 2 - avatarRadius -5,
        canvas.height / 3 - avatarRadius -5,
        avatarRadius * 2,
        avatarRadius * 2
    )

    return canvas.toBuffer()
}