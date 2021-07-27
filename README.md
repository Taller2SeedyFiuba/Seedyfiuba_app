# Seedyfiuba app

Este proyecto reúne el código y los recursos destinados a la aplicación para teléfonos móviles que sirve de front-end para Seedyfiuba y conecta con servicios de terceros para facilitar algunas características de cara al usuario, como ser la autenticación y la subida de imágenes.

# Comenzando

## Pre-requisitos

Para utilizar este proyecto se necesita de las siguientes herramientas:

- NodeJS (recommended v14.x or newer)
- npm
- expo
- git

# Instalación

1. Clonar el repositorio con una de las siguientes opciones:

    - Con HTTPS:

    ```sh
    git clone https://github.com/Taller2SeedyFiuba/Seedyfiuba_app.git
    ```

    - Con SSH:

    ```sh
    git clone git@github.com:Taller2SeedyFiuba/Seedyfiuba_app.git
    ```

2. Instalar paquetes npm. En el directorio el proyecto ejecutar:

    ```sh
    npm install
    ```

3. Setear variables de entorno en un `.env` basado en el archivo de ejemplo `.env.example`.

# Uso

En el directorio el proyecto ejecutar:

```sh
npm start
```

# Organización

La aplicación tiene la siguiente estructura:

```
src
├───components
├───functions
├───navigators
├───providers
└───screens
```

En el directorio principal se encuentran los archivos `index.js` y `App.js`, este último es el principal componente.