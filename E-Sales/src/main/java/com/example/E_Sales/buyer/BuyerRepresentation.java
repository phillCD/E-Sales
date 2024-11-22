package com.example.E_Sales.buyer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface BuyerRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class BuyerCreate {
        private String name;
        private String pythonScript;
        private String email;
        private String cnpj;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class BuyerUpdate {
        private String name;
        private String pythonScript;
        private String email;
        private String cnpj;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class BuyerResponse {
        private String name;
        private String pythonScript;
        private String email;
        private String cnpj;

        public static BuyerResponse fromEntity(Buyer buyer) {
            return BuyerResponse.builder()
                    .name(buyer.getName())
                    .pythonScript(buyer.getPythonScript())
                    .email(buyer.getEmail())
                    .cnpj(buyer.getCnpj())
                    .build();
        }
    }
}
