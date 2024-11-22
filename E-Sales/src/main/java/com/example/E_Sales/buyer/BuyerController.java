package com.example.E_Sales.buyer;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    public BuyerRepresentation.BuyerResponse createBuyer(@RequestBody BuyerRepresentation.BuyerCreate buyerCreate) {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.createBuyer(buyerCreate));
    }

    @PostMapping("{id}")
    public BuyerRepresentation.BuyerResponse updateBuyer(@PathVariable Long id, @RequestBody BuyerRepresentation.BuyerUpdate buyerUpdate) {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.updateBuyer(id, buyerUpdate));
    }

    @DeleteMapping("{id}")
    public BuyerRepresentation.BuyerResponse deleteBuyer(@PathVariable Long id) {
        return BuyerRepresentation.BuyerResponse.fromEntity(service.deleteBuyer(id));
    }
}
