package com.example.E_Sales.product;

import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("products")
@AllArgsConstructor
public class ProductController {
    private ProductService service;

    @GetMapping
    public Page<ProductRepresentation.ProductResponse> getAllProducts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return service.getAllProducts(pageable).map(ProductRepresentation.ProductResponse::fromEntity);
    }

    @GetMapping("search")
    public List<ProductRepresentation.ProductResponse> getProductsByName(@RequestParam String name) {
        return service.getProductsByName(name).stream().map(ProductRepresentation.ProductResponse::fromEntity).toList();
    }

    @GetMapping("{id}")
    public ProductRepresentation.ProductResponse getProductById(@PathVariable Long id) {
        return ProductRepresentation.ProductResponse.fromEntity(service.getProductById(id));
    }

    @PostMapping
    public ProductRepresentation.ProductResponse createProduct(@RequestBody ProductRepresentation.ProductCreate productCreate) {
        return ProductRepresentation.ProductResponse.fromEntity(service.createProduct(productCreate));
    }

    @PostMapping("{id}")
    public ProductRepresentation.ProductResponse updateProduct(@PathVariable Long id, @RequestBody ProductRepresentation.ProductUpdate productUpdate) {
        return ProductRepresentation.ProductResponse.fromEntity(service.updateProduct(id, productUpdate));
    }

    @DeleteMapping("{id}")
    public ProductRepresentation.ProductResponse deleteProduct(@PathVariable Long id) {
        return ProductRepresentation.ProductResponse.fromEntity(service.deleteProduct(id));
    }
}
