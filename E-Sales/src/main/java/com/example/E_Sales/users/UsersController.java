package com.example.E_Sales.users;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("users")
@AllArgsConstructor
public class UsersController {
    private UsersService service;

    @GetMapping
    public ResponseEntity<List<UsersRepresentation.UserResponse>> getAllUsers() {
        return ResponseEntity.ok(service.getAllUsers().stream().map(UsersRepresentation.UserResponse::fromEntity).toList());
    }

    @GetMapping("{id}")
    public ResponseEntity<UsersRepresentation.UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(UsersRepresentation.UserResponse.fromEntity(service.getUserById(id)));
    }

    @PostMapping
    public ResponseEntity<UsersRepresentation.UserResponse> createUser(@RequestBody UsersRepresentation.UserCreate userCreate) {
        return ResponseEntity.ok(UsersRepresentation.UserResponse.fromEntity(service.createUser(userCreate)));
    }

    @PostMapping("{id}")
    public ResponseEntity<UsersRepresentation.UserResponse> updateUser(@PathVariable Long id, @RequestBody UsersRepresentation.UserUpdate userUpdate) {
        return ResponseEntity.ok(UsersRepresentation.UserResponse.fromEntity(service.updateUser(id, userUpdate)));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<UsersRepresentation.UserResponse> deleteUser(@PathVariable Long id) {
        return ResponseEntity.ok(UsersRepresentation.UserResponse.fromEntity(service.deleteUser(id)));
    }
}
