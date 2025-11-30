module.exports = {
    name: 'delete',
    description: 'Delete messages',
         run: async (client, message, args) => {
        
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            return message.reply('You cant.');
        }

        
        const amount = parseInt(args[0]);

        if (isNaN(amount)) {
            return message.reply('A whole number.');
        } else if (amount <= 0 || amount > 200) {
            return message.reply('Chill, only 0 - 200 messages');
        }

       
        message.channel.bulkDelete(amount)
            .then(messages => {
                message.channel.send(`${messages.size} deleted.`)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000); 
                    })
                    .catch(console.error);
            })
            .catch(error => {
                console.error('Error while deleting:', error);
                message.reply('Error while deleting!');
            });
    },
};
