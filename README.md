# Auth Demo

A basic implementation of how register, login, logout and protected routes are implemented.

Protected routes are implemented using cookies + middleware.

## Simple implementation

This is written using the `express` framework, which is a lightweight and very popular server framework.

All files specific to the `express` implementation are in the `src/servers/express` folder.

Start with `npm run express`.

## Complex implementation

This is written without a framework. As such, middleware for the following had to be written:

All files specific to this implementation are in the `src/servers/vanilla` folder.

- Request body parsing
- Returning redirect responses
- Rendering views
