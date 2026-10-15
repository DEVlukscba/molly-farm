# Resumen Ejecutivo del Proyecto Educativo

---

## 1. Infraestructura y Seguridad en AWS

### **Modelo de Responsabilidad Compartida**
- **AWS:** Protege la infraestructura física, los servidores, el hardware, los centros de datos y la red global.
- **Desarrollador / Producto:** Responsable de la configuración de seguridad en la nube, el cifrado de datos (en tránsito y en reposo), la gestión de accesos (IAM), las contraseñas y el cumplimiento normativo.

---

## 2. Estrategia de Privacidad y Cumplimiento Normativo

### **Enfoque en Leyes de Protección Infantil (ej. COPPA / Regulaciones de Datos)**
- **Titular de la Cuenta:** Únicamente personas **adultas** (padres o tutores legales). La relación contractual y la gestión de datos recaen 100% en el adulto.
- **Minimización de Datos y Anonimización:**
  - Los niños no requieren registrar datos personales identificables (PII) como nombre completo, correo o DNI.
  - Se utilizan **alias o nombres genéricos** (ej. *Hijo A*, *Hijo B*, avatar o seudónimo).
  - En la base de datos, cada perfil infantil se vincula mediante un **identificador único aleatorio (UUID)**.
  - Esto minimiza drásticamente el alcance regulatorio de COPPA y fortalece la privacidad del menor.

---

## 3. Modelo de Dominio y Gestión de Usuarios

```
[ Cuenta Padre / Tutor ] (Adulto)
       │
       ├───> [ Perfil Infantil 1: "Hijo A" ] (UUID Anónimo) ──> Registra Progreso
       └───> [ Perfil Infantil 2: "Hijo B" ] (UUID Anónimo) ──> Registra Progreso
```

- **Padre/Tutor:** Crea y gestiona la cuenta principal, define permisos y configura los perfiles.
- **Hijos:** Acceden a la plataforma bajo un perfil anónimo orientado exclusivamente al registro de progreso pedagógico y métricas de aprendizaje.

---

## 4. Enfoque Pedagógico y Curricular

### **Estructura de Niveles**
- Correspondencia directa con la educación formal (Jardín, 1.° a 6.° Grado / Nivel Primario).

### **Propuesta Metodológica y Temarios**
1. **Currícula Oficial (Argentina):** Alineación con los contenidos y saberes clave por año/grado.
2. **Pedagogía Finlandesa:** Integración de dinámicas centradas en la autonomía, el aprendizaje basado en la indagación, la ludificación y el desarrollo del pensamiento crítico.
3. **Temario Personalizado:**
   - Permite que los padres o tutores incorporen o sugieran nuevas líneas de contenido.
   - **Límites y Reglas Contextuales:** La plataforma guía al adulto para proponer temas acordes a la etapa evolutiva del niño (ej. sugerir nociones de conteo espacial para 5 años y restringir conceptos abstractos como fracciones).