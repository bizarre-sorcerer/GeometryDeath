
FROM maven:3.9.6-eclipse-temurin-21-alpine as builder
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests


FROM alpine/java:21-jdk
WORKDIR /app
COPY --from=builder /build/target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
