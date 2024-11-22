package com.example.E_Sales.users;

import com.example.E_Sales.core.EntityId;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.action.internal.EntityAction;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Users extends EntityId {
    @Column
    private String username;
    @Column
    private String password;
    @Column
    private String email;
    @Column
    private String name;
}
