module.exports = {
    name: 'say',
    description: 'Lets the bot say something.',
    run: async (client, message, args) => {

        if (!args.length) {
            return message.channel.send('what?.');
        }


        message.channel.send(args.join(' '))
            .then(() => {

                message.delete()
                    .catch(error => console.error('No permissions:', error));
            })
            .catch(error => console.error('Error while sending a message:', error));
    },
};