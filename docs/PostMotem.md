# Post Mortem



## Introducción



En este documento se analizan las posibles causas de demoras, las estrategias adoptadas para resolver los más grandes desafíos en los que se incurrió  y las lecciones aprendidas de cara a futuros proyectos.

A grandes rasgos la principal causa de demoras y fracasos resultó de la inexperiencia en el entorno de las tecnologías utilizadas. Al no contar con instancias previas que sirvan de referencia se juzgó la dificultad y prioridad de las tareas pobremente, siendo el caso más grosero las Notificaciones.  Otra consecuencia de la ignorancia en los temas tratados fue una reducción en el grado de independencia del front-end y el back-end, generando que en ocasiones no pueda implementarse una interfaz por desconocer la estructura de la información con la que se contará o existan procesos en el back-end que temporalmente no sean aprovechados en el front-end.



## API REST



REST es excelente para organizar el trabajo, pues fácilmente pueden esbozarse los puntos de interacción y trabajar simultáneamente en el front-end y el back-end. No obstante, para ello debe haberse desarrollado una intuición del modo en que se representará finalmente la información, que no adquirimos hasta mitad del cuatrimestre. De cara al futuro no dudaremos en operar de este modo, que resultó muy eficaz.



## Volatilidad de tecnologías



A diferencia de otros ambientes más tradicionales en los que se ha instalado un núcleo duro de bibliotecas que resuelven las problemáticas más frecuentes, las librerías exploradas ofrecían un conjunto de métodos y formas de uso muy inestables. Se encontraron muchas bibliotecas descontinuadas o con documentación desactualizada, si es que presentaban alguna.

Aunque hacia el futuro ya se contará con nociones del uso de las bibliotecas elegidas, más provechoso resultaría destinar las etapas tempranas del proyecto a construir ejemplos mínimos, representativos de las partes  más inciertas del trabajo, a modo de afinar el juicio de complejidad y los plazos esperados.



## Dependencia de periodos de prueba



La noche anterior al checkpoint final del TP las pruebas comenzaron a fallar y los servicios se interrumpieron súbitamente. Se había alcanzado la cuota mensual del plan gratuito del servidor AWS. Servidor al que se había migrado, pues los containers a desplegar no podían correr en el anterior.

Sumado a ello, la constante intermitencia en la disponibilidad de los microservicios dificultó en gran medida la detección de errores, pues un leve descuido podría generar inconsistencias en la base de datos, que repercutían en todo el sistema e indirectamente en el front-end.

No existe una lección muy profunda que aprender, de hecho somos afortunados de que empresas brinden servidores de prueba gratuitos en primer lugar, simplemente es un aspecto al que debe prestársele mucha atención a medida que crece el sistema que se desarrolla.



## El Smart-Contract y su rol dentro del Trabajo Práctico



El manejo del smart-contract es interesante y una vez desplegado brinda una buena solución al flujo de fondos. No obstante fue muy difícil de depurar en las redes de testing y como la mayor parte de los servicios dependían de él, implicó una parálisis temporal en el avance del proyecto. Hacia el futuro, el correcto funcionamiento del smart contract será prioritario y se probará tempranamente a nivel local, para facilitar su posterior integración.