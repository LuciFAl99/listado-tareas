import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Task } from './interfaces/task';
import { Person } from './interfaces/person'; 
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  persons: Person[] = [];
  tasksWithPersons: any[] = [];
  currentPage: number = 1;
  filter: 'all' | 'completed' | 'pending' = 'all';
  taskForm: FormGroup;
  isModalOpen: boolean = false;
  userIdCounter = 11; 

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate: ['', Validators.required],
      assignedPersons: this.fb.array([]) 
    });
  }

  ngOnInit(): void {
    this.loadTasksAndPersons();
    this.loadTasksFromLocalStorage(); 
  }

  loadTasksAndPersons() {
    this.taskService.getTasks().subscribe(tasks => {
      this.taskService.getPersons().subscribe(persons => {
        this.tasks = tasks;
        this.persons = persons;
        this.mergeTasksWithPersons();
      });
    });
  }

  loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
      this.mergeTasksWithPersons(); 
    }
  }

  mergeTasksWithPersons() {
    this.tasksWithPersons = this.tasks.map(task => {
      const assignedPersons = this.persons.filter(person =>
        task.assignedPersonIds?.includes(person.userId)
      );
      return {
        ...task,
        assignedPersons: assignedPersons,
      };
    });
  }

  get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasksWithPersons.filter(task => task.completed);
    } else if (this.filter === 'pending') {
      return this.tasksWithPersons.filter(task => !task.completed);
    }
    return this.tasksWithPersons;
  }

  setFilter(filter: 'all' | 'completed' | 'pending') {
    this.filter = filter;
  }

  markAsCompleted(task: any) {
    const index = this.tasksWithPersons.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasksWithPersons[index].completed = true;
      console.log(`Task ${task.id} marked as completed`);
    }
  }

  openModal() {
    this.isModalOpen = true;
    this.taskForm.reset();
    this.clearAssignedPersons();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  clearAssignedPersons() {
    const assignedPersonsArray = this.taskForm.get('assignedPersons') as FormArray;
    assignedPersonsArray.clear();
  }

  addPerson() {
    const assignedPersons = this.taskForm.get('assignedPersons') as FormArray;
    const newPersonGroup = this.createPersonGroup(this.userIdCounter); 
    assignedPersons.push(newPersonGroup);
    this.userIdCounter++; 
  }

  removePerson(index: number) {
    const assignedPersons = this.taskForm.get('assignedPersons') as FormArray;
    assignedPersons.removeAt(index);
  }

  createPersonGroup(userId: number): FormGroup {
    return this.fb.group({
      userId: [userId, Validators.required], 
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(19)]], // Mayor de 18
      skills: this.fb.array([], Validators.required) // Al menos una habilidad
    });
  }

  assignedPersonsControls() {
    return (this.taskForm.get('assignedPersons') as FormArray).controls;
  }

  skillsControls(personIndex: number) {
    return this.getSkillsArray(personIndex).controls;
  }

  addSkill(personIndex: number) {
    const skills = this.getSkillsArray(personIndex);
    skills.push(this.createSkillGroup());
  }

  removeSkill(personIndex: number, skillIndex: number) {
    const skills = this.getSkillsArray(personIndex);
    skills.removeAt(skillIndex);
  }

  createSkillGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required], 
      level: ['', Validators.required], 
      yearsExperience: ['', [Validators.required, Validators.min(0)]], 
    });
  }  

  getSkillsArray(personIndex: number): FormArray {
    return (this.taskForm.get('assignedPersons') as FormArray).at(personIndex).get('skills') as FormArray;
  }

  getNextUserId(): number {
    const existingUserIds = this.persons.map(person => person.userId); 
    const maxUserId = Math.max(0, ...existingUserIds); 
    return maxUserId + 1; 
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        userId: this.getNextUserId(), 
        id: this.tasks.length + 1, 
        title: this.taskForm.value.title,
        dueDate: this.taskForm.value.dueDate,
        assignedPersonIds: this.taskForm.value.assignedPersons.map((person: Person) => person.userId),
        completed: false,
      };

      this.taskForm.value.assignedPersons.forEach((person: any) => {
        if (!this.persons.find(p => p.userId === person.userId)) {
          const newPerson: Person = {
            userId: person.userId,
            fullName: person.fullName,
            age: person.age,
            skills: person.skills
          };
          this.persons.push(newPerson); 
        }
      });

      this.tasks.push(newTask);
      this.mergeTasksWithPersons(); 
      this.saveTasks(); 
      this.savePersons(); 
      this.closeModal();
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  savePersons() {
    localStorage.setItem('persons', JSON.stringify(this.persons)); 
  }

  get isSubmitDisabled(): boolean {
    const assignedPersons = this.taskForm.get('assignedPersons') as FormArray;
    return !this.taskForm.valid || 
           assignedPersons.controls.some(person => 
             !person.get('fullName')?.valid || 
             !person.get('age')?.valid || 
             !person.get('skills')?.value.length
           );
  }
  
}
