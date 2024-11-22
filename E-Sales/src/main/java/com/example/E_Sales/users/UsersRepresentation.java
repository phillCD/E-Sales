package com.example.E_Sales.users;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface UsersRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class UserCreate {
        private String username;
        private String password;
        private String email;
        private String name;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class UserUpdate {
        private String username;
        private String password;
        private String email;
        private String name;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class UserResponse {
        private String username;
        private String email;
        private String name;

        public static UserResponse fromEntity(Users user) {
            return UserResponse.builder()
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .name(user.getName())
                    .build();
        }
    }
}
