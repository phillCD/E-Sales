package com.example.E_Sales.sale;

import com.example.E_Sales.buyer.Buyer;
import com.example.E_Sales.product.Product;
import com.example.E_Sales.users.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public interface SaleRepresentation {
    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class SaleCreate {
        private List<Product> products;
        private Float total;
        private Buyer buyer;
        private Users vendor;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class SaleUpdate {
        private List<Product> products;
        private Float total;
        private Buyer buyer;
        private Users vendor;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    class SaleResponse {
        private List<Product> products;
        private Float total;
        private Buyer buyer;
        private Users vendor;

        public static SaleResponse fromEntity(Sale sale) {
            return SaleResponse.builder()
                    .products(sale.getProducts())
                    .total(sale.getTotal())
                    .buyer(sale.getBuyer())
                    .vendor(sale.getVendor())
                    .build();
        }
    }
}
