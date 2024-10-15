import * as Yup from 'yup';
const phoneNumberRegex = /^\d{3}-\d{2}-\d{2}$/g;

export const AddProfileSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .required('Phone is required')
    .matches(phoneNumberRegex, 'Invalid phone number. Phone must be XXX-XX-XX'),
});
