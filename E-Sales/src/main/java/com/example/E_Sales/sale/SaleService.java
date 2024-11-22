package com.example.E_Sales.sale;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Sale getSaleById(Long id) {
        return saleRepository.findById(id).orElse(null);
    }

    public Sale createSale(SaleRepresentation.SaleCreate entity) {
        return saleRepository.save(new Sale(
                entity.getProducts(),
                entity.getTotal(),
                entity.getBuyer(),
                entity.getVendor()
        ));
    }

    public Sale updateSale(Long id, SaleRepresentation.SaleUpdate entity) {
        var dbEntity = saleRepository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return saleRepository.save(dbEntity);
    }

    public Sale deleteSale(Long id) {
        var dbEntity = saleRepository.findById(id).orElse(null);
        saleRepository.delete(dbEntity);
        return dbEntity;
    }
}
