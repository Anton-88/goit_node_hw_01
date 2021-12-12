const fs = require('fs/promises')
const path = require('path')

const { listContacts, contactsPath } = require('./listContacts')
const { getContactById } = require('./getContactById')

const removeContact = async (contactId) => {
    try {
        const cList = await listContacts()
        const removingContact = await getContactById(contactId)
        const filteredCList = cList.filter((contact) => contact.id !== contactId)
        await fs.writeFile(contactsPath, JSON.stringify(filteredCList))
        return removingContact ? removingContact : null
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    removeContact,
}