package com.example.E_Sales.product_display;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product-display")
@AllArgsConstructor
public class ProductDisplayController {
    private ProductDisplayService service;

    @GetMapping
    public List<ProductDisplayRepresentation.ProductDisplayResponse> getAllProductDisplays() {
        return service.getAllProductDisplays().stream().map(ProductDisplayRepresentation.ProductDisplayResponse::fromEntity).toList();
    }

    @GetMapping("{id}")
    public ProductDisplayRepresentation.ProductDisplayResponse getProductDisplayById(@PathVariable Long id) {
        return ProductDisplayRepresentation.ProductDisplayResponse.fromEntity(service.getProductDisplayById(id));
    }

    @PostMapping
    public ProductDisplayRepresentation.ProductDisplayResponse createProductDisplay(@RequestBody ProductDisplayRepresentation.ProductDisplayCreate productDisplayCreate) {
        return ProductDisplayRepresentation.ProductDisplayResponse.fromEntity(service.createProductDisplay(productDisplayCreate));
    }

    @PostMapping("{id}")
    public ProductDisplayRepresentation.ProductDisplayResponse updateProductDisplay(@PathVariable Long id, @RequestBody ProductDisplayRepresentation.ProductDisplayUpdate productDisplayUpdate) {
        return ProductDisplayRepresentation.ProductDisplayResponse.fromEntity(service.updateProductDisplay(id, productDisplayUpdate));
    }

    @DeleteMapping("{id}")
    public ProductDisplayRepresentation.ProductDisplayResponse deleteProductDisplay(@PathVariable Long id) {
        return ProductDisplayRepresentation.ProductDisplayResponse.fromEntity(service.deleteProductDisplay(id));
    }
}
