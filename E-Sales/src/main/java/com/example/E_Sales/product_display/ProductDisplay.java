package com.example.E_Sales.product_display;

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
public class ProductDisplay extends EntityId {
    @OneToOne
    @JoinColumn(name = "product_id")
    private Product product;
    @Column
    private String display_barcode;
    @Column
    private String display_height;
    @Column
    private String display_width;
    @Column
    private String display_weight;
    @Column
    private String display_length;
    @Column
    private Integer display_quantity;
}
