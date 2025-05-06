# Use lightweight JDK 21 image
FROM eclipse-temurin:21-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the JAR file
COPY target/AuraTracker-0.0.1-SNAPSHOT.jar app.jar

# Expose port
EXPOSE 1211

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
