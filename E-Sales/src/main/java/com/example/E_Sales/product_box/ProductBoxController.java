package com.example.E_Sales.product_box;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product-box")
@AllArgsConstructor
public class ProductBoxController {
    private ProductBoxService service;

    @GetMapping
    public List<ProductBoxRepresentation.ProductBoxResponse> getAllProductBoxes() {
        return service.getAllProductBoxes().stream().map(ProductBoxRepresentation.ProductBoxResponse::fromEntity).toList();
    }

    @GetMapping("{id}")
    public ProductBoxRepresentation.ProductBoxResponse getProductBoxById(@PathVariable Long id) {
        return ProductBoxRepresentation.ProductBoxResponse.fromEntity(service.getProductBoxById(id));
    }

    @GetMapping("product/{id}")
    public ProductBoxRepresentation.ProductBoxResponse getProductBoxByProductId(@PathVariable Long id) {
        return ProductBoxRepresentation.ProductBoxResponse.fromEntity(service.getProductBoxByProductId(id));
    }

    @PostMapping
    public ProductBoxRepresentation.ProductBoxResponse createProductBox(@RequestBody ProductBoxRepresentation.ProductBoxCreate productBoxCreate) {
        return ProductBoxRepresentation.ProductBoxResponse.fromEntity(service.createProductBox(productBoxCreate));
    }

    @PostMapping("{id}")
    public ProductBoxRepresentation.ProductBoxResponse updateProductBox(@PathVariable Long id, @RequestBody ProductBoxRepresentation.ProductBoxUpdate productBoxUpdate) {
        return ProductBoxRepresentation.ProductBoxResponse.fromEntity(service.updateProductBox(id, productBoxUpdate));
    }

    @DeleteMapping("{id}")
    public ProductBoxRepresentation.ProductBoxResponse deleteProductBox(@PathVariable Long id) {
        return ProductBoxRepresentation.ProductBoxResponse.fromEntity(service.deleteProductBox(id));
    }
}

