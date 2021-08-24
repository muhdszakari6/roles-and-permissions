import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'ng-roles-selector',
  template: `
        <div *ngIf="(tags.length != 0) && showTags"  class="custom-label">Selected Roles</div>
        <mat-chip-list  *ngIf="(tags.length != 0) && showTags"  #chipList>
            <mat-chip *ngFor="let tag of tags"
               >
                {{tag.name}}
                
                <mat-icon
                    color="primary"
                    [matBadge]="tag.count"
                    matBadgePosition="above after"
                    >
                        icon
                </mat-icon>

            </mat-chip>
            
        </mat-chip-list>
    <div class="table-wrapper" style="width: 100%;">


        <table *ngIf="(roles.length !== 0)" formArrayName="roles" style = "width: 100%" mat-table class="full-width custom-pms-table"
            [dataSource]="innerlistData"  aria-label="Elements">

            <ng-container matColumnDef="name" sticky>
                <th mat-header-cell *matHeaderCellDef> <b></b> </th>
                <td mat-cell *matCellDef="let row; let index = index" [formGroupName]="index">
                    {{row.name}}
                </td>
            </ng-container>

            <ng-container matColumnDef="selectAll">
                <th mat-header-cell *matHeaderCellDef>
                    <b>Select All</b>
                </th>
                <td mat-cell *matCellDef="let row; let index = index" [formGroupName]="index">
                    <mat-checkbox color='primary' (change)="handleSelectAll($event, index , roleAtIndex(index).value)"
                        formControlName='selectAll' style="margin: 10px; "></mat-checkbox>
                </td>
            </ng-container>


            <ng-container *ngFor="let item of permissions;let i=index" [matColumnDef]="item">

                <th mat-header-cell *matHeaderCellDef>
                    {{item}}
                </th>

                <td mat-cell *matCellDef="let row; let index = index" style="text-align: center;"
                    [formGroupName]="index">
                    <mat-checkbox color='primary' (change)="handleSelectRole($event, index , roleAtIndex(index).value)"
                        [formControlName]='item' style="margin: 10px;"></mat-checkbox>
                </td>

            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
    </div>
  `,
  styles: [
    `
    .root{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
}
td.mat-cell{
    min-width: 70px !important;
}
.mat-table-sticky:first-child {
  border-right: 1px solid #e0e0e0;
}
.table-wrapper{
    /* height: 70vh; */
    overflow-y: auto;
}


th{
    text-transform: capitalize;
    text-align: center !important;
}
mat-chip-list{
    margin: 20px;
}`
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class RolesSelectorComponent implements OnInit {
  tags:any = []


  constructor(
    private fb: FormBuilder
  ) { }

  @Input() formArrayName = ''
  @Input() roleList:any = []
  @Input() form: any
  @Input() permittedRoles: any
  @Input() showTags = false

  @Input() permissions = []
  displayedColumns = ['name', 'selectAll', ...this.permissions]

  innerlistData = new MatTableDataSource(this.roleList)


  ngOnChanges(changes: any): void {

    // if (changes.roles.currentValue !== changes.roles.previousValue) {

    // }

  }
  roleAtIndex(i: number) {
    return this.roles.at(i) as FormGroup;
  }

  handleSelectAll(event: any, index: number, permission:any) {

    let o: any = {}
    this.permissions.forEach(permission => {
      o[permission] = event.checked
    });

    this.roleAtIndex(index).patchValue({
      selectAll: event.checked,
      ...o
    })

    if (this.tags.length === 0) {
      //if there is no tags added yet.
      this.tags.push({ ...permission, count: 'All'  })

    }
    else {

      //Try finding the tag you want to add, to check if it has been added already
      const element:any = this.tags.find((element:any) => element.name == permission.name);
      if (element) {
        //If tag has been added, count the number of permission set as true
        // let count = 0;

        // for (const key in element) {
        //   if(key === 'selectAll' &&  element[key] === true) {
        //     count++
        //   }
        // }


        // if (count > 0 && count <= 4) {
        //   this.tags = this.tags.filter((item) => {
        //     return item.id !== permission.id
        //   })
        //   this.tags.push({ ...permission, count: 4 })
        // }
        // else if(count === 5){
        //   this.tags = this.tags.filter((item) => {
        //     return item.id !== permission.id
        //   })
        // }
        // else {
        //   this.tags = this.tags.filter((item) => {
        //     return item.id !== permission.id
        //   })

        // }

        //If tag has been added, check whether all was selected, if true remove the tag

        if (element.count == "All" || element.count == this.permissions.length) {
          this.tags = this.tags.filter((item:any) => {
            return item.name !== permission.name
          })
        }
        //if all was not selected , push a tag with the new permission as all
        else {
          this.tags = this.tags.filter((item:any) => {
            return item.name !== permission.name
          })
          this.tags.push({ ...permission, count: 'All' })

        }

      }

      else {
        this.tags.push({ ...permission, count: 'All' })
      }




    }


  }


  handleSelectRole(event: any, index: number, permission:any) {
    // array.forEach(element => {
    // });
    let o = {}
    let selectAll = true;
    for (const key in permission) {
      if (permission[key] === false && key != 'selectAll' && key != 'name') {
        selectAll = false
      }
    }

    this.roleAtIndex(index).patchValue({
      selectAll: selectAll
    })
    if (this.tags.length === 0) {
      let count = 0;

      for (const key in permission) {
        if (key != 'selectAll' && permission[key] === true) {
          count++
        }
      }
      this.tags.push({ ...permission, count })

    }
    else {
      //If tags are not empty find the role

      const element = this.tags.find((element:any) => element.name === permission.name);
      if (element) {

        //If role exists, initiate count of selected permission

        let count = 0

        //Remove tag from tags (in order to be able to add an updated one)
        this.tags = this.tags.filter((item:any) => {
          return item.name !== permission.name
        })

        //Count the number of permission selected 
        for (const key in permission) {
          if (key != 'selectAll' && permission[key] === true) {
            count++
          }
        }

        //If the count is not equals to zero then push an updated permission with the new count 
        if (count !== 0) {
          this.tags.push({ ...permission, count })
        }

      }

      else {
        //If element doest not exist count (just to be sure and then push )
        let count = 0

        for (const key in permission) {
          if (key != 'selectAll' && permission[key] === true) {
            count++
          }
        }  

        this.tags.push({ ...permission, count })
      }



    }


  }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'selectAll', ...this.permissions]
    this.createPermittedRolesTags(this.permittedRoles)

    this.roleList = this.roleList.map((unproccesedRole:any) => {

      for (let i = 0; i < this.permittedRoles.length; i++) {
        let permittedRole = this.permittedRoles[i];

        if (permittedRole.name == unproccesedRole.name) {

          let o:any = {}
          this.permissions.forEach(element => {
            o[element] = permittedRole[element]
          });

          return {
            name: permittedRole.name,
            ...o,
          }

        }
      }

      let o:any = {}
      this.permissions.forEach(element => {
        o[element] = false
      });

      return {
        name: unproccesedRole.name,
        ...o
      }

    })
    console.log(this.roleList)

    //clear form array before pushing new elements
    //Removing this might cause trouble when user updates twice before leaving the page
    this.roles.clear()

    //for each element create a form group and push to form array 
    this.roleList.forEach((element:any) => {

      let o:any = {}
      this.permissions.forEach(permission => {
        o[permission] = new FormControl(element[permission]);
      });

      let selectAll = true;
      for (const key in element) {
        if (element[key] === false) {
          selectAll = false
        }
      }

      o['selectAll'] = new FormControl(selectAll)

      this.roles.push(


        this.fb.group({
          name: [element.name, Validators.required],
          ...o
        })

      )
    });

    this.innerlistData = new MatTableDataSource(this.roleList)

  }


  createPermittedRolesTags(permittedRoles: any[]) {
    permittedRoles.forEach(permittedRole => {
      let selectAll = true;
      let pass = false
      for (const key in permittedRole) {
        if (permittedRole[key] === false) {
          selectAll = false
        }
        if (permittedRole[key] === true) {
          pass = true
        }
      }
      if (pass) {

        let count = 0

        for (const key in permittedRole) {
          if (permittedRole[key] === true) {
            count++
          }
        }

        let o:any = {}
        this.permissions.forEach(element => {
          o[element] = permittedRole[element]
        });

        this.tags.push(
          {
            count: count === this.permissions.length ? "All" : count,
            ...o,
            name: permittedRole.name,
          }

        )

      }

    });
  }




  get roles() {
    return this.form.get('roles') as FormArray;
  }


}
