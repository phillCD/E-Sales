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
        private String box_barcode;
        private String box_height;
        private String box_width;
        private String box_weight;
        private String box_length;
        private Integer box_quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductBoxUpdate {
        private Product product;
        private String box_barcode;
        private String box_height;
        private String box_width;
        private String box_weight;
        private String box_length;
        private Integer box_quantity;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class ProductBoxResponse {
        private Product product;
        private String box_barcode;
        private String box_height;
        private String box_width;
        private String box_weight;
        private String box_length;
        private Integer box_quantity;

        public static ProductBoxResponse fromEntity(ProductBox productBox) {
            return ProductBoxResponse.builder()
                    .product(productBox.getProduct())
                    .box_barcode(productBox.getBox_barcode())
                    .box_height(productBox.getBox_height())
                    .box_width(productBox.getBox_width())
                    .box_weight(productBox.getBox_weight())
                    .box_length(productBox.getBox_length())
                    .box_quantity(productBox.getBox_quantity())
                    .build();
        }
    }
}
