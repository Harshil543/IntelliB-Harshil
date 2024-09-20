Setting up Husky, ESLint, and Prettier in a Next.js 14 project with TypeScript and using tools like TanStack Form, Table, and Query is a great way to ensure code quality, consistency, and error prevention. Here's a step-by-step guide to help you set this up:

### 1. **Initialize Your Project**

If you haven't already initialized your project, you can do so with:

```bash
npx create-next-app@14 my-project --typescript
cd my-project
```

### 2. **Install Required Dependencies**

Install Husky, ESLint, Prettier, and some related packages:

```bash
npm install --save-dev husky lint-staged eslint eslint-config-prettier eslint-plugin-prettier prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 3. **Set Up ESLint**

Initialize ESLint configuration:

```bash
npx eslint --init
```

- **Choose options:**
  - What type of modules: **JavaScript modules (import/export)**
  - Which framework: **React**
  - Does your project use TypeScript: **Yes**
  - Where does your code run: **Browser**
  - How would you like to define a style for your project: **Use a popular style guide**
  - Which style guide do you want to follow: **Airbnb** (or any other you prefer)
  - What format do you want your config file to be in: **JSON**
  - Install dependencies with npm: **Yes**

After this, add some custom rules to your `.eslintrc.json` for compatibility with TypeScript and Prettier:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "next",
    "next/core-web-vitals"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": ["error"],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 4. **Set Up Prettier**

Create a `.prettierrc` file in the root of your project:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

Add a `.prettierignore` file to exclude files from being formatted:

```
node_modules
.next
out
public
```

### 5. **Set Up Husky and Lint-Staged**

Husky can be used to automatically run your linters and formatters before you commit code.

**Step 5.1: Initialize Husky**

```bash
npx husky-init && npm install
```

This will create a `.husky` directory with a `pre-commit` hook set up.
Add this code to your `pre-commit`:

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"


npm run lint


```

Add this code to your `pre-push`:

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint

```

**Step 5.2: Set Up Lint-Staged**
Add `lint-staged` to your `package.json`:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

**Step 5.3: Update Husky Pre-commit Hook**
Update the `.husky/pre-commit` file to use `lint-staged`:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

### 6. **Add Scripts to Package.json**

Add useful scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -H 0.0.0.0 -p 3000",
    "build": "next build",
    "lint": "eslint --ext .js,.jsx,.tsx .",
    "format": "prettier --write .",
    "prepare": "husky install",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

### 7. **Optional: Configure ESLint for TanStack Packages**

If you're using TanStack Form, Table, and Query, you might need to add some additional configuration to handle certain patterns, especially when dealing with asynchronous code or complex hooks.

In your `.eslintrc.json`, you can add rules specific to these libraries:

```json
{
  "rules": {
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
  }
}
```

### 8. **Test Your Setup**

Run the lint and format commands to check if everything is working correctly:

```bash
npm run lint
npm run format
```

### 9. **Start Coding**

Now that everything is set up, you can start coding. Whenever you try to commit, Husky will run `lint-staged`, ensuring your code follows the standards set by ESLint and Prettier.

### 10. **Continuous Integration (Optional)**

You can also set up CI/CD to run your linting and formatting checks on every pull request or merge, ensuring consistent code quality across the entire team.

With these steps, your Next.js project should be well-configured to produce consistent, high-quality, and error-free code.
