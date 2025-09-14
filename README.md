# 🚀 Mega Blog

A modern React blog application built with Redux Toolkit, Appwrite, and TailwindCSS.  
Users can ✍️ sign up, log in, create, edit, and view posts with rich text and image support.

---

## ✨ Features

- 🔐 User authentication (signup, login, logout)
- 📝 Create, edit, and delete blog posts
- 🖼️ Upload and preview featured images
- 🖊️ Rich text editor for post content
- 📱 Responsive design with TailwindCSS
- ☁️ Posts stored and managed via Appwrite backend
- 🗂️ Redux Toolkit for global state management

---

## 🛠️ Tech Stack

- ⚛️ **React** (with hooks)
- 🗂️ **Redux Toolkit**
- ☁️ **Appwrite** (backend as a service)
- 🎨 **TailwindCSS** (styling)
- 📝 **React Hook Form** (form management)
- ✒️ **TinyMCE** (rich text editor)

---

## 🚦 Getting Started

### 1️⃣ Clone the repository

```sh
git clone https://github.com/yourusername/mega-blog.git
cd mega-blog
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure Appwrite

- Create a project in [Appwrite](https://appwrite.io/).
- Set up authentication and database for posts.
- Copy your Appwrite endpoint and project ID.
- Create a `src/appwrite/conf.js` file:

```js
export const conf = {
  appwriteUrl: 'https://cloud.appwrite.io/v1',
  appwriteProjectId: 'YOUR_PROJECT_ID',
};
```

### 4️⃣ Start the development server

```sh
npm run dev
```

---

## 💡 Usage

- **Sign Up / Login:** Create an account or log in to access post features.
- **Create Post:** Fill in the title, slug, content, featured image, and status.
- **Edit Post:** Update post details and featured image.
- **View Posts:** Browse all posts on the home and all-posts pages.

---

## 📜 Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run format` — Format code with Prettier

---

## 📁 Folder Structure

```
src/
  components/      # Reusable UI components
  pages/           # Page components (Home, Login, Signup, AllPosts, etc.)
  store/           # Redux slices and store config
  appwrite/        # Appwrite service and config
  assets/          # Images and static assets
  index.css        # Global styles
  App.jsx          # Main app layout
```

---

## 🙏 Credits

- [Appwrite](https://appwrite.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TinyMCE](https://www.tiny.cloud/)