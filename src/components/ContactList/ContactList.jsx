import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { deleteContact } from '../../redux/contactsOps';
import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          deleteContact={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
}

export default ContactList;
