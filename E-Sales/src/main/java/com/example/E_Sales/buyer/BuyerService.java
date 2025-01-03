package com.example.E_Sales.buyer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;

@Service
public class BuyerService {
    @Autowired
    private BuyerRepository buyerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<Buyer> getAllBuyers(Pageable pageable) {
        return buyerRepository.findAll(pageable);
    }

    public Buyer getBuyerById(Long id) {
        return buyerRepository.findById(id).orElse(null);
    }

    public Buyer createBuyer(BuyerRepresentation.BuyerCreate entity, MultipartFile file) throws IOException {
        byte[] fileBytes = null;
        if (file != null && !file.isEmpty()) {
            fileBytes = file.getBytes();
        }

        Buyer buyer = new Buyer(
                entity.getName(),
                fileBytes,  // Set the file bytes
                entity.getEmail(),
                entity.getCnpj()
        );

        return buyerRepository.save(buyer);
    }

    public Buyer updateBuyer(Long id, BuyerRepresentation.BuyerUpdate entity, MultipartFile file) throws IOException {
        var dbEntity = buyerRepository.findById(id).orElse(null);

        if (dbEntity == null) {
            throw new RuntimeException("Buyer not found");
        }

        modelMapper.map(entity, dbEntity);

        if (file != null && !file.isEmpty()) {
            dbEntity.setPythonScript(file.getBytes());
        }

        return buyerRepository.save(dbEntity);
    }

    public Buyer deleteBuyer(Long id) {
        var dbEntity = buyerRepository.findById(id).orElse(null);

        if (dbEntity != null) {
            buyerRepository.delete(dbEntity);
        }

        return dbEntity;
    }
}
