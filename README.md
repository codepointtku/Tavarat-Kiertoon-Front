# Tavarat Kiertoon Front

Frontend application for City of Turku Tavarat Kiertoon internal recycling platform.

## Formatting

Install VSCode extensions Prettier and ESLint

VSCode settings:

"Editor: Default Formatter" **Prettier**

"Editor: Format On Save" **ticked**

Or alternatively add these into settings.json:

```json
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
```

### Automatic ESLint fixes on save

Add this into settings.json:

```json
  "[javascript][javascriptreact]": {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
    }
  },
```

(To get open settings.json do ctrl + shift + p, then search "open settings")

## Docker

You need to be in the same folder as docker-compose.yml and to have Docker running on your computer for the commands to work.

`docker-compose up -d` starts and stays open in the background.

`docker-compose up --build -d` builds new images.

`docker-compose down` closes.

### How to update

`docker-compose down --rmi all` closes if open and removes the images.

On the next start Docker will rebuild the images using the new code.

## Styles and Stylesheets

(Sass CSS extension language is used to make writing CSS a better developer experience.)

## Testing

Test configuration is set to 'localhost:3000/'.

Run playwright tests from the terminal with the command: `npm test`

Testing performs automatical ci, no need to start separately.

Tests run automatically when there is a pull request on develop-branch.
