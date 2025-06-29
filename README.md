🔐 Next.js Auth System
A modern, secure & scalable authentication system built with Next.js 14+, ready for production.

🚀 Features
📝 User Registration & Login

✅ Email Verification

🔑 JWT-based Authentication

🔒 Password Hashing with bcrypt

🔁 Password Reset via Email

📨 Transactional Emails with Nodemailer & Mailtrap

👤 User Profile & Roles (Admin/User)

🛡️ Protected API Routes & Middleware

🌙 Beautiful, Responsive UI (Tailwind CSS)

🗂️ Modular, Clean Code Structure

🧪 Easy to Extend & Customize

🛠️ Tech Stack
⚡ Next.js 14+ (App Router)

🟢 MongoDB & Mongoose

🔐 JWT for authentication

🔑 bcryptjs for password hashing

📧 Nodemailer + Mailtrap for email

💅 Tailwind CSS for styling

🧰 TypeScript for type safety

📦 Project Structure
vbnet
Copy
Edit
.
├── app/
│   ├── api/
│   ├── components/
│   ├── middleware/
│   └── page.tsx
├── models/
├── lib/
├── utils/
├── styles/
└── ...
⚙️ Getting Started
1️⃣ Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/nextjs-auth-system.git
cd nextjs-auth-system
2️⃣ Install dependencies
bash
Copy
Edit
npm install
# or
yarn install
# or
pnpm install
# or
bun install
3️⃣ Configure environment variables
Copy .env.example to .env and fill in your credentials:

bash
Copy
Edit
cp .env.example .env
Add your:

MONGO_URI

JWT_SECRET

MAILTRAP_USER & MAILTRAP_PASS

4️⃣ Run the development server
bash
Copy
Edit
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 to see the result.

📬 Email Testing
Uses Mailtrap for safe email testing in development.

Configure your Mailtrap credentials in .env.

You can view sent emails directly in your Mailtrap inbox.

🛡️ Security
Passwords are securely hashed with bcrypt.

Uses JWT tokens for session & auth management.

API routes protected with middleware to prevent unauthorized access.

🌐 Deploy on Vercel
The easiest way to deploy your Next.js app is on Vercel.

Read Next.js deployment docs for more.

🙌 Contributing
Contributions, issues, and feature requests are welcome!

Feel free to open an issue or submit a pull request.

📄 License
This project is under the MIT License.

🙏 Acknowledgements
Thanks to amazing open-source tools:

Next.js

MongoDB

Mailtrap

Nodemailer

bcryptjs

Tailwind CSS

