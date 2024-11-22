package com.example.E_Sales.product;

import com.example.E_Sales.core.EntityId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Product extends EntityId {
    @Column
    private String name;
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
    private Float price;
}
