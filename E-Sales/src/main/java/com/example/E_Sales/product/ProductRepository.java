package com.example.E_Sales.product;

import com.example.E_Sales.core.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, CustomQuerydslPredicateExecutor<Product> {
}
