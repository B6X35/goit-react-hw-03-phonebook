import ContactItem from "./ContactItem";
import PropTypes from "prop-types";

const ContactList = ({ contacts, deleteContact }) => {
  const elements = contacts.map((item) => (
    <ContactItem key={item.id} name={item.name} number={item.number} delet={() => deleteContact(item.id)}/>
  ));
  return <ul>{elements}</ul>;
};

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })),
    deleteContact: PropTypes.func.isRequired
}