# Your Company Website

A lightweight static website built with plain HTML, CSS, and JavaScript.

## Structure

```
.
├── index.html        # Home page
├── about.html        # About page
├── services.html     # Services page
├── contact.html      # Contact page with form
├── css/
│   └── styles.css    # Global styles and design tokens
├── js/
│   └── main.js       # Shared behavior (nav toggle, form, footer year)
└── assets/           # Images and other static files
```

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000.

## Customizing

- Wire the contact form to a backend or email service in `js/main.js`
  (see the `TODO` comment).

