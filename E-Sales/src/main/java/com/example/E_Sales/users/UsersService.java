package com.example.E_Sales.users;

import org.apache.catalina.User;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUserById(Long id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users createUser(UsersRepresentation.UserCreate userCreate) {
       return usersRepository.save(new Users(
                userCreate.getUsername(),
                userCreate.getPassword(),
                userCreate.getName(),
                userCreate.getEmail()
       ));

    }

    public Users updateUser(Long id, UsersRepresentation.UserUpdate entity) {
        var dbEntity = usersRepository.findById(id).orElse(null);
        modelMapper.map(entity, dbEntity);

        return usersRepository.save(dbEntity);
    }

    public Users deleteUser(Long id) {
        var dbEntity = usersRepository.findById(id).orElse(null);
        usersRepository.delete(dbEntity);
        return dbEntity;
    }

}
