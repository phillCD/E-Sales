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
        private String display_barcode;
        private String display_height;
        private String display_width;
        private String display_weight;
        private String display_length;
        private Integer display_quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductDisplayUpdate {
        private Product product;
        private String display_barcode;
        private String display_height;
        private String display_width;
        private String display_weight;
        private String display_length;
        private Integer display_quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductDisplayResponse {
        private Product product;
        private String display_barcode;
        private String display_height;
        private String display_width;
        private String display_weight;
        private String display_length;
        private Integer display_quantity;

        public static ProductDisplayResponse fromEntity(ProductDisplay productDisplay) {
            return ProductDisplayResponse.builder()
                    .product(productDisplay.getProduct())
                    .display_barcode(productDisplay.getDisplay_barcode())
                    .display_height(productDisplay.getDisplay_height())
                    .display_width(productDisplay.getDisplay_width())
                    .display_weight(productDisplay.getDisplay_weight())
                    .display_length(productDisplay.getDisplay_length())
                    .display_quantity(productDisplay.getDisplay_quantity())
                    .build();
        }
    }

}
