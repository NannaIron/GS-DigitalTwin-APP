package com.sensor.readings_api.auth;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private final Map<String, String> users = new HashMap<>();

    public AuthService() {
        users.put("Giovanna", "99639");
        users.put("Fernando", "98343");
        users.put("Luiz", "558735");
        users.put("João", "97777");
        users.put("Alexandre", "98621");
        users.put("Convidado", "123456");
    }

    public boolean authenticate(String email, String password) {
        return users.containsKey(email) && users.get(email).equals(password);
    }
}