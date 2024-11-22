package com.example.E_Sales.product_box;

import com.example.E_Sales.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public interface ProductBoxRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductBoxCreate {
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
    class ProductBoxUpdate {
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
    class ProductBoxResponse {
        private Product product;
        private String barcode;
        private String height;
        private String width;
        private String weight;
        private String length;
        private Integer quantity;

        public static ProductBoxResponse fromEntity(ProductBox productBox) {
            return ProductBoxResponse.builder()
                    .product(productBox.getProduct())
                    .barcode(productBox.getBarcode())
                    .height(productBox.getHeight())
                    .width(productBox.getWidth())
                    .weight(productBox.getWeight())
                    .length(productBox.getLength())
                    .quantity(productBox.getQuantity())
                    .build();
        }
    }
}
