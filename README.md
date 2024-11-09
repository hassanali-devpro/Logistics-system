## Getting Started

### Set up environment variables

    touch .env

Add the following entries to this file:

    VITE_API_BASE_URL=https://api.3dlwms.com/dev
    VITE_DYNAMAKER_ORIGIN=https://deployed.dynamaker.com/applications/test/tAuqhciQCx3/

Next, run the following command:
```
npm i
```

Now, run the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000/) with your browser to see the result.

### Code standards

You can use `npm run` to use any of these defined scripts: `lint`, `lint:fix`, `format` and `code:fix`
