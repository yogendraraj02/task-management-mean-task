import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.css']
})
export class TeamManagementComponent {

 teamLeaders: any[] = [];
  employees: any[] = [];
  pageOfLeaders: any[] = [];
  pageOfEmployees: any[] = [];
  searchLeaders: string = '';
  searchEmployees: string = '';
  loadingLeaders: boolean = false;
  loadingEmployees: boolean = false;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeamLeaders();
    this.loadEmployees();
  }

  // Load Team Leaders
  loadTeamLeaders(): void {
    this.loadingLeaders = true;
    this.teamService.getTeamLeaders("").subscribe({
      next: (leaders) => {
        this.teamLeaders = leaders.data;
        this.filterLeaders();
        this.loadingLeaders = false;
      },
      error: () => {
        console.error('Failed to load team leaders');
        this.loadingLeaders = false;
      },
    });
  }

  loadEmployees(): void {
    this.loadingEmployees = true;
    this.teamService.getEmployees("").subscribe({
      next: (employees) => {
        this.employees = employees.data;
        this.filterEmployees();
        this.loadingEmployees = false;
      },
      error: () => {
        console.error('Failed to load employees');
        this.loadingEmployees = false;
      },
    });
  }

  filterLeaders(): void {
    const filtered = this.searchLeaders
      ? this.teamLeaders.filter((leader) =>
          leader.name.toLowerCase().includes(this.searchLeaders.toLowerCase())
        )
      : this.teamLeaders;
    this.pageOfLeaders = filtered;
    console.log(`pageOfLEaders`,this.pageOfLeaders);
    
  }

  filterEmployees(): void {
    const filtered = this.searchEmployees
      ? this.employees.filter((employee) =>
          employee.name.toLowerCase().includes(this.searchEmployees.toLowerCase())
        )
      : this.employees;
    this.pageOfEmployees = filtered;
  }

  onChangeLeadersPage(pageOfLeaders: any[]): void {
    this.pageOfLeaders = pageOfLeaders;
  }

  onChangeEmployeesPage(pageOfEmployees: any[]): void {
    this.pageOfEmployees = pageOfEmployees;
  }
}
