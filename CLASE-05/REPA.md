# DOCKER

**Contenedores - Virtualización "ligera" - Versiones fijas de software**

## Orquestar u Orquestar clasterizando contenedores

Docker compose - Orquestar contenedores en un mismo host 

Kubernetes - Orquestar contenedores en varios hosts
Instalación de Kubernetes (CLI kubectl) - Minikube (local) o en la nube (GKE, EKS, AKS)
                              kubectl apply -f deployment.yaml 


## PASOS 

1. Crear un proyecto con NodeJS, Express y Postgres
2. Instalar Docker (CLI) + Docker Desktop
3. Crear un Dockerfile en el raíz del proyecto 
4. Armar el Dockerfile con los pasos necesarios para construir la imagen de la aplicación:

```Dockerfile
# Usamos una imagen base de Node.js
FROM node:20
# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app
# Copiamos los archivos del proyecto al contenedor
COPY . .
# Instalamos las dependencias del proyecto
RUN npm install
# Exponemos el puerto en el que la aplicación correrá
EXPOSE 3000
# Comando para ejecutar la aplicación
CMD ["npm", "start"]
```
5. Construir la imagen para luego subir a DockerHub con el comando:
```bash
docker build -t <nombre-de-usuario>/<nombre-de-imagen>:<tag> .
```
6. Subir la imagen a DockerHub con el comando:
```bash
docker push <nombre-de-usuario>/<nombre-de-imagen>:<tag>
```
7. Compartir el link de la imagen en el README del proyecto final para que otros puedan usarla.

```md
## Imagen Docker
La imagen de Docker para esta aplicación está disponible en Docker Hub: [nombre-de-usuario/nombre-de-imagen:tag](https://hub.docker.com/r/nombre-de-usuario/nombre-de-imagen)
```