const chalk = require('chalk')
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

//************* */
const { listContacts } = require('./controllers/contacts/listContacts')
const { getContactById } = require('./controllers/contacts/getContactById')
const { addContact } = require('./controllers/contacts/addContact')
const { removeContact } = require('./controllers/contacts/removeContact')
//************* */

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            console.log(chalk.blue.underline('Here is your contacts list:'))
            console.table(await listContacts())
            break

        case 'get':
            const contactById = await getContactById(id)
            if (contactById) {
                console.log(chalk.magenta.underline(`Here is the contact with id: ${id}`))
                console.table(await getContactById(id))
            } else {
                console.log(chalk.red.underline(`Sorry, but there is no contact with id: ${id} in your contacts list`))
            }
            break

        case 'add':

            if (await addContact(name, email, phone)) {
                console.log(chalk.green.underline(`contact ${name} successfully added to your contacts list`))
                console.table(await listContacts())
            } else {
                console.log(chalk.red.underline(`Sorry, something went wrong and we failed to add contact ${name} to your contacts list`))
            }
            break

        case 'remove':
            const removingContact = await removeContact(id)
            if (removingContact) {
                console.log(chalk.green.underline(`contact ${removingContact.name} was successfully removed from your contacts list`))
                console.table(await listContacts())
            } else {
                console.log(chalk.red.underline(`Sorry, something went wrong and we failed to remove contact from your contacts list`))
            }
            break

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

(async () => {
    await invokeAction(argv)
})()