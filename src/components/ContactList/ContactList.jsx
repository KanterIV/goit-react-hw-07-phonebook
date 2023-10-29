import css from './ContactsList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/contactsReducer';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { selectFilter, selectItems } from 'redux/contactsSelectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const hanldeDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const contactsArr = items.filter(contact => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul className={css.contactsList}>
      {contactsArr.length !== 0 &&
        contactsArr.map(contact => {
          const { id, name, phone } = contact;
          return (
            <ContactListItem
              key={id}
              contactId={id}
              contactName={name}
              contactNumber={phone}
              deleteContact={hanldeDeleteContact}
            />
          );
        })}
    </ul>
  );
};
