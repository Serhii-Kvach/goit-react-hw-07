import ContactForm from "../ContactForm/ContactForm";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";

function App() {
  const contacts = useSelector(selectContacts);
  return (
    <>
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
        <SearchBox />
        <ContactList />
        {contacts.length === 0 && (
          <p className={css.noContacts}>No contacts!</p>
        )}
      </div>
    </>
  );
}

export default App;
