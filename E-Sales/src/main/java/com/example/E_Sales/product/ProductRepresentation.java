package com.example.E_Sales.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface ProductRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductCreate {
        private String name;
        private String reference;
        private String brand;
        private String ncm;
        private String cest;
        private String ipi;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Float price;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductUpdate {
        private String name;
        private String reference;
        private String brand;
        private String ncm;
        private String cest;
        private String ipi;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Float price;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductResponse {
        private Long id;
        private String name;
        private String reference;
        private String brand;
        private String ncm;
        private String cest;
        private String ipi;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Float price;

        public static ProductResponse fromEntity(Product product) {
            return ProductResponse.builder()
                    .id(product.getId())
                    .name(product.getName())
                    .reference(product.getReference())
                    .brand(product.getBrand())
                    .ncm(product.getNcm())
                    .cest(product.getCest())
                    .ipi(product.getIpi())
                    .barcode(product.getBarcode())
                    .height(product.getHeight())
                    .width(product.getWidth())
                    .weight(product.getWeight())
                    .length(product.getLength())
                    .price(product.getPrice())
                    .build();
        }
    }

}
