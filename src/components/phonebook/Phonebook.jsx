import { Component } from "react";
import uniqid from "uniqid";
import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

class Phonebook extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const contactParser = JSON.parse(contact);
    if (contactParser) {
      this.setState({ contacts: contactParser });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact))
    };
  }

  addContact = (data) => {
    const contact = {
      id: uniqid.time(),
      ...data,
    };
    this.haveContact(data)
      ? alert(`${data.name} is already in contacts.`)
      : this.setState((prevState) => ({

          contacts: [contact, ...prevState.contacts],
        }));
  };

  haveContact = (data) => {
    const { contacts } = this.state;
    const name = contacts.some((contact) => contact.name === data.name);
    return name;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
    return filteredContacts;
  };

  deleteContact = (e) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== e),
    }));
  };

  render() {
    const { filter } = this.state;
    const { addContact, handleChange, getFilteredContacts, deleteContact } =
      this;
    const contacts = getFilteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter onFilter={handleChange} value={filter} />
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
