package com.example.E_Sales.sale;

import com.example.E_Sales.buyer.Buyer;
import com.example.E_Sales.core.EntityId;
import com.example.E_Sales.product.Product;
import com.example.E_Sales.users.Users;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Sale extends EntityId {
    @ManyToMany
    @JoinTable(
            name = "sale_product",
            joinColumns = @JoinColumn(name = "sale_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;
    @Column
    private Float total;
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Buyer buyer;
    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Users vendor;
}
