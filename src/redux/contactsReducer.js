import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addNewContact, fetchAllContacts } from 'services/api';

export const getContacts = createAsyncThunk(
  'contacts/fetchAllContacts',
  async (_, thunkAPI) => {
    try {
      const contacts = await fetchAllContacts();
      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        toast.error('Something went wrong. We are already working on it', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          toastId: 'errorMessage',
        })
      );
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/AddContact',
  async (newContact, thunkAPI) => {
    try {
      const contact = await addNewContact(newContact);
      console.log(contact);
      return contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        toast.error('Something went wrong. We are already working on it', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          toastId: 'errorMessage',
        })
      );
    }
  }
);

const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  // Имя слайса
  name: 'contacts',
  // Начальное состояние редюсера слайса
  initialState: INITIAL_STATE,
  // Объект редюсеров
  //! reducers: {
  //   setContacts(state, action) {
  //     state.contacts = action.payload;
  //   },
  //   setFilter(state, action) {
  //     state.filter = action.payload;
  //   },

  //   addContact(state, action) {
  //     state.contacts.push(action.payload);
  //   },

  //   deleteContact(state, action) {
  //     state.contacts = state.contacts.filter(
  //       contact => contact.id !== action.payload
  //     );
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(getContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, (state, action) => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items.unshift(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      });
  },
});

// Генераторы экшенов
//! export const { setContacts, setFilter, addContact, deleteContact } =
//   contactsSlice.actions;
// Редюсер слайса
export const contactsReducer = contactsSlice.reducer;
