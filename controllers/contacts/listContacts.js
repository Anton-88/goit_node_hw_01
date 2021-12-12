const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, '../../db/contacts.json')

const listContacts = async () => {
    try {
        // const temp = await fs.readFile(contactsPath, "utf8")
        // console.table(await fs.readFile(contactsPath, "utf8"))
        return JSON.parse(await fs.readFile(contactsPath, "utf8"))
    } catch (error) {
        console.log(error)
    }
}
// listContacts()
module.exports = {
    listContacts,
    contactsPath,
}