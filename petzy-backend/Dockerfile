# Etapa 1: Compilación
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Quarkus genera el ejecutable en target/quarkus-app/
COPY --from=build /app/target/quarkus-app/ /app/

EXPOSE 8080
# Comando para iniciar la aplicación Quarkus
CMD ["java", "-jar", "/app/quarkus-run.jar"]
