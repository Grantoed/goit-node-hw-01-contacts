const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    console.table(parsedContacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const searchedContact = parsedContacts.find(
      (contact) => contact.id.toString() === contactId
    );

    console.table(searchedContact);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    const updatedContacts = parsedContacts.filter(
      (contact) => contact.id.toString() !== contactId
    );

    fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    console.log("Updated contacts:");
    console.table(updatedContacts);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone.toString(),
    };
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);

    parsedContacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf8");
    console.log("Contact added!");
    console.table(newContact);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
