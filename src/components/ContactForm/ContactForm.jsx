import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsOps';
import { selectContacts } from '../../redux/contactsSlice';
import css from './ContactForm.module.css';

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errors, setErrors] = useState({ name: '', number: '' });

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', number: '' };

    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      valid = false;
    }

    const phoneRegex = /^[0-9+\- ]+$/;
    if (!phoneRegex.test(number) || number.trim().length < 7) {
      newErrors.number = 'Enter a valid phone number (min. 7 digits)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      setErrors(prev => ({
        ...prev,
        name: 'This contact already exists',
      }));
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
    setErrors({ name: '', number: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className={`${css.input} ${errors.name ? css.errorInput : ''}`}
          placeholder="Enter name"
        />
        {errors.name && <div className={css.error}>{errors.name}</div>}
      </label>

      <label className={css.label}>
        Phone
        <input
          type="tel"
          name="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          className={`${css.input} ${errors.number ? css.errorInput : ''}`}
          placeholder="Enter phone number"
        />
        {errors.number && <div className={css.error}>{errors.number}</div>}
      </label>

      <button className={css.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
