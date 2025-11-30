const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'luck',
    description: 'Rolls one or more dice or plays heads or tails.',
    usage: 'luck [dice amount]',
    run: async (client, message, args) => {
        if (!args.length) {
            return message.channel.send('What do you want. Either -luck "dice" or -luck "heads".');
        }

        const subCommand = args[0].toLowerCase();

        if (subCommand === 'dice') {
            let diceCount = 1;
            if (args.length > 1) {
                diceCount = parseInt(args[1]);
                if (isNaN(diceCount) || diceCount < 1 || diceCount > 6) {
                    return message.channel.send('I only have 6 dice.');
                }
            }

            const results = [];
            for (let i = 0; i < diceCount; i++) {
                const result = Math.floor(Math.random() * 6) + 1;
                results.push(result);
            }

            const embed = new MessageEmbed()
                .setTitle('Dice Result')
                .setDescription(`You rolled ${diceCount > 1 ? 'the dice' : 'one die'}.`)
                .addField('Results', results.join(', '))
                .setColor('BLACK');

            message.channel.send({ embeds: [embed] });
        } else if (subCommand === 'heads') {
            const result = Math.random() < 0.5 ? 'Heads' : 'Tails';

            const embed = new MessageEmbed()
                .setTitle('Heads or Tails')
                .setDescription(`You chose heads or tails.\nThe result is ${result}.`)
                .setColor('BLACK');

            message.channel.send({ embeds: [embed] });
        } else {
            return message.channel.send('What do you want. Either -luck "dice" or -luck "heads".');
        }
    },
};
