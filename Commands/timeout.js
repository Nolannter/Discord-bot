const { Permissions } = require('discord.js');

module.exports = {
    name: 'timeout',
    description: 'Set a timeout for messages or users in text or voice channels',
    usage: '-timeout <duration> [text|voice]',
    run: async (client, message, args) => {

        if (!message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return message.reply('You cant.');
        }

        const duration = args.shift();
        const channelType = args.join(' ').toLowerCase();

        if (!duration || isNaN(duration)) {
            return message.reply('For how long?');
        }

        const timeoutMilliseconds = parseInt(duration) * 1000;

        const target = message.mentions.members.first();

        if (!target) {
            return message.reply('Please mention the member you want to timeout.');
        }

        if (target.user.bot) {
            return message.reply('You cannot timeout bots.');
        }

        if (target.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) {
            return message.reply('You cannot timeout this member because they have a higher or equal role to you.');
        }

        const channelTypes = ['text', 'voice'];
        const validChannelType = channelTypes.includes(channelType);

        if (!validChannelType || !channelType) {
            message.guild.channels.cache.forEach(channel => {
                if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_VOICE') {
                    setTimeout(() => channel.permissionOverwrites.create(target, {
                        SEND_MESSAGES: true,
                        SPEAK: true
                    }), timeoutMilliseconds);
                }
            });
        } else {
            const targetType = channelType === 'text' ? 'GUILD_TEXT' : 'GUILD_VOICE';
            message.guild.channels.cache
                .filter(channel => channel.type === targetType)
                .forEach(channel => {
                    setTimeout(() => channel.permissionOverwrites.create(target, {
                        SEND_MESSAGES: targetType === 'GUILD_TEXT',
                        SPEAK: targetType === 'GUILD_VOICE'
                    }), timeoutMilliseconds);
                });
        }

        message.reply(`The silence will last for ${duration}.`);
    },
};
