import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roles-and-permissions';
  form: FormGroup;
  result: any

  
  constructor(
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
    
      roles: this.fb.array([])
      
    })
  }


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
  permissions = ['read', 'write', 'create', 'delete',"export","import"]

  get roles() {
    return this.form.get('roles') as FormArray;
  }

  onSubmit(form: any){
    this.result = JSON.stringify(form.value.roles)
  }
}
