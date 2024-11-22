package com.example.E_Sales.product_display;

import com.example.E_Sales.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface ProductDisplayRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductDisplayCreate {
        private Product product;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Integer quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductDisplayUpdate {
        private Product product;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Integer quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductDisplayResponse {
        private Product product;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Integer quantity;

        public static ProductDisplayResponse fromEntity(ProductDisplay productDisplay) {
            return ProductDisplayResponse.builder()
                    .product(productDisplay.getProduct())
                    .barcode(productDisplay.getBarcode())
                    .height(productDisplay.getHeight())
                    .width(productDisplay.getWidth())
                    .weight(productDisplay.getWeight())
                    .length(productDisplay.getLength())
                    .quantity(productDisplay.getQuantity())
                    .build();
        }
    }

}
