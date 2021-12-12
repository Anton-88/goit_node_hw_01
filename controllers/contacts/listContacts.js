const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.resolve(__dirname, '../../db/contacts.json')

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsPath, "utf8"))
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    contactsPath,
}