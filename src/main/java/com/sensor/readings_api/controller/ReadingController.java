// src/main/java/com/sensor/readings_api/controller/ReadingController.java
package com.sensor.readings_api.controller;

import com.sensor.readings_api.model.Reading;
import com.sensor.readings_api.repository.ReadingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/readings")
@CrossOrigin(origins = "*")
public class ReadingController {

    private final ReadingRepository repository;

    public ReadingController(ReadingRepository repository) {
        this.repository = repository;
    }

    // Insere ou atualiza completamente um Reading
    @PostMapping
    public ResponseEntity<Reading> upsert(@RequestBody Reading reading) {
        Reading saved = repository.save(reading);
        return ResponseEntity.ok(saved);
    }

    // Retorna todos
    @GetMapping
    public List<Reading> getAll() {
        return repository.findAll();
    }

    // Retorna por id
    @GetMapping("/{id}")
    public ResponseEntity<Reading> getById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
