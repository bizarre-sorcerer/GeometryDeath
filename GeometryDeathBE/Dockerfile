# Stage 1: Build with Gradle
FROM gradle:8.5-jdk21-alpine AS builder

WORKDIR /app
COPY --chown=gradle:gradle . .

# Build the application (change `bootJar` to `shadowJar` or just `build` depending on your setup)
RUN gradle clean build -x test

# Stage 2: Run the JAR
FROM amazoncorretto:21-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
