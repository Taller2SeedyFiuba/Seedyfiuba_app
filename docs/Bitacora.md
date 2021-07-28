# Bitácora



## 18 de Abril

Comienza el trabajo y con él la familiarización con las tecnologías del entorno de React Native, que hasta ahora son prácticamente desconocidas.  Gradualmente se desarrollan aplicaciones de mayor compeljidad:

<center><img src="b_img/1.jpg" alt="image10" width="800"/></center>



Las principales prioridades son definir un esquema general de la aplicación para organizar la navegación y determinar el modo en que se enseñarán los proyectos, que son el componente fundamental de toda la aplicación.

Se evaluaron bibliotecas de interfaz de usuario como UI Kitten, React Native UI Lib  y React Native Paper. Se optó por emplear esta última, pues su uso era sencillo y ofrecía un aspecto profesional y fluído.



## 13 de Mayo

<center><img src="b_img/2.jpg" alt="image10" width="600"/></center>



Inicialmente se dividieron las funciones de la aplicaciones en tres categorías: Proyectos, Mensajería y Perfiles (ver mockup izquierdo). En futuras iteraciones se determinó que, aunque la lectura inicial se simplificaría, la pantalla inicial contendría demasiada información y  que sería engorroso tener que seleccionar opciones del apartado de búsqueda para visualizar proyectos favoritos, patrocinados, etc  (ver mockup derecho).

<center><img src="b_img/4.png" alt="image10" width="400"/></center>

Para el registro y login no se plantea un diseño especialmente innovador, el esquema tradicional es eficaz.

Se trabaja en implementar dichas pantallas y especialmente en integrar el login con firebase.



## 20 de Mayo



### Pantalla Inicial

Cuando el usuario inicia la aplicación se encuentra con una pantalla en donde puede decidir si ingresar (con login corriente o federado) o registrarse. De ser posible, una vez que el usuario se ha registrado por primera vez, el ingreso se realizará automáticamente.

<center><img src="img/image10.png" alt="image10" width="350"/></center>



### Pantalla de Registro

Se presentan múltiples campos que el usuario debe completar. Textos auxiliares en rojo informan errores.

En el futuro el botón de registro se deshabilitará hasta que no se detecten errores locales en los campos.

<center><img src="img/image14.png" alt="image20" width="350"/></center>



### Pantalla de Ingreso

Análoga a la pantalla de registro.

<center><img src="img/image12.png" alt="image12" width="350"/></center>



## Pantalla de Registro de Datos

Si el servidor no posee datos adicionales del usuario se lo conduce a la pantalla de registro de datos tras un ingreso/registro exitoso. El campo de fecha de nacimiento incluye formateo automático.

<center><img src="img/image16.png" alt="image16" width="350"/></center>



## Pantalla Home

Cumple un doble propósito: Sirve de punto de entrada a la aplicación y presenta al usuario dos áreas de especial interés: sus proyectos y aquellos que considere favoritos.  Se listan tarjetas que reúnen un título y una imagen representativa.  Actualmente se debate si es conveniente trasladar las opciones que se presentan debajo al interior del proyecto y acceder al mismo solo con un click/toque sobre la tarjeta.

<center><img src="img/image5.png" alt="image5" width="350"/></center>



Para pasar de un área a otra basta con deslizar hacia los lados.



<center><img src="img/image0.png" alt="image0" width="350"/></center>

Debajo, una barra de aplicaciones permite navegar entre el resto de las pantallas principales,  mostradas a continuación.



## Pantalla Búsqueda

El menú que permite buscar por diversos criterios se desplegará solo cuando el usuario selecciona la barra. 

Tras una búsqueda se presentará un listado muy similar al de Home.

<center><img src="img/image4.png" alt="image4" width="300"/></center>





## Pantalla de Mensajería

Esta pantalla reúne a aquellos usuarios con los que se haya comunicado mediante mensaje privado. El mecanismo de navegación entre salas y el propio intercambio de chats funciona a nivel de mockups. 

<center><img src="b_img/5.jpg" alt="image2" width="450"/></center>



El modo en que se interactúa por primera vez  con otro usuario aún no se ha determinado.



### Pantalla de Cuenta

El contenido de esta pantalla es muy pobre de momento y quizás ni siquiera se permita establecer una imagen de perfil. Desde luego, se incorporarán campos y opciones de cuenta conforme evolucione la aplicación.

<center><img src="img/image1.png" alt="image1" width="350"/></center>



## 27 de Mayo





<center><img src="b_img/6.png" alt="image1" width="350"/></center>

<center><img src="b_img/7.png" alt="image1" width="350"/></center>

## 10 de Junio





## 8  de Julio





## 29 de Julio



