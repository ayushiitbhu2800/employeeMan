package com.example.employee.controller;

import com.example.employee.pojo.EmployeeRequest;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.employee.model.Employee;

import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/")
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/getAllEmployees")
    public List<Employee> getAll(){
        return employeeRepository.findAll();
    }

    @PostMapping("/getByFirstName")
    public List<Employee> getByFirstName(@RequestBody EmployeeRequest request){
        return employeeRepository.findAllByFirstNameIn(request.getFirstName());
    }

    @PostMapping("/getByFirstNameAndLastName")
    public List<Employee> getByFirstNameAndLastName(@RequestBody EmployeeRequest request){
        return employeeRepository.findAllByFirstNameInAndLastNameIn(request.getFirstName(),request.getLastName());
    }

    @PostMapping("/saveEmployee")
    public List<Employee> saveEmployee(@RequestBody Employee request){
        return employeeRepository.saveAll(Collections.singletonList(request));
    }

    @PostMapping("/deleteEmployee")
    public void deleteEmployee(@RequestBody Employee request){
        employeeRepository.deleteAll(Collections.singletonList(request));
    }
}
