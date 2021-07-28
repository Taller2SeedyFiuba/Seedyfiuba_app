# Seedyfiuba app

Este proyecto reúne el código y los recursos destinados a la aplicación para teléfonos móviles que sirve de front-end para Seedyfiuba y conecta con servicios de terceros para facilitar algunas características de cara al usuario, como ser la autenticación y la subida de imágenes.

# Getting Started

## Requirements

In order to use this project you'll ned to have the following tools.

- NodeJS (recommended v12.x or newer)
- npm
- expo
- git

# Installation

1. Clone the repository:

    - With HTTPS

    ```sh
    git clone https://github.com/Taller2SeedyFiuba/Seedyfiuba_app.git
    ```

    - With SSH

    ```sh
    git clone git@github.com:Taller2SeedyFiuba/Seedyfiuba_app.git
    ```

2. Install npm packages. In the project directory run:

    ```sh
    npm install
    ```

3. Set up environment variables in an `.env` named file based on `.env.example`

# Usage

In the project directory run:

```sh
npm start
```

# Organization

The application has the following structure:

```
src
├───components
├───functions
├───navigators
├───providers
└───screens
```

In the main directory can be found `index.js` and `App.js`. The last one is the main component.