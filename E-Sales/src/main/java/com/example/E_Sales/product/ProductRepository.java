package com.example.E_Sales.product;

import com.example.E_Sales.core.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, CustomQuerydslPredicateExecutor<Product>, PagingAndSortingRepository<Product, Long> {
    List<Product>findByNameContainingIgnoreCase(String name);
}
