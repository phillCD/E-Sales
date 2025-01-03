package com.example.E_Sales.buyer;

import com.example.E_Sales.core.CustomQuerydslPredicateExecutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer, Long>, CustomQuerydslPredicateExecutor<Buyer>, PagingAndSortingRepository<Buyer, Long> {
}
