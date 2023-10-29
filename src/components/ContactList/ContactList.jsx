import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactsList.module.css';
import { getContacts } from 'redux/contactsReducer';
import { useEffect } from 'react';
import { selectItems } from 'redux/contactsSelectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const contactsArr = useSelector(selectItems);

  // const contacts = useSelector(state => state.contacts.contacts.items);
  // const filter = useSelector(state => state.contacts.filter);

  // const hanldeDeleteContact = contactId => {
  //   dispatch(deleteContact(contactId));
  // };

  // const contactsArr = contacts.filter(contact => {
  //   return contact.name.toLowerCase().includes(filter.toLowerCase());
  // });

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
              // deleteContact={hanldeDeleteContact}
            />
          );
        })}
    </ul>
  );
};
