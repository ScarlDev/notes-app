# Portafolio App - Flutter + Node.js

Aplicación móvil Flutter con backend Node.js/Express para gestión de notas.

## 🏗️ Arquitectura

- **Frontend**: Flutter (Dart) con Clean Architecture
- **Backend**: Node.js + Express + TypeScript
- **Base de datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT + bcrypt
- **Estado**: Provider
- **Navegación**: GoRouter

## 📁 Estructura del Proyecto

```
portafolio_app/
├── Frontend/          # Aplicación móvil Flutter
│   ├── lib/
│   │   ├── core/      # Configuración, constantes, API client
│   │   ├── models/    # Modelos de datos
│   │   ├── providers/ # Estado con Provider
│   │   └── screens/   # Pantallas de la app
│   └── pubspec.yaml
│
└── backend/           # API REST Node.js
    ├── src/
    │   ├── controllers/
    │   ├── middlewares/
    │   ├── routes/
    │   └── utils/
    ├── prisma/
    └── package.json
```

## 🚀 Configuración

### Pre-requisitos

- Flutter SDK (>=3.0.0)
- Node.js (>=16)
- PostgreSQL
- npm o yarn

### Backend

1. Navegar a la carpeta backend:
   ```bash
   cd backend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno (`.env`):
   ```env
   DATABASE_URL="postgresql://user:password@localhost/dbname"
   JWT_SECRET="tu-secreto-jwt"
   PORT=3000
   NODE_ENV=development
   ```

4. Ejecutar migraciones de Prisma:
   ```bash
   npx prisma migrate dev
   ```

5. Iniciar el servidor:
   ```bash
   npm run dev
   ```

### Frontend

1. Navegar a la carpeta Frontend:
   ```bash
   cd Frontend
   ```

2. Instalar dependencias:
   ```bash
   flutter pub get
   ```

3. **IMPORTANTE**: Actualizar la IP del backend en `lib/core/constants.dart`:
   
   Obtén tu IP local:
   ```bash
   hostname -I | awk '{print $1}'
   ```
   
   Actualiza el archivo:
   ```dart
   static const String baseUrl = 'http://TU_IP_LOCAL:3000/api';
   ```
   
   > ⚠️ El celular y la computadora deben estar en la misma red WiFi

4. Ejecutar la app:
   ```bash
   flutter run
   ```

## 🔑 Funcionalidades

- ✅ Registro e inicio de sesión con JWT
- ✅ CRUD de notas personales
- ✅ Persistencia de sesión con Flutter Secure Storage
- ✅ Navegación declarativa con GoRouter
- ✅ Gestión de estado con Provider
- ✅ Validación de formularios
- ✅ Manejo de errores

## 🛠️ Tecnologías

### Frontend
- **Flutter** - Framework UI
- **Provider** - Gestión de estado
- **GoRouter** - Navegación
- **Dio** - Cliente HTTP
- **Flutter Secure Storage** - Almacenamiento seguro

### Backend
- **Node.js** + **Express** - Servidor web
- **TypeScript** - Tipado estático
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Hash de contraseñas
- **Zod** - Validación de esquemas

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Notas (requiere autenticación)
- `GET /api/notes` - Obtener todas las notas
- `POST /api/notes` - Crear nota
- `DELETE /api/notes/:id` - Eliminar nota

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación basada en JWT
- Validación de entrada con Zod
- Middleware de autenticación
- Flutter Secure Storage para tokens

## 📱 Capturas de Pantalla

_Próximamente_

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Christian**

## 🙏 Agradecimientos

- Flutter team
- Node.js community
- Prisma team
