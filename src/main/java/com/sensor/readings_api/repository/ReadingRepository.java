// src/main/java/com/sensor/readings_api/repository/ReadingRepository.java
package com.sensor.readings_api.repository;

import com.sensor.readings_api.model.Reading;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadingRepository extends JpaRepository<Reading, String> {
}
