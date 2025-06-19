// src/main/java/com/sensor/readings_api/model/Reading.java
package com.sensor.readings_api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "reading")
public class Reading {

    @Id
    private String id;

    private String name;
    private String type;
    private String description;
    private String unit;

    // Mapeia JSON “value” → campo readingValue → coluna sensor_value
    @JsonProperty("value")
    @Column(name = "sensor_value")
    private Double readingValue;

    private String status;

    @Column(name = "status_description")
    private String statusDescription;

    @Column(name = "min_value")
    private Double minValue;

    @Column(name = "max_value")
    private Double maxValue;

    @ElementCollection
    @CollectionTable(
            name = "reading_history",
            joinColumns = @JoinColumn(name = "reading_id")
    )
    @Column(name = "history_value")
    private List<Double> history;

    public Reading() {}

    // --- Getters & Setters ---

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }

    public Double getReadingValue() {
        return readingValue;
    }
    public void setReadingValue(Double readingValue) {
        this.readingValue = readingValue;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public String getStatusDescription() {
        return statusDescription;
    }
    public void setStatusDescription(String statusDescription) {
        this.statusDescription = statusDescription;
    }

    public Double getMinValue() {
        return minValue;
    }
    public void setMinValue(Double minValue) {
        this.minValue = minValue;
    }

    public Double getMaxValue() {
        return maxValue;
    }
    public void setMaxValue(Double maxValue) {
        this.maxValue = maxValue;
    }

    public List<Double> getHistory() {
        return history;
    }
    public void setHistory(List<Double> history) {
        this.history = history;
    }
}
