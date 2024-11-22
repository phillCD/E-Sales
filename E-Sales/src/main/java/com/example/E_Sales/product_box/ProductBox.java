package com.example.E_Sales.product_box;

import com.example.E_Sales.core.EntityId;
import com.example.E_Sales.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProductBox extends EntityId{
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @Column
    private String barcode;
    @Column
    private String height;
    @Column
    private String width;
    @Column
    private String weight;
    @Column
    private String length;
    @Column
    private Integer quantity;
}
