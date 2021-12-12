const fs = require('fs/promises')
const path = require('path')

const { listContacts } = require('./listContacts')

const getContactById = async (contactId) => {
    try {
        const cList = await listContacts()
        return cList.find((contact) => contact.id === contactId)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getContactById,
}
