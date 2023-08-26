package com.example.employee.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.employee.model.Employee;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByFirstName(String firstName);

    List<Employee> findAllByFirstNameIn(List<String> firstName);

    List<Employee> findAllByFirstNameInAndLastNameIn(List<String> firstName, List<String> lastName);
}
