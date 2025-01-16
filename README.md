
# Despliegue Local de Market Playgroup Latam

**Demo**: https://market-play.vercel.app/

Para ejecutar este proyecto localmente, sigue los pasos a continuación.

## Requisitos

- Tener una URL válida de PostgreSQL para configurar la conexión a la base de datos.
- Contar con las credenciales de acceso (Access Keys) de un bucket S3 válido para el almacenamiento de imágenes.

## Pasos para el despliegue

1. **Clonar el repositorio:**

   Si aún no has clonado el repositorio, hazlo utilizando el siguiente comando:

   ```bash
   git clone git@github.com:wZVanG/MarketPlay.git
   cd MarketPlay
   ```

2. **Configurar las variables de entorno:**

   Copia el archivo `.env.back` a un nuevo archivo llamado `.env` en el directorio raíz del proyecto:

   ```bash
   cp .env.back .env
   ```

   Luego, edita el archivo `.env` y completa las siguientes variables con los valores correspondientes de tu entorno:

   - `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL.
   - Las credenciales de acceso para el bucket S3.

3. **Instalar las dependencias:**

   Instala las dependencias del proyecto utilizando `pnpm`:

   ```bash
   pnpm install
   ```

4. **Generar el cliente de Prisma:**

   Ejecuta el siguiente comando para generar el cliente de Prisma:

   ```bash
   pnpm prisma generate
   ```

5. **Desplegar la aplicación:**

   Una vez configurado el entorno y las dependencias, ejecuta el siguiente comando para desplegar la aplicación localmente:

   ```bash
   pnpm run deploy
   ```

