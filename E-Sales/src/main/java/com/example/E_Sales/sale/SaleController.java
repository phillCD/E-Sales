package com.example.E_Sales.sale;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("sale")
@AllArgsConstructor
public class SaleController {
    private SaleService service;

    @GetMapping
    public List<SaleRepresentation.SaleResponse> getAllSales() {
        return service.getAllSales().stream().map(SaleRepresentation.SaleResponse::fromEntity).toList();
    }

    @GetMapping("{id}")
    public SaleRepresentation.SaleResponse getSaleById(@PathVariable Long id) {
        return SaleRepresentation.SaleResponse.fromEntity(service.getSaleById(id));
    }

    @PostMapping
    public SaleRepresentation.SaleResponse createSale(@RequestBody SaleRepresentation.SaleCreate saleCreate) {
        return SaleRepresentation.SaleResponse.fromEntity(service.createSale(saleCreate));
    }

    @PostMapping("{id}")
    public SaleRepresentation.SaleResponse updateSale(@PathVariable Long id, @RequestBody SaleRepresentation.SaleUpdate saleUpdate) {
        return SaleRepresentation.SaleResponse.fromEntity(service.updateSale(id, saleUpdate));
    }

    @DeleteMapping("{id}")
    public SaleRepresentation.SaleResponse deleteSale(@PathVariable Long id) {
        return SaleRepresentation.SaleResponse.fromEntity(service.deleteSale(id));
    }
}
