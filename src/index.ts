import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from './entity/Employee';
import { EmployeeAsset } from './entity/EmployeeAsset';
import { Asset } from './entity/Asset';
import { AssetType } from './entity/AssetType';

// Using GraphQL, I might get the Asset Type Description for 111 using:
// {
// 	assetById(id: 1) {
// 	  assetTypeByAssetTypeCode {
//       assetTypeDescription
//     }
// 	}
// }

createConnection().then(async connection => {

    console.log("Inserting asset types into the db...");
    const hardware = new AssetType();
    hardware.code = 111;
    hardware.assetTypeDescription = "Hardware";
    await connection.manager.save(hardware);

    const software = new AssetType();
    software.code = 222;
    software.assetTypeDescription = "Software";
    await connection.manager.save(software);

    const subscription = new AssetType();
    subscription.code = 333;
    subscription.assetTypeDescription = "Subscription";
    await connection.manager.save(subscription);

    console.log("Inserting a new employee into the database...");
    const employee = new Employee();
    employee.firstName = "John";
    employee.lastName = "Smith";
    employee.department = "IT";
    await connection.manager.save(employee);
    console.log("Saved a new user with id: " + employee.id);

    console.log("Inserting a new asset into the database...");
    const asset = new Asset();
    asset.description = "2018 Macbook Pro";
    asset.assetType = hardware;
    asset.otherDetails = "Optional details about this Macbook Pro";
    await connection.manager.save(asset);

    console.log("Inserting a new employeeAsset into the database...");
    const employeeAsset = new EmployeeAsset();
    employeeAsset.employee = employee;
    employeeAsset.asset = asset;
    employeeAsset.dateOut = '2018-02-11 10:23:54'; 
    employeeAsset.conditionOut = "New";
    employeeAsset.otherDetails = "Here are a ton of other details about this thing right here...";
    await connection.manager.save(employeeAsset);
    
}).catch(error => console.log(error));
