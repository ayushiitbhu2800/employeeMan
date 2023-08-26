package com.example.employee.pojo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class EmployeeRequest {
    List<Long> ids;
    List<String> firstName;
    List<String> lastName;
    List<Long> mobileNumber;
}
