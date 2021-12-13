import { Component } from "react";
import PropTypes from "prop-types";
import style from "./ContactForm.module.css";

class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
  };

  state = {
    name: "",
    number: "",
  };

  onAddContact = (e) => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.setState({ name: "", number: "" });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { handleChange, onAddContact } = this;
    const { name, number } = this.state;
    return (
      <form className={style.form} onSubmit={onAddContact}>
        <label className={style.label}>
          Name
          <input
            className={style.input}
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={style.label}>
          Number
          <input
            className={style.input}
            type="tel"
            value={number}
            onChange={handleChange}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit" className={style.btn}>Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
