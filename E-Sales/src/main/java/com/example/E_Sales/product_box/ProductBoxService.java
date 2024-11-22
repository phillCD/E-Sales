package com.example.E_Sales.product_box;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.List;

@Service
public class ProductBoxService {
    @Autowired
    private ProductBoxRepository productBoxRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<ProductBox> getAllProductBoxes() {
        return productBoxRepository.findAll();
    }

    public ProductBox getProductBoxById(Long id) {
        return productBoxRepository.findById(id).orElse(null);
    }

    public ProductBox createProductBox(ProductBoxRepresentation.ProductBoxCreate entity) {
        return productBoxRepository.save(new ProductBox(
                entity.getProduct(),
                entity.getBarcode(),
                entity.getHeight(),
                entity.getWidth(),
                entity.getWeight(),
                entity.getLength(),
                entity.getQuantity()
        ));
    }

    public ProductBox updateProductBox(Long id, ProductBoxRepresentation.ProductBoxUpdate entity) {
        var dbEntity = productBoxRepository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return productBoxRepository.save(dbEntity);
    }

    public ProductBox deleteProductBox(Long id) {
        var dbEntity = productBoxRepository.findById(id).orElse(null);
        productBoxRepository.delete(dbEntity);
        return dbEntity;
    }
}
