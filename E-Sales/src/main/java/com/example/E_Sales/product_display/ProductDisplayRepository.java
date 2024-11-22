package com.example.E_Sales.product_display;

import com.example.E_Sales.core.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDisplayRepository extends JpaRepository<ProductDisplay, Long>, CustomQuerydslPredicateExecutor<ProductDisplay> {
}
