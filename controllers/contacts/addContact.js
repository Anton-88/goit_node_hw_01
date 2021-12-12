const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const { listContacts, contactsPath } = require('./listContacts')

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
    addContact,
}