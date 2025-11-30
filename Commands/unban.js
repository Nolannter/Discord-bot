const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    description: 'Unban a user',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('You cant.');
        }

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('I cant.');
        }

        if (!args[0]) {
            return message.channel.send('Please provide the ID or mention the user you want to unban.');
        }

        let userId = args[0].replace(/\D/g, '');
        if (!userId) {
            const user = message.mentions.users.first();
            if (user) {
                userId = user.id;
            }
        }

        if (!userId) {
            return message.channel.send('Invalid user ID or mention.');
        }

        message.guild.members.unban(userId)
            .then(() => {
                client.users.fetch(userId)
                    .then(bannedUser => {
                        const embed = new MessageEmbed()
                            .setTitle('User Unbanned')
                            .setDescription(`<@${bannedUser.id}> (${bannedUser.tag}) has been successfully unbanned.`)
                            .setColor('GREEN');
                        message.channel.send({ embeds: [embed] });
                    })
                    .catch(error => {
                        console.error('Error fetching user:', error);
                        message.channel.send('Error. The user could not be unbanned. :middle_finger: Maybe they are already unbanned?');
                    });
            })
            .catch(error => {
                if (error.message.includes('Unknown Ban')) {
                    message.guild.members.fetch(userId)
                        .then(bannedUser => {
                            message.channel.send(`<@${bannedUser.user.id}> is already unbanned.`);
                        })
                        .catch(err => {
                            console.error('Error fetching unbanned user:', err);
                            message.channel.send('Error. The user could not be unbanned.');
                        });
                } else {
                    console.error('Error unbanning user:', error);
                    message.channel.send('Error. The user could not be unbanned.');
                }
            });

    },
};
