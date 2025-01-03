package com.example.E_Sales.product;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;
    @Autowired
    private ModelMapper modelMapper;

    public Page<Product> getAllProducts(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Product> getProductsByName(String name) {
        return repository.findByNameContainingIgnoreCase(name);
    }

    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Product createProduct(ProductRepresentation.ProductCreate entity) {
        return repository.save(new Product(
                entity.getName(),
                entity.getReference(),
                entity.getBrand(),
                entity.getNcm(),
                entity.getCest(),
                entity.getIpi(),
                entity.getBarcode(),
                entity.getHeight(),
                entity.getWidth(),
                entity.getWeight(),
                entity.getLength(),
                entity.getPrice()
        ));
    }

    public Product updateProduct(Long id, ProductRepresentation.ProductUpdate entity) {
        var dbEntity = repository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return repository.save(dbEntity);
    }

    public Product deleteProduct(Long id) {
        var dbEntity = repository.findById(id).orElse(null);
        repository.delete(dbEntity);
        return dbEntity;
    }
}
