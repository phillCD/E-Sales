package com.example.E_Sales.buyer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {
    @Autowired
    private BuyerRepository buyerRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    public Buyer getBuyerById(Long id) {
        return buyerRepository.findById(id).orElse(null);
    }

    public Buyer createBuyer(BuyerRepresentation.BuyerCreate entity) {
        return buyerRepository.save(new Buyer(
                entity.getName(),
                entity.getPythonScript(),
                entity.getEmail(),
                entity.getCnpj()
        ));
    }

    public Buyer updateBuyer(Long id, BuyerRepresentation.BuyerUpdate entity) {
        var dbEntity = buyerRepository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return buyerRepository.save(dbEntity);
    }

    public Buyer deleteBuyer(Long id) {
        var dbEntity = buyerRepository.findById(id).orElse(null);
        buyerRepository.delete(dbEntity);
        return dbEntity;
    }
}
