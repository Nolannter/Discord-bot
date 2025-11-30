const { MessageEmbed } = require('discord.js');

// you can edit the messages if you want

module.exports = {
    name: 'ban',
    description: 'Ban a user',
         run: async (client, message, args) => {

        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('you cant');  //here
        }


        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('i cant');  //here
        }


        const user = message.mentions.users.first();


        if (!user) {
            return message.channel.send('who?');    //here
        }


        const reason = args.slice(1).join(' ') || 'no reason.'; //here


        message.guild.members.ban(user, { reason })
            .then(() => {

                const embed = new MessageEmbed()
                    .setTitle('User banned')    //here
                    .setDescription(`**${user.tag}** was banned .\nGrund: ${reason}`)   //here
                    .setColor('RED');
                message.channel.send({ embeds: [embed] });
            })
            .catch(error => {

                console.error('Error while banning User:', error);  //here
                message.channel.send('Error, User could not be banned!');   //here
            });
    },
};
