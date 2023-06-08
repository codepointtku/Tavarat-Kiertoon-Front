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

## API Client Generation & OpenAPI Schema

Setup:

1. Make sure you have Docker installed and running: `docker -v`
2. Make sure you have backend running

3. Run `npm run generate-api`:
    1. Schema is downloaded from the server from `/schema` path to a local file: `src/api/schema.yaml`
    2. TypeScript interfaces typed Axios methods are generated to `src/api/client`

### Usage

Import API methods from `api`:

```ts
// Loader
import { ordersApi } from '../api';

const ordersListLoader = async (params) => {
    const { data } = await ordersApi.ordersList();
    // ...
};

// Component
import { useLoaderData } from 'react-router-dom';

function OrderListTable({ page, rowsPerPage, setUsedParams }) {
    const orders = useLoaderData() as Awaited<ReturnType<typeof ordersListLoader>>;
    // ...
}
```

Use generated TypeScript interfaces with props:

```ts
import type { Order } from '../api';

interface Props {
    order: Order;
}

// A component that expects a single order as one of its props
function OrderTableRow({ order }: Props) {
    // ...
    <TableCell align="right">{order.delivery_address}</TableCell>;
    // ...
}
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

Github runs all tests in tests/git folder on pull requests to develop-branch.

If running tests locally run before testing:
`npm ci`
`npm run build`

Run playwright tests from the terminal with commands:
`npm test` runs all tests
`npx playwright test tests/jenkins` runs all tests in jenkins-folder

Codegen can be used to help generate new tests, use it with front end running with command:
`npx playwright codegen "front-ip"` for example:
`npx playwright codegen localhost:3000`
