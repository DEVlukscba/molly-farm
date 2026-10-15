# Resumen del Proyecto: Aplicación Educativa "Molly la Vaca"

Este documento consolida la visión, arquitectura técnica, pedagogía y roadmap para la aplicación educativa serverless protagonizada por **Molly la Vaca**.

---

## 1. Visión y Concepto
* **Público Objetivo**: Niños en edad preescolar y primaria temprana (ej. 5 años).
* **Personaje Central**: **Molly la Vaca** sirve como la guía narrativa, animadora y anfitriona de todos los módulos interactivos.
* **Modelo Monetización**: Suscripción mensual ($3.000–$5.000 ARS/mes) procesada vía **Mercado Pago**.

---

## 2. Marco Pedagógico Híbrido

El proyecto combina la estructura curricular oficial con metodologías de alto rendimiento internacional:

| Componente | Fuente / Referencia | Aplicación Práctica |
| :--- | :--- | :--- |
| **Contenidos y Alcance** | Diseño Curricular Oficial de Argentina | Garantiza relevancia local y adecuación al nivel escolar correspondiente. |
| **Matemáticas** | Método Singapur / Finlandia | **CPA (Concreto $\rightarrow$ Pictórico $\rightarrow$ Abstracto)**: Representación con objetos reales/dibujos (ej. 2 vacas o manzanas) antes de introducir el número "$2$" o el símbolo "$+$". |
| **Lengua e Inglés** | Pedagogía de Finlandia | **Inmersión contextual y fónica**: Aprendizaje mediante cuentos breves interactivos. Énfasis en el sonido fonético asociando imagen, audio y letra (ej. Letra M $\rightarrow$ Molly comiendo Manzana + Audio del sonido /m/). |

---

## 3. Arquitectura Técnica y Progresión

* **Infraestructura AWS (Capa Gratuita / Low Cost)**:
  * **AWS Cognito**: Autenticación y gestión de usuarios/padres.
  * **AWS Lambda**: Lógica de negocio y evaluación de ejercicios.
  * **AWS DynamoDB**: Almacenamiento de perfiles, progreso del alumno y métricas.
* **Inteligencia Adaptativa**:
  * **Fase MVP**: Reglas lógicas estáticas para ajuste de dificultad.
  * **Fase Escalado**: Integración con AWS SageMaker / Hugging Face para personalización del aprendizaje mediante IA/ML.

---

## 4. Próximos Pasos

1. **Revisión de Código Base**: Integrar el código HTML/JS existente del prototipo de Molly.
2. **Definición del MVP**: Seleccionar el área inicial de lanzamiento (Matemáticas Básicas vs. Lectoescritura/Inglés).
3. **Modelado de Datos**: Diseñar las tablas e índices en DynamoDB para guardar el estado del usuario.