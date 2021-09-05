# Roles Selector

An Angular Component that allows the user to select multiple roles of interest from a list of specified roles, separated by different permissions name.

## Dependencies
*  [Angular](https://angular.io/)
* [Angular material](https://material.angular.io/)


## Features
* Component rendering roles and permission.
* Component rendering pre selected roles and permission.
* Tags to show which Roles have been selected. 
* Bagdes on each tag to show number of permission selected for a role.
* Add and remove roles and permissions via checkboxes

## Example
![Roles Selector Example](https://salimzak.blob.core.windows.net/pictures/Screenshot%20(66).png)

## Demo
 [Demo Application](https://ngx-roles-selector.netlify.app/)

## Installation
After installing the above dependencies. Install ngx-roles-selector via.
```bash 
npm i ngx-roles-selector 

```
Once installed you need to import our main module in your application module:
```javascript 
import { RolesSelectorModule } from 'ngx-roles-selector';


 

@NgModule({
  declarations: [AppComponent, ...],
  imports: [RolesSelectorModule, ...],
  bootstrap: [AppComponent]
})
export class AppModule {
}

```

## Usage
ngx-roles-selector. 
```html 
        <form  [formGroup]="form">
            ....
           <ngx-roles-selector 
                [formArrayName]="'roles'"
                [roleList]="roleList" 
                [form]="form"
                [permittedRoles]  = "permittedRoles"
                [permissions] = "permissions"
                [showTags] = "true"
            >

            </ngx-roles-selector >
            ....
        </form>
```
Create your form in the component ts file. 
Inside the constructor of your component.ts file create a form with empty roles formarray via 
```typescript
  constructor(
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
    
      roles: this.fb.array([])
      
    })
  }
```
Make sure to import missing FormBuilder import. 

Declare and initialize roleList property sample:
```typescript

  roleList: any[] = [
    {
      name: "Inventory",
    },
    {
      name: "Tasks"
    },
    {
      name: "Payroll"
    },
    {
      name: "Users"
    },
    {
      name: "Workflow"
    },
    {
      name: "Requisition"
    },
    {
      name: "Employees"
    }
  ]
```

Declare and initialize permissions property, sample:
```typescript 
 permissions = ['read', 'write', 'create', 'delete',"export","import"]
```
Declare and initialize existing roles and permissions if available, sample: 
```typescript 
  permittedRoles = [
    {
      name: "Payroll",
      read: true,
      write: true,
      create: true,
      delete: true,
      export: true, 
      import: true, 

    },

  ]
  ```
Finnaly create a get method to return roles as formarray, sample:
```typescript

  get roles() {
    return this.form.get('roles') as FormArray;
  }

```
