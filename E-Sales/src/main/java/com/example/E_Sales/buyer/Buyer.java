package com.example.E_Sales.buyer;

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
public class Buyer extends EntityId {
    @Column
    private String name;
    @Column
    private String pythonScript;
    @Column
    private String email;
    @Column
    private String cnpj;
}
