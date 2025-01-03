package com.example.E_Sales.buyer;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("buyer")
@AllArgsConstructor
public class BuyerController {
    private BuyerService service;

    @GetMapping
    public List<BuyerRepresentation.BuyerResponse> getAllBuyers() {
        return service.getAllBuyers().stream().map(BuyerRepresentation.BuyerResponse::fromEntity).toList();
    }

    @GetMapping("{id}")
    public BuyerRepresentation.BuyerResponse getBuyerById(@PathVariable Long id) {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.getBuyerById(id));
    }

    @PostMapping
    public BuyerRepresentation.BuyerResponse createBuyer(
            @RequestPart("buyer") BuyerRepresentation.BuyerCreate buyerCreate,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.createBuyer(buyerCreate, file));
    }

    @PostMapping("{id}")
    public BuyerRepresentation.BuyerResponse updateBuyer(
            @PathVariable Long id,
            @RequestPart("buyer") BuyerRepresentation.BuyerUpdate buyerUpdate,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) throws IOException {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.updateBuyer(id, buyerUpdate, file));
    }

    @DeleteMapping("{id}")
    public BuyerRepresentation.BuyerResponse deleteBuyer(@PathVariable Long id) {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.deleteBuyer(id));
    }
}
