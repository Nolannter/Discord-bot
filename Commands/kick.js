const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kick a user',
    run: async (client, message, args) => {

        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('You cant.');
        }


        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('I cant.');
        }


        const user = message.mentions.members.first();
        if (!user) {
            return message.channel.send('Who?');
        }


        if (user.id === message.author.id) {
            return message.channel.send('You cant kick yourself.');
        }

        if (user.id === client.user.id) {
            return message.channel.send('I cant kick myself.');
        }


        const reason = args.slice(1).join(' ') || 'no reason.';


        try {
            await user.kick(reason);
            const embed = new MessageEmbed()
                .setTitle('User kicked')
                .setDescription(`${user.user.tag} was kicked.`)
                .addField('reason:', reason)
                .setColor('ORANGE');
            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Error while kicking:', error);
            message.channel.send('Error while kicking.');
        }
    },
};