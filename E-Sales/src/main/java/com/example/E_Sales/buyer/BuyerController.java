package com.example.E_Sales.buyer;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("buyer")
@AllArgsConstructor
public class BuyerController {
    private BuyerService service;

    @GetMapping
    public Page<BuyerRepresentation.BuyerResponse> getAllBuyers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return service.getAllBuyers(pageable).map(BuyerRepresentation.BuyerResponse::fromEntity);
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
