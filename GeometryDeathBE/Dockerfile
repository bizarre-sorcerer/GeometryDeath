FROM gradle:8.5-jdk21-alpine AS builder

WORKDIR /app

COPY --chown=gradle:gradle . .

RUN gradle clean build -x test

FROM amazoncorretto:21-alpine

COPY --from=builder /app/build/libs/GeometryDeathBE-0.1.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
