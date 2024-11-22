# Use Maven 3.9.5 com Java 17
FROM maven:3.9.5-eclipse-temurin-17

# Diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos necessários para construir o projeto
COPY pom.xml .
COPY src ./src
ARG JAR_FILE=target/*.jar
COPY ./target/E-Sales-0.0.1-SNAPSHOT.jar app.jar

# Instale dependências e empacote o projeto
RUN mvn clean package -DskipTests

# Exponha a porta usada pela aplicação
EXPOSE 8080

# Execute o aplicativo Spring Boot
CMD ["java", "-jar", "./target/E-Sales-0.0.1-SNAPSHOT.jar"]
