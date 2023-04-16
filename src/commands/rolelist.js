require("dotenv").config()
// Import the SlashCommandBuilder from Discordjs Builders for easier command building 
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('@discordjs/builders');
let messageID;
module.exports = messageID;

module.exports = {
	data: new SlashCommandBuilder()   	// create the slash command
        .setName('rolelist').setDescription('Create role-list in the current channel. Need 5 Roles!')
		.addStringOption(option => option.setName("role1").setDescription('Input the name of the first Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName("role2").setDescription('Input the name of the second Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName("role3").setDescription('Input the name of the third Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName("role4").setDescription('Input the name of the fourth Role').setMaxLength(128).setRequired(true))
		.addStringOption(option => option.setName("role5").setDescription('Input the name of the fifth Role').setMaxLength(128).setRequired(true)),
		async execute(interaction, client) { // method for getting our interaction
			if (interaction.user.id != process.env.ADMIN_USERID_1 && interaction.user.id != process.env.ADMIN_USERID_2) return await interaction.reply({ content:"This Command is only for bot-devs/-admins.", ephemeral:true});
        	else {
				let i_reply = await interaction.reply({ content:"Okay! Creating the role list right here", fetchReply:true, ephemeral:true});
				const channel = await interaction.client.channels.fetch(i_reply.channelId);
				const guild = await interaction.client.guilds.fetch(process.env.DISCORD_GUILD_ID); // have to use the hard coded guild here as for some reasion i_reply.guildId returns null

				const { options } = interaction;

        		const role_names = [`${options.getString("role1")}`,`${options.getString("role2")}`, `${options.getString("role3")}`, `${options.getString("role4")}`, `${options.getString("role5")}`];
				const images = []; // fill up with strings of image links, or make it a subcommand or something idk
				const colors = []; // fill up with HEX colors, or make it a subcommand or something idk
				let role_embeds = [];
				let temp_embed;
				let temp_role_members;
				let n;

				for(let i=0; i<5; i++) {
					temp_embed = new EmbedBuilder() 
						.setColor(0x267509).setThumbnail('https://i.imgur.com/AfFp7pu.png') // Replace with colorsi] images[i]
						.setTitle(role_names[i]).setAuthor({name:`Shows all Members with the '${role_names[i]}' Role`})
						.setTimestamp().setFooter({text: 'Last updated:'});
					console.log({name:guild.roles});
					temp_role_members = guild.roles.cache.find(role => role.name === `${role_names[i]}`).members.map(m=>m.user.tag);
					n = 2;
					for(member in temp_role_members) {n++;
						if(n%3==0) {temp_embed.addFields({name:" ", value:`${member}`, inline:true})}
						else {temp_embed.addFields({name:" ", value:`${member}`, inline:false})}	
					}
					role_embeds.push(temp_embed)
				};
				
				messageID = channel.send({embeds:role_embeds, fetch:true}).id
			}
		}
}