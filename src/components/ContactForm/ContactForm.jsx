import { nanoid } from "nanoid";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import css from "./ContactForm.module.css";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required field!"),
  number: Yup.string()
    .min(3, "The phone number must consist of at least 3 digits!")
    .max(50, "Too long number")
    .required("Required field!"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const fieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const hundleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name.toLowerCase().trim(),
      number: values.number.trim(),
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={hundleSubmit}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        <div className={css.inputContainer}>
          <label className={css.label} htmlFor={fieldId + "name"}>
            Name
          </label>

          <Field
            className={css.input}
            type="text"
            name="name"
            id={fieldId + "name"}
            autoComplete="name"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>

        <div className={css.inputContainer}>
          <label className={css.label} htmlFor={fieldId + "number"}>
            Number
          </label>

          <Field
            className={css.input}
            type="text"
            name="number"
            id={fieldId + "number"}
            autoComplete="tel"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </div>

        <button className={css.button} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
