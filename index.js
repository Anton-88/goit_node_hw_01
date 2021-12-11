const chalk = require('chalk')
const contacts = require('./contacts')
const { Command } = require('commander');
const program = new Command();
program
    .requiredOption('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {

        case 'list':
            console.log(chalk.blue.underline('Here is your contacts list:'))
            console.table(await contacts.listContacts())
            break

        case 'get':
            const contactById = await contacts.getContactById(id)
            if (contactById) {
                console.log(chalk.magenta.underline(`Here is the contact with id: ${id}`))
                console.table(await contacts.getContactById(id))
            } else {
                console.log(chalk.red.underline(`Sorry, but there is no contact with id: ${id} in your contacts list`))
            }
            break

        case 'add':

            if (await contacts.addContact(name, email, phone)) {
                console.log(chalk.green.underline(`contact ${name} successfully added to your contacts list`))
                console.table(await contacts.listContacts())
            } else {
                console.log(chalk.red.underline(`Sorry, something went wrong and we failed to add contact ${name} to your contacts list`))
            }
            break

        case 'remove':
            const removingContact = await contacts.removeContact(id)
            if (removingContact) {
                console.log(chalk.green.underline(`contact ${removingContact.name} was successfully removed from your contacts list`))
                console.table(await contacts.listContacts())
            } else {
                console.log(chalk.red.underline(`Sorry, something went wrong and we failed to remove contact from your contacts list`))
            }
            break

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);