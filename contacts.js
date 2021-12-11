const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, 'db/contacts.json')

const listContacts = async () => {
    try {
        return JSON.parse(await fs.readFile(contactsPath, "utf8"))
    } catch (error) {
        console.log(error)
    }
}

const getContactById = async (contactId) => {
    try {
        const cList = await listContacts()
        return cList.find((contact) => contact.id === contactId)
    } catch (error) {
        console.log(error)
    }
}

const removeContact = async (contactId) => {
    try {
        const cList = await listContacts()
        const removingContact = await getContactById(contactId)
        const filteredCList = cList.filter((contact) => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(filteredCList))
        return removingContact
    } catch (error) {
        console.log(error)
    }
}

const addContact = async (name, email, phone) => {
    const id = crypto.randomUUID()
    try {
        const cList = await listContacts()
        await fs.writeFile(contactsPath, JSON.stringify([...cList, { id, name, email, phone }]))
        return true;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}