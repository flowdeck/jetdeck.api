import { object, string } from 'zod'

// Define a reusable validation schema for password
const passwordSchema = string({
  required_error: 'Password is required',
}).min(6, 'Password must be at least 6 characters')

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    password: passwordSchema,
    passwordConfirmation: passwordSchema,
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
})

// ** Advanced Functionality Suggestions**

//* */ 1. Application Access:
//*  - Add a field 'applications' of type array
//*  - Inside the 'applications' array, define an object schema for each application
//*    - Include properties like 'applicationId' (string), 'role' (string)

// createUserSchema.extend({
//   applications: object({
//     nonempty: true, // Require at least one application
//     array: object({
//       applicationId: string({ required_error: 'Application ID required' }),
//       role: string({ required_error: 'Role required' }),
//     }),
//   }),
// })

//* 2. Application Specific Data:
//*  - Instead of storing application-specific data directly in the user schema,
//*    consider a separate model for each application with a foreign key reference to the User model.
//*  - This allows for more flexibility and scalability as application-specific data can evolve independently.

//* Example: Create a separate model for Application Data
//* This is just an example structure, define it based on your specific needs
// const ApplicationDataModel = {
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//   applicationId: { type: String, required: true },
//   // Add application specific fields here (e.g., preferences, settings)
// }

// Remember to define and link this model in your database.
