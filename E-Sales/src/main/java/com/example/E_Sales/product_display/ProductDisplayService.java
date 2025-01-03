package com.example.E_Sales.product_display;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDisplayService {
    @Autowired
    private ProductDisplayRepository productDisplayRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<ProductDisplay> getAllProductDisplays() {
        return productDisplayRepository.findAll();
    }

    public ProductDisplay getProductDisplayById(Long id) {
        return productDisplayRepository.findById(id).orElse(null);
    }

    public ProductDisplay getProductDisplayByProductId(Long id) {
        return productDisplayRepository.findByProductId(id).orElse(null);
    }

    public ProductDisplay createProductDisplay(ProductDisplayRepresentation.ProductDisplayCreate entity) {
        return productDisplayRepository.save(new ProductDisplay(
                entity.getProduct(),
                entity.getDisplay_barcode(),
                entity.getDisplay_height(),
                entity.getDisplay_width(),
                entity.getDisplay_weight(),
                entity.getDisplay_length(),
                entity.getDisplay_quantity()
        ));
    }

    public ProductDisplay updateProductDisplay(Long id, ProductDisplayRepresentation.ProductDisplayUpdate entity) {
        var dbEntity = productDisplayRepository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return productDisplayRepository.save(dbEntity);
    }

    public ProductDisplay deleteProductDisplay(Long id) {
        var dbEntity = productDisplayRepository.findById(id).orElse(null);
        productDisplayRepository.delete(dbEntity);
        return dbEntity;
    }
}
