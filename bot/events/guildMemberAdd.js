module.exports.run = async (client, member) => {
  let canal = member.guild.channels.find(r => r.name == "「✉」logs");
  canal.send("Bievenido " + member)
}