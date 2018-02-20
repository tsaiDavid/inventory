import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from './entity/Employee';
import { EmployeeAsset } from './entity/EmployeeAsset';


createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    console.log("Inserting a new employee into the database...");
    const employee = new Employee();
    employee.firstName = "John";
    employee.lastName = "Smith";

    await connection.manager.save(employee);
    console.log("Saved a new user with id: " + employee.employeeId);

    const employeeAsset = new EmployeeAsset();
    employeeAsset.conditionOut = "new";

    await connection.manager.save(employeeAsset);

    console.log("Loading employeeAssets from the database...");
    const employeeAssets = await connection.manager.find(EmployeeAsset);
    console.log("Loaded employeeAssets: ", employeeAssets);
    
    console.log("Loading employees from the database...");
    const employees = await connection.manager.find(Employee);
    console.log("Loaded employees: ", employees);
    
}).catch(error => console.log(error));
