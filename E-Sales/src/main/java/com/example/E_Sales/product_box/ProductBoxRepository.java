package com.example.E_Sales.product_box;

import com.example.E_Sales.core.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductBoxRepository extends JpaRepository<ProductBox, Long>, CustomQuerydslPredicateExecutor<ProductBox> {
}
